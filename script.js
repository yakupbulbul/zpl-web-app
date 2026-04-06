document.addEventListener('DOMContentLoaded', () => {
    const app = window.ZplWebApp || {};
    const translations = app.translations || {};
    const config = app.config || {};
    const elements = (app.collectElements || (() => ({})))(document);
    const state = (app.createState || (() => ({})))();
    const shared = app.shared || {};
    const HISTORY_STORAGE_KEY = config.HISTORY_STORAGE_KEY || 'zpl-conversion-history';
    const HISTORY_LIMIT = config.HISTORY_LIMIT || 10;
    const PDF_WORKER_SRC = config.PDF_WORKER_SRC || '';
    const labelPresets = config.labelPresets || {};
    const { cloneArrayBuffer, escapeHtml, toggleHidden } = shared;
    const persistence = (app.createPersistence || (() => null))({
        historyStorageKey: HISTORY_STORAGE_KEY,
        historyLimit: HISTORY_LIMIT,
        storage: window.localStorage,
        location: window.location,
        lzString: window.LZString
    });
    const zplTool = (app.createZplTool || (() => null))({
        elements,
        state,
        translations,
        labelPresets,
        saveHistoryEntry,
        buildShareUrl: persistence ? persistence.buildShareUrl : null,
        downloadBlobUrl
    });
    const pdfTools = (app.createPdfTools || (() => null))({
        elements,
        state,
        translations,
        cloneArrayBuffer,
        escapeHtml,
        downloadBlobUrl
    });

    initializeApp();

    function initializeApp() {
        configurePdfPreviewRuntime();

        [
            initializeTheme,
            initializeLanguage,
            initializeToolSuite,
            initializeZplTool,
            initializeHistory,
            initializeSharedState,
            initializePdfTools
        ].forEach((initializer) => initializer());

    }

    function configurePdfPreviewRuntime() {
        if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions && PDF_WORKER_SRC) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;
        }
    }

    function initializeZplTool() {
        if (zplTool && zplTool.init) {
            zplTool.init();
        }
    }

    function initializePdfTools() {
        if (pdfTools && pdfTools.init) {
            pdfTools.init();
        }
    }

    function initializeTheme() {
        setTheme(getPreferredTheme());

        if (elements.themeBtn) {
            elements.themeBtn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                setTheme(currentTheme === 'dark' ? 'light' : 'dark');
            });
        }
    }

    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (elements.themeIcon) {
            elements.themeIcon.name = theme === 'light' ? 'moon-outline' : 'sunny-outline';
        }
    }

    function initializeLanguage() {
        const savedLang = localStorage.getItem('lang') || 'en';
        setLanguage(savedLang);

        if (elements.langBtn) {
            elements.langBtn.addEventListener('change', (event) => setLanguage(event.target.value));
        }
    }

    function setLanguage(lang) {
        const normalizedLang = translations[lang] ? lang : 'en';
        localStorage.setItem('lang', normalizedLang);
        document.documentElement.lang = normalizedLang;

        if (elements.langBtn) {
            elements.langBtn.value = normalizedLang;
        }

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            const translation = translations[normalizedLang][key] || translations.en[key];

            if (translation) {
                element.innerHTML = translation;
            }
        });
    }

    function initializeSharedState() {
        const sharedState = persistence ? persistence.parseSharedState() : null;
        if (!sharedState) {
            return;
        }

        zplTool.restoreSession(sharedState);
    }

    function initializeHistory() {
        state.conversionHistory = persistence ? persistence.loadHistoryEntries() : [];
        renderHistoryList();

        elements.clearHistoryBtn.addEventListener('click', () => {
            state.conversionHistory = persistence ? persistence.clearHistory() : [];
            renderHistoryList();
        });
    }

    function saveHistoryEntry(zplData, settings) {
        if (!persistence) {
            return;
        }

        state.conversionHistory = persistence.saveHistoryEntry(state.conversionHistory, zplData, settings);
        renderHistoryList();
    }

    function renderHistoryList() {
        elements.historyList.innerHTML = '';

        if (!state.conversionHistory.length) {
            elements.historyEmpty.classList.remove('hidden');
            return;
        }

        elements.historyEmpty.classList.add('hidden');

        state.conversionHistory.forEach((entry, index) => {
            if (!persistence || !persistence.isValidHistoryEntry(entry)) {
                return;
            }

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'history-item';
            button.innerHTML = `
                <div class="history-item-meta">
                    <span>${new Date(entry.timestamp).toLocaleString()}</span>
                    <span>${entry.width}x${entry.height} in · ${entry.density} dpmm</span>
                </div>
                <div class="history-item-snippet">${escapeHtml(entry.snippet || entry.zpl.slice(0, 90))}</div>
            `;
            button.addEventListener('click', () => restoreHistoryEntry(index));
            elements.historyList.appendChild(button);
        });
    }

    async function restoreHistoryEntry(index) {
        const entry = state.conversionHistory[index];
        if (!persistence || !persistence.isValidHistoryEntry(entry)) {
            return;
        }

        await zplTool.restoreSession(entry);
    }

    function downloadBlobUrl(blobUrl, filename) {
        if (!blobUrl) {
            return;
        }

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


});
