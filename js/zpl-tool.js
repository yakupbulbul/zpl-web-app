window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createZplTool = function createZplTool({
    elements,
    state,
    translations,
    labelPresets,
    saveHistoryEntry,
    buildShareUrl,
    downloadBlobUrl
}) {
    function init() {
        initializePresets();
        initializeTabs();
        initializeUpload();
        initializePaste();
        initializeActions();
        updateConvertButtonState();
    }

    function initializePresets() {
        elements.presetSelect.value = 'shipping_4x6';
        elements.presetSelect.addEventListener('change', applySelectedPreset);
        elements.widthInput.addEventListener('input', markPresetAsCustom);
        elements.heightInput.addEventListener('input', markPresetAsCustom);
        elements.densitySelect.addEventListener('change', markPresetAsCustom);
    }

    function applySelectedPreset() {
        const preset = labelPresets[elements.presetSelect.value];
        if (!preset) {
            return;
        }

        state.applyingPreset = true;
        elements.widthInput.value = preset.width;
        elements.heightInput.value = preset.height;
        elements.densitySelect.value = preset.density;
        state.applyingPreset = false;
    }

    function markPresetAsCustom() {
        if (state.applyingPreset) {
            return;
        }

        elements.presetSelect.value = 'custom';
    }

    function initializeTabs() {
        elements.tabs.forEach((tab) => {
            tab.addEventListener('click', () => switchInputTab(tab.dataset.tab));
        });
    }

    function switchInputTab(targetTab) {
        state.currentMode = targetTab;
        clearLivePreviewTimer();

        elements.tabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.tab === targetTab);
        });

        elements.tabContents.forEach((content) => {
            content.classList.toggle('active', content.id === `${targetTab}-tab`);
        });

        updateConvertButtonState();
    }

    function initializeUpload() {
        elements.browseBtn.addEventListener('click', () => elements.fileInput.click());

        elements.fileInput.addEventListener('change', (event) => {
            if (event.target.files.length > 0) {
                handleFile(event.target.files[0]);
            }
        });

        elements.dropZone.addEventListener('dragover', (event) => {
            event.preventDefault();
            elements.dropZone.classList.add('dragover');
        });

        elements.dropZone.addEventListener('dragleave', () => {
            elements.dropZone.classList.remove('dragover');
        });

        elements.dropZone.addEventListener('drop', (event) => {
            event.preventDefault();
            elements.dropZone.classList.remove('dragover');

            if (event.dataTransfer.files.length > 0) {
                handleFile(event.dataTransfer.files[0]);
            }
        });

        elements.removeFileBtn.addEventListener('click', clearSelectedFile);
    }

    function handleFile(file) {
        state.selectedFile = file;
        elements.fileNameDisplay.textContent = file.name;
        elements.dropZone.classList.add('hidden');
        elements.fileInfo.classList.remove('hidden');
        updateConvertButtonState();
    }

    function clearSelectedFile() {
        state.selectedFile = null;
        elements.fileInput.value = '';
        elements.dropZone.classList.remove('hidden');
        elements.fileInfo.classList.add('hidden');
        updateConvertButtonState();
    }

    function initializePaste() {
        elements.zplInput.addEventListener('input', () => {
            updateConvertButtonState();
            scheduleLivePreview();
        });

        elements.clearBtn.addEventListener('click', () => {
            clearLivePreviewTimer();
            elements.zplInput.value = '';
            updateConvertButtonState();
        });
    }

    function scheduleLivePreview() {
        clearLivePreviewTimer();

        if (state.currentMode !== 'paste') {
            return;
        }

        const zplData = elements.zplInput.value.trim();
        if (!zplData) {
            return;
        }

        state.livePreviewTimer = window.setTimeout(() => {
            requestRender(zplData, getRenderSettings());
        }, 500);
    }

    function clearLivePreviewTimer() {
        if (state.livePreviewTimer) {
            window.clearTimeout(state.livePreviewTimer);
            state.livePreviewTimer = null;
        }
    }

    async function requestRender(zplData, settings, options = {}) {
        const requestId = ++state.renderRequestSequence;
        state.latestRenderRequest = requestId;
        await renderZplToPng(zplData, settings, requestId, options);
    }

    function initializeActions() {
        elements.convertBtn.addEventListener('click', async () => {
            const zplData = await getCurrentZplData();
            if (!zplData) {
                return;
            }

            await requestRender(zplData, getRenderSettings(), { persistHistory: true });
        });

        elements.downloadBtn.addEventListener('click', () => {
            downloadBlobUrl(state.generatedBlobUrl, 'label.png');
        });

        elements.downloadPdfBtn.addEventListener('click', async () => {
            await downloadCurrentPdf();
        });

        elements.copyLinkBtn.addEventListener('click', async () => {
            await copyShareLink();
        });

        elements.newConvertBtn.addEventListener('click', resetView);
        elements.closeResultBtn.addEventListener('click', resetView);
    }

    function updateConvertButtonState() {
        const isEnabled = state.currentMode === 'upload'
            ? Boolean(state.selectedFile)
            : elements.zplInput.value.trim().length > 0;

        elements.convertBtn.disabled = !isEnabled;
        elements.convertBtn.style.opacity = isEnabled ? '1' : '0.5';
        elements.convertBtn.style.cursor = isEnabled ? 'pointer' : 'not-allowed';
    }

    async function getCurrentZplData() {
        if (state.currentMode === 'upload') {
            return getFileZplData();
        }

        return elements.zplInput.value.trim();
    }

    async function getFileZplData() {
        if (!state.selectedFile) {
            return '';
        }

        try {
            return await state.selectedFile.text();
        } catch (error) {
            alert('Error reading the ZPL file.');
            return '';
        }
    }

    function getRenderSettings() {
        return {
            density: elements.densitySelect.value,
            width: elements.widthInput.value || 4,
            height: elements.heightInput.value || 6
        };
    }

    async function renderZplToPng(zplData, settings, requestId, options = {}) {
        setLoadingState(true);

        try {
            const blob = await fetchLabelImage(zplData, settings);

            if (requestId !== state.latestRenderRequest) {
                return;
            }

            state.generatedImageBlob = blob;
            state.lastRenderedZpl = zplData;
            state.lastRenderSettings = { ...settings };
            hideFeedback();
            displayResult(createBlobUrl(blob));

            if (options.persistHistory && typeof saveHistoryEntry === 'function') {
                saveHistoryEntry(zplData, settings);
            }
        } catch (error) {
            if (requestId !== state.latestRenderRequest) {
                return;
            }

            console.error('Conversion error:', error);
            alert(`Failed to convert ZPL. Please check your code or try again. (${error.message})`);
        } finally {
            if (requestId === state.latestRenderRequest) {
                setLoadingState(false);
            }
        }
    }

    async function fetchLabelImage(zplData, settings) {
        const url = `https://api.labelary.com/v1/printers/${settings.density}dpmm/labels/${settings.width}x${settings.height}/0/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'image/png',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: zplData
        });

        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }

        return response.blob();
    }

    function createBlobUrl(blob) {
        if (state.generatedBlobUrl) {
            URL.revokeObjectURL(state.generatedBlobUrl);
        }

        state.generatedBlobUrl = URL.createObjectURL(blob);
        return state.generatedBlobUrl;
    }

    function setLoadingState(isLoading) {
        elements.convertBtn.classList.toggle('hidden', isLoading);
        elements.loader.classList.toggle('hidden', !isLoading);

        if (isLoading) {
            elements.resultSection.classList.add('hidden');
        }
    }

    function displayResult(imageUrl) {
        elements.imagePreview.innerHTML = `<img src="${imageUrl}" alt="Generated Shipping Label">`;
        elements.resultSection.classList.remove('hidden');

        setTimeout(() => {
            elements.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    async function copyShareLink() {
        const shareUrl = buildShareUrl({
            zpl: state.lastRenderedZpl,
            settings: state.lastRenderSettings
        });

        if (!shareUrl) {
            showFeedback(translations.en.share_link_failed, true);
            return;
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            showFeedback(translations.en.share_link_ready);
        } catch (error) {
            console.error('Share link error:', error);
            showFeedback(translations.en.share_link_failed, true);
        }
    }

    async function downloadCurrentPdf() {
        if (!state.generatedImageBlob) {
            showFeedback('Please generate a label before exporting PDF.', true);
            return;
        }

        if (!window.PDFLib || !window.PDFLib.PDFDocument) {
            showFeedback('PDF export is not available right now.', true);
            return;
        }

        const label = elements.downloadPdfBtn.querySelector('[data-i18n="btn_download_pdf"]');
        const originalText = label ? label.textContent : 'Download PDF';
        elements.downloadPdfBtn.disabled = true;

        if (label) {
            label.textContent = 'Generating PDF...';
        }

        try {
            const pdfBytes = await buildPdfFromCurrentImage();
            const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
            downloadBlobUrl(pdfUrl, 'label.pdf');
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
            hideFeedback();
        } catch (error) {
            console.error('PDF export error:', error);
            showFeedback(`Failed to build PDF. (${error.message})`, true);
        } finally {
            elements.downloadPdfBtn.disabled = false;
            if (label) {
                label.textContent = originalText;
            }
        }
    }

    async function buildPdfFromCurrentImage() {
        const { PDFDocument } = window.PDFLib;
        const pdfDocument = await PDFDocument.create();
        const imageBytes = await state.generatedImageBlob.arrayBuffer();
        const pngImage = await pdfDocument.embedPng(imageBytes);
        const page = pdfDocument.addPage([pngImage.width, pngImage.height]);

        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: pngImage.width,
            height: pngImage.height
        });

        return pdfDocument.save();
    }

    function showFeedback(message, isError = false) {
        if (!elements.actionFeedback) {
            return;
        }

        elements.actionFeedback.textContent = message;
        elements.actionFeedback.classList.remove('hidden');
        elements.actionFeedback.classList.toggle('is-error', isError);
    }

    function hideFeedback() {
        if (!elements.actionFeedback) {
            return;
        }

        elements.actionFeedback.textContent = '';
        elements.actionFeedback.classList.add('hidden');
        elements.actionFeedback.classList.remove('is-error');
    }

    function resetView() {
        hideFeedback();
        elements.resultSection.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function restoreSession(session) {
        clearSelectedFile();
        elements.zplInput.value = session.zpl;
        elements.widthInput.value = session.width;
        elements.heightInput.value = session.height;
        elements.densitySelect.value = session.density;
        elements.presetSelect.value = 'custom';
        switchInputTab('paste');
        updateConvertButtonState();
        await requestRender(session.zpl, getRenderSettings());
    }

    return {
        init,
        restoreSession,
        getRenderSettings,
        requestRender
    };
};
