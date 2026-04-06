window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createAppShell = function createAppShell({
    documentRoot,
    elements,
    state,
    translations,
    persistence,
    escapeHtml,
    getZplTool,
    getPdfTools,
    getPdfEditor,
    getQrTool,
    pdfWorkerSrc
}) {
    function init() {
        configurePdfPreviewRuntime();
        initializeTheme();
        initializeLanguage();
        initializeToolSuite();
        initializeZplTool();
        initializeHistory();
        initializeSharedState();
        initializePdfTools();
        initializePdfEditor();
        initializeQrTool();
    }

    function configurePdfPreviewRuntime() {
        if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions && pdfWorkerSrc) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
        }
    }

    function initializeTheme() {
        setTheme(getPreferredTheme());

        if (elements.themeBtn) {
            elements.themeBtn.addEventListener('click', () => {
                const currentTheme = documentRoot.documentElement.getAttribute('data-theme');
                setTheme(currentTheme === 'dark' ? 'light' : 'dark');
            });
        }
    }

    function getPreferredTheme() {
        const savedTheme = window.localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme) {
        documentRoot.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('theme', theme);

        if (elements.themeIcon) {
            elements.themeIcon.name = theme === 'light' ? 'moon-outline' : 'sunny-outline';
        }
    }

    function initializeLanguage() {
        const savedLang = window.localStorage.getItem('lang') || 'en';
        setLanguage(savedLang);

        if (elements.langBtn) {
            elements.langBtn.addEventListener('change', (event) => setLanguage(event.target.value));
        }
    }

    function setLanguage(lang) {
        const normalizedLang = translations[lang] ? lang : 'en';
        window.localStorage.setItem('lang', normalizedLang);
        documentRoot.documentElement.lang = normalizedLang;

        if (elements.langBtn) {
            elements.langBtn.value = normalizedLang;
        }

        documentRoot.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            const translation = translations[normalizedLang][key] || translations.en[key];

            if (translation) {
                element.innerHTML = translation;
            }
        });
    }

    function initializeToolSuite() {
        elements.toolTabs.forEach((tab) => {
            tab.addEventListener('click', () => switchToolSuite(tab.dataset.tool));
        });

        switchToolSuite(state.currentTool || 'zpl');
    }

    function switchToolSuite(targetTool) {
        state.currentTool = targetTool;

        elements.toolTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.tool === targetTool);
        });

        elements.toolPanels.forEach((panel) => {
            const isActive = panel.id === `${targetTool}-tools-panel`;
            panel.classList.toggle('active', isActive);
            panel.classList.toggle('hidden', !isActive);
        });
    }

    function initializeZplTool() {
        const tool = getZplTool ? getZplTool() : null;
        if (tool && tool.init) {
            tool.init();
        }
    }

    function initializePdfTools() {
        const tools = getPdfTools ? getPdfTools() : null;
        if (tools && tools.init) {
            tools.init();
        }
    }

    function initializePdfEditor() {
        const tool = getPdfEditor ? getPdfEditor() : null;
        if (tool && tool.init) {
            tool.init();
        }
    }

    function initializeQrTool() {
        const tool = getQrTool ? getQrTool() : null;
        if (tool && tool.init) {
            tool.init();
        }
    }

    function initializeSharedState() {
        const sharedState = persistence ? persistence.parseSharedState() : null;
        const tool = getZplTool ? getZplTool() : null;
        if (!sharedState || !tool || !tool.restoreSession) {
            return;
        }

        tool.restoreSession(sharedState);
    }

    function initializeHistory() {
        if (!elements.historyList || !elements.historyEmpty || !elements.clearHistoryBtn) {
            return;
        }

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
            if (!persistence.isValidHistoryEntry(entry)) {
                return;
            }

            const button = documentRoot.createElement('button');
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
        const tool = getZplTool ? getZplTool() : null;
        if (!persistence.isValidHistoryEntry(entry) || !tool || !tool.restoreSession) {
            return;
        }

        await tool.restoreSession(entry);
    }

    return {
        init,
        saveHistoryEntry
    };
};
