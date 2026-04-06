window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createQrTool = function createQrTool({
    elements,
    translations,
    downloadBlobUrl
}) {
    const DEFAULT_SIZE = 256;
    const DEFAULT_MARGIN = 2;
    const featureState = {
        pngDataUrl: '',
        svgMarkup: ''
    };

    function init() {
        if (!elements.qrInput) {
            return;
        }

        bindEvents();
        updatePreview();
    }

    function bindEvents() {
        elements.qrInput.addEventListener('input', updatePreview);
        elements.qrSizeInput.addEventListener('input', updatePreview);
        elements.qrMarginInput.addEventListener('input', updatePreview);
        elements.qrErrorLevelSelect.addEventListener('change', updatePreview);
        elements.qrResetBtn.addEventListener('click', resetForm);
        elements.qrDownloadPngBtn.addEventListener('click', downloadPng);
        elements.qrDownloadSvgBtn.addEventListener('click', downloadSvg);
    }

    function updatePreview() {
        clearFeedback();

        const formState = readFormState();
        if (!formState.content) {
            resetGeneratedState();
            showEmptyState(getMessage('qr_empty_state'));
            return;
        }

        const validationMessage = validateFormState(formState);
        if (validationMessage) {
            resetGeneratedState();
            showEmptyState(validationMessage, true);
            return;
        }

        if (typeof window.qrcode !== 'function') {
            resetGeneratedState();
            showEmptyState(getMessage('qr_library_missing'), true);
            return;
        }

        syncOptionInputs(formState);

        try {
            const qr = window.qrcode(0, formState.errorCorrectionLevel);
            qr.addData(formState.content);
            qr.make();

            const cellSize = getCellSize(qr, formState.size, formState.margin);
            featureState.svgMarkup = qr.createSvgTag({ cellSize, margin: formState.margin, scalable: true });
            featureState.pngDataUrl = qr.createDataURL(cellSize, formState.margin);

            showPreview(featureState.svgMarkup);
            clearFeedback();
            updateActionState(true);
        } catch (error) {
            console.error('QR preview error:', error);
            resetGeneratedState();
            showEmptyState(getMessage('qr_preview_failed'), true);
        }
    }

    function readFormState() {
        return {
            content: elements.qrInput.value.trim(),
            size: Number(elements.qrSizeInput.value),
            margin: Number(elements.qrMarginInput.value),
            errorCorrectionLevel: elements.qrErrorLevelSelect.value || 'M'
        };
    }

    function validateFormState(formState) {
        if (!Number.isFinite(formState.size) || formState.size < 128 || formState.size > 1024) {
            return getMessage('qr_invalid_size');
        }

        if (!Number.isFinite(formState.margin) || formState.margin < 0 || formState.margin > 16) {
            return getMessage('qr_invalid_margin');
        }

        return '';
    }

    function syncOptionInputs(formState) {
        elements.qrSizeInput.value = String(formState.size);
        elements.qrMarginInput.value = String(formState.margin);
    }

    function getCellSize(qr, targetSize, margin) {
        const moduleCount = qr.getModuleCount();
        const availableSize = targetSize - margin * 2;
        return Math.max(1, Math.floor(availableSize / moduleCount));
    }

    function showPreview(svgMarkup) {
        elements.qrPreview.innerHTML = svgMarkup;
        elements.qrPreview.classList.remove('hidden');
        elements.qrPreviewEmpty.classList.add('hidden');
        updateActionState(true);
    }

    function showEmptyState(message, isError) {
        elements.qrPreview.innerHTML = '';
        elements.qrPreview.classList.add('hidden');
        elements.qrPreviewEmpty.textContent = message;
        elements.qrPreviewEmpty.classList.remove('hidden');

        if (isError) {
            showFeedback(message, true);
        } else {
            clearFeedback();
        }

        updateActionState(false);
    }

    function showFeedback(message, isError) {
        elements.qrFeedback.textContent = message;
        elements.qrFeedback.classList.remove('hidden');
        elements.qrFeedback.classList.toggle('is-error', Boolean(isError));
    }

    function clearFeedback() {
        elements.qrFeedback.textContent = '';
        elements.qrFeedback.classList.add('hidden');
        elements.qrFeedback.classList.remove('is-error');
    }

    function updateActionState(hasResult) {
        elements.qrDownloadPngBtn.disabled = !hasResult;
        elements.qrDownloadSvgBtn.disabled = !hasResult;
    }

    function downloadPng() {
        if (!featureState.pngDataUrl) {
            showFeedback(getMessage('qr_export_missing'), true);
            return;
        }

        downloadBlobUrl(featureState.pngDataUrl, 'qr-code.png');
        showFeedback(getMessage('qr_png_downloaded'));
    }

    function downloadSvg() {
        if (!featureState.svgMarkup) {
            showFeedback(getMessage('qr_export_missing'), true);
            return;
        }

        const svgBlobUrl = URL.createObjectURL(new Blob([featureState.svgMarkup], { type: 'image/svg+xml' }));
        downloadBlobUrl(svgBlobUrl, 'qr-code.svg');
        setTimeout(() => URL.revokeObjectURL(svgBlobUrl), 1000);
        showFeedback(getMessage('qr_svg_downloaded'));
    }

    function resetGeneratedState() {
        featureState.pngDataUrl = '';
        featureState.svgMarkup = '';
    }

    function resetForm() {
        elements.qrInput.value = '';
        elements.qrSizeInput.value = String(DEFAULT_SIZE);
        elements.qrMarginInput.value = String(DEFAULT_MARGIN);
        elements.qrErrorLevelSelect.value = 'M';
        resetGeneratedState();
        clearFeedback();
        showEmptyState(getMessage('qr_empty_state'));
    }

    function getMessage(key) {
        const currentLang = document.documentElement.lang;
        return (translations[currentLang] && translations[currentLang][key]) || (translations.en && translations.en[key]) || key;
    }

    return {
        init
    };
};
