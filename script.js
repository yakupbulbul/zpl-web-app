document.addEventListener('DOMContentLoaded', () => {
    const app = window.ZplWebApp || {};
    const config = app.config || {};
    const elements = (app.collectElements || (() => ({})))(document);
    const state = (app.createState || (() => ({})))();
    const translations = app.translations || {};
    const shared = app.shared || {};
    const persistence = (app.createPersistence || (() => null))({
        historyStorageKey: config.HISTORY_STORAGE_KEY || 'zpl-conversion-history',
        historyLimit: config.HISTORY_LIMIT || 10,
        storage: window.localStorage,
        location: window.location,
        lzString: window.LZString
    });
    const { cloneArrayBuffer, downloadBlobUrl, escapeHtml } = shared;
    let zplTool = null;
    let pdfTools = null;
    let qrTool = null;
    let pdfEditor = null;

    const shell = (app.createAppShell || (() => null))({
        documentRoot: document,
        elements,
        state,
        translations,
        persistence,
        escapeHtml,
        getZplTool: () => zplTool,
        getPdfTools: () => pdfTools,
        getPdfEditor: () => pdfEditor,
        getQrTool: () => qrTool,
        pdfWorkerSrc: config.PDF_WORKER_SRC || ''
    });

    zplTool = (app.createZplTool || (() => null))({
        elements,
        state,
        translations,
        labelPresets: config.labelPresets || {},
        saveHistoryEntry: shell ? shell.saveHistoryEntry : null,
        buildShareUrl: persistence ? persistence.buildShareUrl : null,
        downloadBlobUrl
    });

    pdfTools = (app.createPdfTools || (() => null))({
        elements,
        state,
        translations,
        cloneArrayBuffer,
        escapeHtml,
        downloadBlobUrl
    });

    pdfEditor = (app.createPdfEditor || (() => null))({
        elements,
        translations,
        cloneArrayBuffer,
        downloadBlobUrl
    });

    qrTool = (app.createQrTool || (() => null))({
        elements,
        state,
        translations,
        downloadBlobUrl
    });

    if (shell && shell.init) {
        shell.init();
    }
});
