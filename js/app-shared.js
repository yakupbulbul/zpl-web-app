window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.shared = {
    cloneArrayBuffer(buffer) {
        return buffer.slice(0);
    },

    escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    toggleHidden(element, isHidden) {
        if (element) {
            element.classList.toggle('hidden', isHidden);
        }
    }
};
