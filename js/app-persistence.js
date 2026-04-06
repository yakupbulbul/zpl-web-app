window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createPersistence = function createPersistence({
    historyStorageKey,
    historyLimit,
    storage,
    location,
    lzString
}) {
    function loadHistoryEntries() {
        try {
            const raw = storage.getItem(historyStorageKey);
            if (!raw) {
                return [];
            }

            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed.filter(isValidHistoryEntry).slice(0, historyLimit);
        } catch (error) {
            console.error('History parse error:', error);
            return [];
        }
    }

    function saveHistoryEntry(currentEntries, zplData, settings) {
        const entry = {
            timestamp: Date.now(),
            width: String(settings.width),
            height: String(settings.height),
            density: String(settings.density),
            snippet: zplData.replace(/\s+/g, ' ').trim().slice(0, 90),
            zpl: zplData
        };

        const nextEntries = [entry, ...currentEntries.filter((item) => item.zpl !== entry.zpl)].slice(0, historyLimit);
        storage.setItem(historyStorageKey, JSON.stringify(nextEntries));
        return nextEntries;
    }

    function clearHistory() {
        storage.removeItem(historyStorageKey);
        return [];
    }

    function isValidHistoryEntry(entry) {
        return Boolean(
            entry &&
            typeof entry.timestamp === 'number' &&
            typeof entry.width === 'string' &&
            typeof entry.height === 'string' &&
            typeof entry.density === 'string' &&
            typeof entry.snippet === 'string' &&
            typeof entry.zpl === 'string' &&
            entry.zpl.trim()
        );
    }

    function parseSharedState() {
        if (!location.hash.startsWith('#zpl=')) {
            return null;
        }

        if (!lzString) {
            return null;
        }

        try {
            const compressed = location.hash.slice(5);
            const decompressed = lzString.decompressFromEncodedURIComponent(compressed);
            if (!decompressed) {
                return null;
            }

            const payload = JSON.parse(decompressed);
            if (!payload || typeof payload.zpl !== 'string') {
                return null;
            }

            return {
                zpl: payload.zpl,
                width: typeof payload.width === 'string' ? payload.width : '4',
                height: typeof payload.height === 'string' ? payload.height : '6',
                density: typeof payload.density === 'string' ? payload.density : '8'
            };
        } catch (error) {
            console.error('Share state parse error:', error);
            return null;
        }
    }

    function buildShareUrl(renderedState) {
        if (!renderedState || !renderedState.zpl || !renderedState.settings || !lzString) {
            return null;
        }

        const payload = {
            zpl: renderedState.zpl,
            width: String(renderedState.settings.width),
            height: String(renderedState.settings.height),
            density: String(renderedState.settings.density)
        };

        const encoded = lzString.compressToEncodedURIComponent(JSON.stringify(payload));
        return `${location.origin}${location.pathname}#zpl=${encoded}`;
    }

    return {
        loadHistoryEntries,
        saveHistoryEntry,
        clearHistory,
        isValidHistoryEntry,
        parseSharedState,
        buildShareUrl
    };
};
