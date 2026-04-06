window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createState = function createState() {
    return {
        currentMode: 'upload',
        selectedFile: null,
        generatedBlobUrl: null,
        generatedImageBlob: null,
        currentTool: 'zpl',
        livePreviewTimer: null,
        renderRequestSequence: 0,
        latestRenderRequest: 0,
        applyingPreset: false,
        conversionHistory: [],
        lastRenderedZpl: '',
        lastRenderSettings: null,
        pdfMergeFiles: [],
        pdfOrganizerSourceBytes: null,
        pdfOrganizerPages: [],
        pdfOrganizerPreviewDocument: null,
        pdfOrganizerActiveIndex: 0,
        pdfOrganizerPreviewSequence: 0,
        pdfSplitSourceBytes: null,
        pdfSplitPageCount: 0,
        pdfSplitOutputs: [],
        pdfSplitPreviewDocument: null,
        pdfSplitActivePage: 1,
        pdfSplitPreviewSequence: 0
    };
};
