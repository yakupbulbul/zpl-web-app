window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createPdfEditor = function createPdfEditor({
    elements,
    translations,
    cloneArrayBuffer
}) {
    const featureState = {
        sourceBytes: null,
        previewDocument: null,
        pageCount: 0,
        activePage: 1,
        previewSequence: 0
    };

    function init() {
        if (!elements.pdfEditorInput) {
            return;
        }

        elements.pdfEditorInput.addEventListener('change', async (event) => {
            const [file] = Array.from(event.target.files || []);
            await handleFile(file);
        });

        attachPickerDropzone(elements.pdfEditorPicker, async (files) => {
            await handleFile(files[0]);
        });

        renderPageGrid();
        updatePreviewState();
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
            hideFeedback();
            renderPageGrid();
            await updatePreviewState();
        } catch (error) {
            console.error('PDF editor load error:', error);
            showFeedback(`Failed to read PDF. (${error.message})`, true);
        }
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
                await updatePreviewState();
            });
            elements.pdfEditorPageGrid.appendChild(button);
        }
    }

    async function updatePreviewState() {
        if (!featureState.previewDocument || !featureState.pageCount) {
            elements.pdfEditorPreviewMeta.textContent = getMessage('pdf_editor_preview_hint');
            elements.pdfEditorPreviewCanvas.classList.add('hidden');
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

    function getMessage(key) {
        const lang = document.documentElement.lang;
        return (translations[lang] && translations[lang][key]) || (translations.en && translations.en[key]) || key;
    }

    return {
        init
    };
};
