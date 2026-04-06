window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createQrTool = function createQrTool({
    elements,
    translations,
    downloadBlobUrl
}) {
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

    async function updatePreview() {
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

        if (!window.QRCode) {
            resetGeneratedState();
            showEmptyState(getMessage('qr_library_missing'), true);
            return;
        }

        syncOptionInputs(formState);

        try {
            const options = {
                width: formState.size,
                margin: formState.margin,
                errorCorrectionLevel: formState.errorCorrectionLevel
            };
            const [svgMarkup, pngDataUrl] = await Promise.all([
                window.QRCode.toString(formState.content, { ...options, type: 'svg' }),
                window.QRCode.toDataURL(formState.content, options)
            ]);

            featureState.svgMarkup = svgMarkup;
            featureState.pngDataUrl = pngDataUrl;
            showPreview(svgMarkup);
            showFeedback(getMessage('qr_preview_ready'));
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
        showFeedback(message, Boolean(isError));
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
        elements.qrSizeInput.value = '256';
        elements.qrMarginInput.value = '2';
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
