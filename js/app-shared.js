window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.shared = {
    cloneArrayBuffer(buffer) {
        return buffer.slice(0);
    },

    downloadBlobUrl(blobUrl, filename) {
        if (!blobUrl) {
            return;
        }

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
};
