window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.config = {
    HISTORY_STORAGE_KEY: 'zpl-conversion-history',
    HISTORY_LIMIT: 10,
    PDF_WORKER_SRC: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
    labelPresets: {
        shipping_4x6: { width: '4', height: '6', density: '8' },
        address_4x2: { width: '4', height: '2', density: '8' },
        product_2x1: { width: '2', height: '1', density: '8' },
        metric_100x150: { width: '3.94', height: '5.91', density: '8' }
    }
};
