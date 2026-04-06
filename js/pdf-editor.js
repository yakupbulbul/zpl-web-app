window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createPdfEditor = function createPdfEditor({
    elements,
    translations,
    cloneArrayBuffer,
    downloadBlobUrl
}) {
    const featureState = {
        sourceBytes: null,
        previewDocument: null,
        pageCount: 0,
        activePage: 1,
        previewSequence: 0,
        activeTool: 'text',
        nextOverlayId: 1,
        overlays: [],
        imageAsset: null
    };

    function init() {
        if (!elements.pdfEditorInput) {
            return;
        }

        bindEvents();
        renderPageGrid();
        renderOverlayList();
        updateToolUi();
        updatePreviewState();
    }

    function bindEvents() {
        elements.pdfEditorInput.addEventListener('change', async (event) => {
            const [file] = Array.from(event.target.files || []);
            await handleFile(file);
        });

        attachPickerDropzone(elements.pdfEditorPicker, async (files) => {
            await handleFile(files[0]);
        });

        elements.pdfEditorToolTextBtn.addEventListener('click', () => switchTool('text'));
        elements.pdfEditorToolImageBtn.addEventListener('click', () => switchTool('image'));
        elements.pdfEditorImageInput.addEventListener('change', handleImageSelection);
        elements.pdfEditorOverlayLayer.addEventListener('click', handlePlacementClick);
        elements.pdfEditorExportBtn.addEventListener('click', async () => {
            await exportUpdatedPdf();
        });
    }

    function attachPickerDropzone(dropzone, onFiles) {
        if (!dropzone) {
            return;
        }

        dropzone.addEventListener('dragover', (event) => {
            event.preventDefault();
            dropzone.classList.add('dragover');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragover');
        });

        dropzone.addEventListener('drop', async (event) => {
            event.preventDefault();
            dropzone.classList.remove('dragover');
            const files = Array.from(event.dataTransfer?.files || []);
            if (!files.length) {
                return;
            }

            await onFiles(files);
        });
    }

    async function handleFile(file) {
        if (!file) {
            return;
        }

        elements.pdfEditorStatus.textContent = file.name;
        try {
            featureState.sourceBytes = cloneArrayBuffer(await file.arrayBuffer());
            featureState.previewDocument = await loadPdfPreviewDocument(cloneArrayBuffer(featureState.sourceBytes));
            featureState.pageCount = featureState.previewDocument.numPages;
            featureState.activePage = 1;
            featureState.overlays = [];
            featureState.nextOverlayId = 1;
            hideFeedback();
            renderPageGrid();
            renderOverlayList();
            await updatePreviewState();
        } catch (error) {
            console.error('PDF editor load error:', error);
            showFeedback(`Failed to read PDF. (${error.message})`, true);
        }
    }

    function switchTool(tool) {
        featureState.activeTool = tool;
        updateToolUi();
    }

    function updateToolUi() {
        const isText = featureState.activeTool === 'text';
        elements.pdfEditorToolTextBtn.classList.toggle('is-active', isText);
        elements.pdfEditorToolImageBtn.classList.toggle('is-active', !isText);
        elements.pdfEditorTextConfig.classList.toggle('hidden', !isText);
        elements.pdfEditorImageConfig.classList.toggle('hidden', isText);
        elements.pdfEditorPlacementHint.textContent = getMessage(isText ? 'pdf_editor_hint_text' : 'pdf_editor_hint_image');
    }

    async function loadPdfPreviewDocument(bytes) {
        if (!window.pdfjsLib) {
            throw new Error('PDF preview library is unavailable.');
        }

        const loadingTask = window.pdfjsLib.getDocument({ data: new Uint8Array(bytes) });
        return loadingTask.promise;
    }

    function renderPageGrid() {
        elements.pdfEditorPageGrid.innerHTML = '';

        if (!featureState.pageCount) {
            elements.pdfEditorEmpty.classList.remove('hidden');
            return;
        }

        elements.pdfEditorEmpty.classList.add('hidden');
        for (let pageNumber = 1; pageNumber <= featureState.pageCount; pageNumber += 1) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'pdf-page-chip';
            button.textContent = `${pageNumber}`;
            button.classList.toggle('is-active', pageNumber === featureState.activePage);
            button.addEventListener('click', async () => {
                featureState.activePage = pageNumber;
                renderPageGrid();
                renderOverlayList();
                await updatePreviewState();
            });
            elements.pdfEditorPageGrid.appendChild(button);
        }
    }

    async function updatePreviewState() {
        if (!featureState.previewDocument || !featureState.pageCount) {
            elements.pdfEditorPreviewMeta.textContent = getMessage('pdf_editor_preview_hint');
            elements.pdfEditorPreviewCanvas.classList.add('hidden');
            elements.pdfEditorCanvasShell.classList.add('hidden');
            elements.pdfEditorPreviewEmpty.classList.remove('hidden');
            elements.pdfEditorExportBtn.disabled = true;
            return;
        }

        elements.pdfEditorPreviewMeta.textContent = `Page ${featureState.activePage} of ${featureState.pageCount}`;
        elements.pdfEditorExportBtn.disabled = false;

        try {
            await renderPdfPagePreview({
                pdfDocument: featureState.previewDocument,
                pageNumber: featureState.activePage,
                canvas: elements.pdfEditorPreviewCanvas,
                emptyState: elements.pdfEditorPreviewEmpty,
                maxWidth: 640,
                maxHeight: 760
            });
            elements.pdfEditorCanvasShell.classList.remove('hidden');
            renderOverlayPreview();
        } catch (error) {
            console.error('PDF editor preview error:', error);
            showFeedback(`Preview failed. (${error.message})`, true);
        }
    }

    async function renderPdfPagePreview({ pdfDocument, pageNumber, canvas, emptyState, maxWidth, maxHeight }) {
        const sequence = ++featureState.previewSequence;
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.min(maxWidth / viewport.width, maxHeight / viewport.height, 1.4);
        const finalScale = Math.max(scale, 0.45);
        const deviceScale = window.devicePixelRatio || 1;
        const renderViewport = page.getViewport({ scale: finalScale * deviceScale });

        if (sequence !== featureState.previewSequence) {
            return;
        }

        const context = canvas.getContext('2d');
        canvas.width = Math.ceil(renderViewport.width);
        canvas.height = Math.ceil(renderViewport.height);
        canvas.style.width = `${(renderViewport.width / deviceScale).toFixed(0)}px`;
        canvas.style.height = `${(renderViewport.height / deviceScale).toFixed(0)}px`;

        await page.render({
            canvasContext: context,
            viewport: renderViewport
        }).promise;

        if (sequence !== featureState.previewSequence) {
            return;
        }

        canvas.classList.remove('hidden');
        emptyState.classList.add('hidden');
        elements.pdfEditorOverlayLayer.style.width = canvas.style.width;
        elements.pdfEditorOverlayLayer.style.height = canvas.style.height;
    }

    function handlePlacementClick(event) {
        if (!featureState.pageCount) {
            return;
        }

        const rect = elements.pdfEditorOverlayLayer.getBoundingClientRect();
        if (!rect.width || !rect.height) {
            return;
        }

        const xRatio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const yRatio = clamp((event.clientY - rect.top) / rect.height, 0, 1);

        if (featureState.activeTool === 'text') {
            placeTextOverlay({ xRatio, yRatio });
            return;
        }

        placeImageOverlay({ xRatio, yRatio });
    }

    function placeTextOverlay(position) {
        const content = elements.pdfEditorTextInput.value.trim();
        if (!content) {
            showFeedback(getMessage('pdf_editor_text_required'), true);
            return;
        }

        const fontSize = Number(elements.pdfEditorFontSizeInput.value) || 18;
        featureState.overlays.push({
            id: featureState.nextOverlayId++,
            type: 'text',
            pageNumber: featureState.activePage,
            xRatio: position.xRatio,
            yRatio: position.yRatio,
            text: content,
            fontSize,
            color: elements.pdfEditorTextColorInput.value || '#0f172a'
        });
        hideFeedback();
        renderOverlayList();
        renderOverlayPreview();
    }

    function placeImageOverlay(position) {
        if (!featureState.imageAsset) {
            showFeedback(getMessage('pdf_editor_image_required'), true);
            return;
        }

        featureState.overlays.push({
            id: featureState.nextOverlayId++,
            type: 'image',
            pageNumber: featureState.activePage,
            xRatio: position.xRatio,
            yRatio: position.yRatio,
            widthRatio: Number(elements.pdfEditorImageScaleInput.value || 24) / 100,
            image: featureState.imageAsset
        });
        hideFeedback();
        renderOverlayList();
        renderOverlayPreview();
    }

    function handleImageSelection(event) {
        const [file] = Array.from(event.target.files || []);
        if (!file) {
            return;
        }

        if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
            featureState.imageAsset = null;
            elements.pdfEditorImageStatus.textContent = getMessage('pdf_editor_image_invalid');
            showFeedback(getMessage('pdf_editor_image_invalid'), true);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            featureState.imageAsset = {
                name: file.name,
                mimeType: file.type,
                dataUrl: typeof reader.result === 'string' ? reader.result : ''
            };
            elements.pdfEditorImageStatus.textContent = file.name;
            hideFeedback();
        };
        reader.onerror = () => {
            featureState.imageAsset = null;
            elements.pdfEditorImageStatus.textContent = getMessage('pdf_editor_image_invalid');
            showFeedback(getMessage('pdf_editor_image_invalid'), true);
        };
        reader.readAsDataURL(file);
    }

    function renderOverlayList() {
        elements.pdfEditorOverlayList.innerHTML = '';
        const overlays = getActivePageOverlays();

        if (!overlays.length) {
            const empty = document.createElement('p');
            empty.className = 'pdf-editor-overlay-empty';
            empty.textContent = getMessage('pdf_editor_overlay_empty');
            elements.pdfEditorOverlayList.appendChild(empty);
            return;
        }

        overlays.forEach((overlay) => {
            const row = document.createElement('div');
            row.className = 'pdf-editor-overlay-row';
            const title = overlay.type === 'text'
                ? `${getMessage('pdf_editor_overlay_text')}: ${overlay.text}`
                : `${getMessage('pdf_editor_overlay_image')}: ${overlay.image.name}`;
            row.innerHTML = `
                <span class="pdf-editor-overlay-name">${escapeHtml(title)}</span>
                <button class="btn-text" type="button">${getMessage('pdf_editor_remove_overlay')}</button>
            `;
            row.querySelector('button').addEventListener('click', () => removeOverlay(overlay.id));
            elements.pdfEditorOverlayList.appendChild(row);
        });
    }

    function renderOverlayPreview() {
        elements.pdfEditorOverlayLayer.innerHTML = '';
        const overlays = getActivePageOverlays();

        overlays.forEach((overlay) => {
            const item = document.createElement('div');
            item.className = `pdf-editor-overlay-item is-${overlay.type}`;
            item.style.left = `${overlay.xRatio * 100}%`;
            item.style.top = `${overlay.yRatio * 100}%`;

            if (overlay.type === 'text') {
                item.textContent = overlay.text;
                item.style.fontSize = `${Math.max(12, overlay.fontSize * 0.85)}px`;
                item.style.color = overlay.color;
            } else {
                const image = document.createElement('img');
                image.src = overlay.image.dataUrl;
                image.alt = overlay.image.name;
                image.style.width = `${overlay.widthRatio * 100}%`;
                item.appendChild(image);
            }

            elements.pdfEditorOverlayLayer.appendChild(item);
        });
    }

    function getActivePageOverlays() {
        return featureState.overlays.filter((overlay) => overlay.pageNumber === featureState.activePage);
    }

    function removeOverlay(overlayId) {
        featureState.overlays = featureState.overlays.filter((overlay) => overlay.id !== overlayId);
        renderOverlayList();
        renderOverlayPreview();
    }

    async function exportUpdatedPdf() {
        if (!featureState.sourceBytes) {
            showFeedback(getMessage('pdf_editor_empty'), true);
            return;
        }

        try {
            const { PDFDocument, rgb, StandardFonts } = window.PDFLib;
            const document = await PDFDocument.load(cloneArrayBuffer(featureState.sourceBytes));
            const helvetica = await document.embedFont(StandardFonts.Helvetica);
            const imageCache = new Map();

            for (const overlay of featureState.overlays) {
                const page = document.getPage(overlay.pageNumber - 1);
                const { width, height } = page.getSize();

                if (overlay.type === 'text') {
                    const color = hexToRgb(overlay.color);
                    page.drawText(overlay.text, {
                        x: overlay.xRatio * width,
                        y: height - (overlay.yRatio * height) - overlay.fontSize,
                        size: overlay.fontSize,
                        font: helvetica,
                        color: rgb(color.r, color.g, color.b)
                    });
                    continue;
                }

                const key = overlay.image.dataUrl;
                if (!imageCache.has(key)) {
                    const bytes = await fetch(key).then((response) => response.arrayBuffer());
                    const embedded = overlay.image.mimeType === 'image/png'
                        ? await document.embedPng(bytes)
                        : await document.embedJpg(bytes);
                    imageCache.set(key, embedded);
                }

                const embeddedImage = imageCache.get(key);
                const targetWidth = width * overlay.widthRatio;
                const scaledHeight = targetWidth * (embeddedImage.height / embeddedImage.width);
                page.drawImage(embeddedImage, {
                    x: overlay.xRatio * width - targetWidth / 2,
                    y: height - (overlay.yRatio * height) - scaledHeight / 2,
                    width: targetWidth,
                    height: scaledHeight
                });
            }

            const bytes = await document.save();
            const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
            downloadBlobUrl(url, 'pdf-add-sign.pdf');
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            showFeedback(getMessage('pdf_editor_export_success'));
        } catch (error) {
            console.error('PDF editor export error:', error);
            showFeedback(`Failed to export PDF. (${error.message})`, true);
        }
    }

    function showFeedback(message, isError) {
        elements.pdfEditorFeedback.textContent = message;
        elements.pdfEditorFeedback.classList.remove('hidden');
        elements.pdfEditorFeedback.classList.toggle('is-error', Boolean(isError));
    }

    function hideFeedback() {
        elements.pdfEditorFeedback.textContent = '';
        elements.pdfEditorFeedback.classList.add('hidden');
        elements.pdfEditorFeedback.classList.remove('is-error');
    }

    function hexToRgb(hex) {
        const normalized = hex.replace('#', '');
        const value = normalized.length === 3
            ? normalized.split('').map((part) => part + part).join('')
            : normalized;
        return {
            r: parseInt(value.slice(0, 2), 16) / 255,
            g: parseInt(value.slice(2, 4), 16) / 255,
            b: parseInt(value.slice(4, 6), 16) / 255
        };
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function getMessage(key) {
        const lang = document.documentElement.lang;
        return (translations[lang] && translations[lang][key]) || (translations.en && translations.en[key]) || key;
    }

    function escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    return {
        init
    };
};
