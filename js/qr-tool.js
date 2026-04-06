window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createQrTool = function createQrTool({
    elements,
    translations,
    downloadBlobUrl
}) {
    const DEFAULT_SIZE = 256;
    const DEFAULT_MARGIN = 2;
    const MAX_LOGO_BYTES = 2 * 1024 * 1024;
    const featureState = {
        svgMarkup: '',
        logoDataUrl: '',
        logoName: ''
    };

    function init() {
        if (!elements.qrInput) {
            return;
        }

        bindEvents();
        updatePreview();
        updateLogoUi();
    }

    function bindEvents() {
        elements.qrInput.addEventListener('input', updatePreview);
        elements.qrSizeInput.addEventListener('input', updatePreview);
        elements.qrMarginInput.addEventListener('input', updatePreview);
        elements.qrErrorLevelSelect.addEventListener('change', updatePreview);
        elements.qrResetBtn.addEventListener('click', resetForm);
        elements.qrDownloadPngBtn.addEventListener('click', () => {
            downloadPng().catch((error) => {
                console.error('QR PNG export error:', error);
                showFeedback(getMessage('qr_export_missing'), true);
            });
        });
        elements.qrDownloadSvgBtn.addEventListener('click', downloadSvg);
        elements.qrLogoInput.addEventListener('change', handleLogoSelection);
        elements.qrLogoRemoveBtn.addEventListener('click', clearLogo);
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
            const baseSvg = qr.createSvgTag({ cellSize, margin: formState.margin, scalable: true });
            featureState.svgMarkup = withOptionalLogo(baseSvg);

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

    function withOptionalLogo(svgMarkup) {
        if (!featureState.logoDataUrl) {
            return svgMarkup;
        }

        const viewBoxMatch = svgMarkup.match(/viewBox="([^"]+)"/);
        if (!viewBoxMatch) {
            return svgMarkup;
        }

        const viewBox = viewBoxMatch[1].split(/\s+/).map(Number);
        const [, , width, height] = viewBox;
        const logoSize = Math.round(Math.min(width, height) * 0.22);
        const x = Math.round((width - logoSize) / 2);
        const y = Math.round((height - logoSize) / 2);
        const cornerRadius = Math.round(logoSize * 0.18);
        const overlay = `
  <g class="qr-logo-mark">
    <rect x="${x}" y="${y}" width="${logoSize}" height="${logoSize}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#ffffff"/>
    <image href="${featureState.logoDataUrl}" x="${x}" y="${y}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet"/>
  </g>
`;
        return svgMarkup.replace('</svg>', `${overlay}</svg>`);
    }

    function handleLogoSelection(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            return;
        }

        if (!isSupportedLogoType(file.type)) {
            clearLogoState();
            updateLogoUi();
            showFeedback(getMessage('qr_logo_invalid'), true);
            return;
        }

        if (file.size > MAX_LOGO_BYTES) {
            clearLogoState();
            updateLogoUi();
            showFeedback(getMessage('qr_logo_too_large'), true);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            featureState.logoDataUrl = typeof reader.result === 'string' ? reader.result : '';
            featureState.logoName = file.name;
            updateLogoUi();
            updatePreview();
        };
        reader.onerror = () => {
            clearLogoState();
            updateLogoUi();
            showFeedback(getMessage('qr_logo_invalid'), true);
        };
        reader.readAsDataURL(file);
    }

    function isSupportedLogoType(type) {
        return ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'].includes(type);
    }

    function updateLogoUi() {
        const hasLogo = Boolean(featureState.logoDataUrl);
        elements.qrLogoRemoveBtn.classList.toggle('hidden', !hasLogo);
        elements.qrLogoStatus.textContent = hasLogo
            ? getMessage('qr_logo_selected').replace('{name}', featureState.logoName || 'logo')
            : getMessage('qr_logo_empty');
    }

    function clearLogo() {
        clearLogoState();
        updateLogoUi();
        updatePreview();
    }

    function clearLogoState() {
        featureState.logoDataUrl = '';
        featureState.logoName = '';
        elements.qrLogoInput.value = '';
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

    async function downloadPng() {
        if (!featureState.svgMarkup) {
            showFeedback(getMessage('qr_export_missing'), true);
            return;
        }

        const pngDataUrl = await svgToPngDataUrl(featureState.svgMarkup);
        downloadBlobUrl(pngDataUrl, 'qr-code.png');
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

    function svgToPngDataUrl(svgMarkup) {
        const svgBlobUrl = URL.createObjectURL(new Blob([svgMarkup], { type: 'image/svg+xml' }));

        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.naturalWidth || DEFAULT_SIZE;
                    canvas.height = image.naturalHeight || DEFAULT_SIZE;
                    const context = canvas.getContext('2d');
                    if (!context) {
                        reject(new Error('Canvas context is not available.'));
                        return;
                    }

                    context.fillStyle = '#ffffff';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/png'));
                } finally {
                    URL.revokeObjectURL(svgBlobUrl);
                }
            };
            image.onerror = () => {
                URL.revokeObjectURL(svgBlobUrl);
                reject(new Error('SVG export image failed to load.'));
            };
            image.src = svgBlobUrl;
        });
    }

    function resetGeneratedState() {
        featureState.svgMarkup = '';
    }

    function resetForm() {
        elements.qrInput.value = '';
        elements.qrSizeInput.value = String(DEFAULT_SIZE);
        elements.qrMarginInput.value = String(DEFAULT_MARGIN);
        elements.qrErrorLevelSelect.value = 'M';
        clearLogoState();
        updateLogoUi();
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
