document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            "badge_free": "100% Free Tool",
            "title": "ZPL to PNG Converter",
            "subtitle": "Upload a ZPL file or paste ZPL code to generate a high-quality PNG label instantly.<br>No limits, no sign-up required, completely free.",
            "tab_upload": "File Upload",
            "tab_paste": "Paste Code",
            "drop_title": "Drag & Drop your ZPL file",
            "drop_or": "or",
            "btn_browse": "Browse Files",
            "drop_hint": "Supported formats: .zpl, .txt",
            "label_zpl_code": "ZPL Code",
            "btn_clear": "Clear",
            "label_preset": "Label Preset",
            "preset_shipping_4x6": "4x6 Shipping Label",
            "preset_address_4x2": "4x2 Address Label",
            "preset_product_2x1": "2x1 Product Label",
            "preset_metric_100x150": "100x150 mm",
            "preset_custom": "Custom",
            "label_density": "Print Density",
            "label_size": "Label Size (Inches)",
            "btn_convert": "Convert to PNG",
            "loader_text": "Generating Label...",
            "result_title": "Generated Label",
            "btn_download": "Download PNG",
            "btn_download_pdf": "Download PDF",
            "btn_copy_share": "Copy Share Link",
            "btn_convert_another": "Convert Another",
            "footer_built": "Built with",
            "footer_by": "by Yakup",
            "footer_github": "GitHub Profile",
            "tool_nav_zpl": "ZPL Tools",
            "tool_nav_pdf": "PDF Tools",
            "pdf_tools_title": "PDF Tools",
            "pdf_tools_subtitle": "Browser-based PDF utilities will live here alongside the existing ZPL workflow.",
            "pdf_merge_heading": "PDF Merge",
            "pdf_merge_subtitle": "Select multiple PDF files, reorder them, and merge them directly in your browser.",
            "pdf_merge_empty": "No PDF files selected yet.",
            "pdf_merge_download": "Download Merged PDF",
            "pdf_organizer_heading": "PDF Page Organizer",
            "pdf_organizer_subtitle": "Upload one PDF, then remove, reorder, or rotate its pages before exporting.",
            "pdf_organizer_empty": "Upload a PDF to start organizing pages.",
            "pdf_organizer_export": "Export Updated PDF",
            "pdf_split_heading": "PDF Split",
            "pdf_split_subtitle": "Extract selected pages, split every page, or generate PDFs from page ranges.",
            "pdf_split_mode_label": "Split Mode",
            "pdf_split_mode_selected": "Extract Selected Pages",
            "pdf_split_mode_every": "Split Every Page",
            "pdf_split_mode_ranges": "Split by Page Ranges",
            "pdf_split_input_label": "Pages / Ranges",
            "pdf_split_run": "Generate Split PDFs",
            "pdf_split_empty": "Upload a PDF and choose how to split it.",
            "pdf_preview_label": "Preview",
            "pdf_preview_hint": "Upload a PDF and select a page to preview it here.",
            "pdf_preview_empty": "Preview will appear here when a page is available.",
            "pdf_split_preview_hint": "Upload a PDF to inspect pages before splitting.",
            "pdf_tool_merge_title": "PDF Merge",
            "pdf_tool_merge_desc": "Combine multiple PDF files in the browser without leaving the app.",
            "pdf_tool_organize_title": "PDF Page Organizer",
            "pdf_tool_organize_desc": "Reorder, remove, and rotate pages with a lightweight browser UI.",
            "pdf_tool_split_title": "PDF Split",
            "pdf_tool_split_desc": "Extract page ranges or split documents into separate files on the client.",
            "pdf_tool_coming_soon": "Coming soon",
            "history_title": "Recent Conversions",
            "history_subtitle": "Restore one of your last successful ZPL sessions.",
            "history_clear": "Clear history",
            "history_empty": "No successful conversions saved yet.",
            "share_link_ready": "Share link copied to clipboard.",
            "share_link_failed": "Unable to create a share link right now."
        },
        de: {
            "badge_free": "100% Kostenlos",
            "title": "ZPL zu PNG Konverter",
            "subtitle": "ZPL-Datei hochladen oder ZPL-Code einfügen, um sofort ein hochwertiges PNG-Etikett zu generieren.<br>Keine Limits, keine Anmeldung, völlig kostenlos.",
            "tab_upload": "Datei hochladen",
            "tab_paste": "Code einfügen",
            "drop_title": "ZPL-Datei hier ablegen",
            "drop_or": "oder",
            "btn_browse": "Durchsuchen",
            "drop_hint": "Unterstützte Formate: .zpl, .txt",
            "label_zpl_code": "ZPL-Code",
            "btn_clear": "Löschen",
            "label_density": "Druckdichte",
            "label_size": "Etikettengröße (Zoll)",
            "btn_convert": "Als PNG generieren",
            "loader_text": "Etikett wird erstellt...",
            "result_title": "Fertiges Etikett",
            "btn_download": "PNG Herunterladen",
            "btn_convert_another": "Neues Etikett",
            "footer_built": "Erstellt mit",
            "footer_by": "von Yakup",
            "footer_github": "GitHub-Profil"
        },
        tr: {
            "badge_free": "Tamamen Ücretsiz",
            "title": "ZPL'den PNG'ye Dönüştürücü",
            "subtitle": "Anında yüksek kaliteli bir PNG etiketi oluşturmak için ZPL dosyanızı yükleyin veya kodunuzu yapıştırın.<br>Sınır yok, kayıt olmak yok, tamamen ücretsiz.",
            "tab_upload": "Dosya Yükle",
            "tab_paste": "Kodu Yapıştır",
            "drop_title": "ZPL dosyanızı sürükleyip bırakın",
            "drop_or": "veya",
            "btn_browse": "Dosya Seç",
            "drop_hint": "Desteklenen formatlar: .zpl, .txt",
            "label_zpl_code": "ZPL Kodu",
            "btn_clear": "Temizle",
            "label_density": "Baskı Yoğunluğu",
            "label_size": "Etiket Boyutu (İnç)",
            "btn_convert": "PNG'ye Çevir",
            "loader_text": "Etiket Oluşturuluyor...",
            "result_title": "Oluşturulan Etiket",
            "btn_download": "PNG İndir",
            "btn_convert_another": "Yeni Dönüştür",
            "footer_built": "Geliştirici:",
            "footer_by": "Yakup",
            "footer_github": "GitHub Profili"
        },
        nl: {
            "badge_free": "100% Gratis",
            "title": "ZPL naar PNG Converter",
            "subtitle": "Upload een ZPL-bestand of plak ZPL-code om direct een PNG-label van hoge kwaliteit te genereren.<br>Geen limieten, geen account nodig, helemaal gratis.",
            "tab_upload": "Bestand uploaden",
            "tab_paste": "Code plakken",
            "drop_title": "Sleep je ZPL-bestand hierheen",
            "drop_or": "of",
            "btn_browse": "Bladeren",
            "drop_hint": "Ondersteunde formaten: .zpl, .txt",
            "label_zpl_code": "ZPL Code",
            "btn_clear": "Wissen",
            "label_density": "Afdrukdichtheid",
            "label_size": "Labelformaat (Inch)",
            "btn_convert": "Converteren naar PNG",
            "loader_text": "Label genereren...",
            "result_title": "Gegenereerd Label",
            "btn_download": "PNG Downloaden",
            "btn_convert_another": "Nieuw Label",
            "footer_built": "Gemaakt met",
            "footer_by": "door Yakup",
            "footer_github": "GitHub Profiel"
        },
        fr: {
            "badge_free": "100% Gratuit",
            "title": "Convertisseur ZPL vers PNG",
            "subtitle": "Téléchargez un fichier ZPL ou collez le code ZPL pour générer instantanément une étiquette PNG de haute qualité.<br>Sans limites, sans inscription, totalement gratuit.",
            "tab_upload": "Télécharger Fichier",
            "tab_paste": "Coller le Code",
            "drop_title": "Glissez-déposez votre fichier ZPL",
            "drop_or": "ou",
            "btn_browse": "Parcourir",
            "drop_hint": "Formats supportés : .zpl, .txt",
            "label_zpl_code": "Code ZPL",
            "btn_clear": "Effacer",
            "label_density": "Densité d'impression",
            "label_size": "Taille de l'étiquette (Pouces)",
            "btn_convert": "Convertir en PNG",
            "loader_text": "Génération en cours...",
            "result_title": "Étiquette Générée",
            "btn_download": "Télécharger PNG",
            "btn_convert_another": "Nouvelle Étiquette",
            "footer_built": "Fait avec",
            "footer_by": "par Yakup",
            "footer_github": "Profil GitHub"
        },
        it: {
            "badge_free": "100% Gratuito",
            "title": "Convertitore da ZPL a PNG",
            "subtitle": "Carica un file ZPL o incolla il codice ZPL per generare all'istante un'etichetta PNG di alta qualità.<br>Nessun limite, nessuna registrazione richiesta, completamente gratuito.",
            "tab_upload": "Carica File",
            "tab_paste": "Incolla Codice",
            "drop_title": "Trascina qui il tuo file ZPL",
            "drop_or": "oppure",
            "btn_browse": "Sfoglia",
            "drop_hint": "Formati supportati: .zpl, .txt",
            "label_zpl_code": "Codice ZPL",
            "btn_clear": "Svuota",
            "label_density": "Densità di Stampa",
            "label_size": "Dimensione Etichetta (Pollici)",
            "btn_convert": "Converti in PNG",
            "loader_text": "Generazione in corso...",
            "result_title": "Etichetta Generata",
            "btn_download": "Scarica PNG",
            "btn_convert_another": "Nuova Etichetta",
            "footer_built": "Creato con",
            "footer_by": "da Yakup",
            "footer_github": "Profilo GitHub"
        }
    };

    const elements = {
        tabs: document.querySelectorAll('.tab'),
        tabContents: document.querySelectorAll('.tab-content'),
        toolTabs: document.querySelectorAll('.tool-tab'),
        toolPanels: document.querySelectorAll('.tool-panel'),
        dropZone: document.getElementById('drop-zone'),
        fileInput: document.getElementById('file-input'),
        browseBtn: document.getElementById('browse-btn'),
        fileInfo: document.getElementById('file-info'),
        fileNameDisplay: document.getElementById('file-name'),
        removeFileBtn: document.getElementById('remove-file-btn'),
        zplInput: document.getElementById('zpl-input'),
        clearBtn: document.getElementById('clear-btn'),
        presetSelect: document.getElementById('preset'),
        densitySelect: document.getElementById('density'),
        widthInput: document.getElementById('width'),
        heightInput: document.getElementById('height'),
        convertBtn: document.getElementById('convert-btn'),
        loader: document.getElementById('loader'),
        resultSection: document.getElementById('result-section'),
        imagePreview: document.getElementById('image-preview'),
        downloadBtn: document.getElementById('download-btn'),
        downloadPdfBtn: document.getElementById('download-pdf-btn'),
        copyLinkBtn: document.getElementById('copy-link-btn'),
        newConvertBtn: document.getElementById('new-convert-btn'),
        closeResultBtn: document.getElementById('close-result-btn'),
        historyList: document.getElementById('history-list'),
        historyEmpty: document.getElementById('history-empty'),
        clearHistoryBtn: document.getElementById('clear-history-btn'),
        pdfMergeInput: document.getElementById('pdf-merge-input'),
        pdfMergeList: document.getElementById('pdf-merge-list'),
        pdfMergeEmpty: document.getElementById('pdf-merge-empty'),
        pdfMergeDownloadBtn: document.getElementById('pdf-merge-download-btn'),
        pdfMergeFeedback: document.getElementById('pdf-merge-feedback'),
        pdfMergeStatus: document.getElementById('pdf-merge-status'),
        pdfMergePicker: document.getElementById('pdf-merge-picker'),
        pdfOrganizerInput: document.getElementById('pdf-organizer-input'),
        pdfOrganizerList: document.getElementById('pdf-organizer-list'),
        pdfOrganizerEmpty: document.getElementById('pdf-organizer-empty'),
        pdfOrganizerExportBtn: document.getElementById('pdf-organizer-export-btn'),
        pdfOrganizerFeedback: document.getElementById('pdf-organizer-feedback'),
        pdfOrganizerPreviewMeta: document.getElementById('pdf-organizer-preview-meta'),
        pdfOrganizerPreviewEmpty: document.getElementById('pdf-organizer-preview-empty'),
        pdfOrganizerPreviewCanvas: document.getElementById('pdf-organizer-preview-canvas'),
        pdfOrganizerStatus: document.getElementById('pdf-organizer-status'),
        pdfOrganizerPicker: document.getElementById('pdf-organizer-picker'),
        pdfSplitInput: document.getElementById('pdf-split-input'),
        pdfSplitMode: document.getElementById('pdf-split-mode'),
        pdfSplitRanges: document.getElementById('pdf-split-ranges'),
        pdfSplitRunBtn: document.getElementById('pdf-split-run-btn'),
        pdfSplitOutputList: document.getElementById('pdf-split-output-list'),
        pdfSplitEmpty: document.getElementById('pdf-split-empty'),
        pdfSplitFeedback: document.getElementById('pdf-split-feedback'),
        pdfSplitPreviewMeta: document.getElementById('pdf-split-preview-meta'),
        pdfSplitPreviewEmpty: document.getElementById('pdf-split-preview-empty'),
        pdfSplitPreviewCanvas: document.getElementById('pdf-split-preview-canvas'),
        pdfSplitPageGrid: document.getElementById('pdf-split-page-grid'),
        pdfSplitStatus: document.getElementById('pdf-split-status'),
        pdfSplitPicker: document.getElementById('pdf-split-picker'),
        actionFeedback: document.getElementById('action-feedback'),
        themeBtn: document.getElementById('theme-btn'),
        themeIcon: document.getElementById('theme-icon'),
        langBtn: document.getElementById('lang-btn')
    };

    const state = {
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

    const HISTORY_STORAGE_KEY = 'zpl-conversion-history';
    const HISTORY_LIMIT = 10;

    function configurePdfPreviewRuntime() {
        if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
    }

    const labelPresets = {
        shipping_4x6: { width: '4', height: '6', density: '8' },
        address_4x2: { width: '4', height: '2', density: '8' },
        product_2x1: { width: '2', height: '1', density: '8' },
        metric_100x150: { width: '3.94', height: '5.91', density: '8' }
    };

    configurePdfPreviewRuntime();
    initializeTheme();
    initializeLanguage();
    initializeToolSuite();
    initializeTabs();
    initializeUpload();
    initializePresets();
    initializeHistory();
    initializePaste();
    initializeActions();
    initializeSharedState();
    initializePdfMerge();
    initializePdfOrganizer();
    initializePdfSplit();
    updateConvertButtonState();

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

    function initializePresets() {
        elements.presetSelect.value = 'shipping_4x6';

        elements.presetSelect.addEventListener('change', () => {
            applySelectedPreset();
        });

        elements.widthInput.addEventListener('input', markPresetAsCustom);
        elements.heightInput.addEventListener('input', markPresetAsCustom);
        elements.densitySelect.addEventListener('change', markPresetAsCustom);
    }

    function applySelectedPreset() {
        const presetKey = elements.presetSelect.value;
        const preset = labelPresets[presetKey];

        if (!preset) {
            return;
        }

        state.applyingPreset = true;
        elements.widthInput.value = preset.width;
        elements.heightInput.value = preset.height;
        elements.densitySelect.value = preset.density;
        state.applyingPreset = false;
    }

    function markPresetAsCustom() {
        if (state.applyingPreset) {
            return;
        }

        elements.presetSelect.value = 'custom';
    }

    function initializeTabs() {
        elements.tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                switchInputTab(tab.dataset.tab);
            });
        });
    }

    function initializeToolSuite() {
        elements.toolTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                switchToolPanel(tab.dataset.tool);
            });
        });
    }

    function switchToolPanel(toolName) {
        state.currentTool = toolName;

        elements.toolTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.tool === toolName);
        });

        elements.toolPanels.forEach((panel) => {
            const isActive = panel.id === `${toolName}-tools-panel`;
            panel.classList.toggle('hidden', !isActive);
            panel.classList.toggle('active', isActive);
        });
    }

    function switchInputTab(targetTab) {
        state.currentMode = targetTab;
        clearLivePreviewTimer();

        elements.tabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.tab === targetTab);
        });

        elements.tabContents.forEach((content) => {
            content.classList.toggle('active', content.id === `${targetTab}-tab`);
        });

        updateConvertButtonState();
    }

    function initializeUpload() {
        elements.browseBtn.addEventListener('click', () => elements.fileInput.click());

        elements.fileInput.addEventListener('change', (event) => {
            if (event.target.files.length > 0) {
                handleFile(event.target.files[0]);
            }
        });

        elements.dropZone.addEventListener('dragover', (event) => {
            event.preventDefault();
            elements.dropZone.classList.add('dragover');
        });

        elements.dropZone.addEventListener('dragleave', () => {
            elements.dropZone.classList.remove('dragover');
        });

        elements.dropZone.addEventListener('drop', (event) => {
            event.preventDefault();
            elements.dropZone.classList.remove('dragover');

            if (event.dataTransfer.files.length > 0) {
                handleFile(event.dataTransfer.files[0]);
            }
        });

        elements.removeFileBtn.addEventListener('click', clearSelectedFile);
    }

    function handleFile(file) {
        state.selectedFile = file;
        elements.fileNameDisplay.textContent = file.name;
        elements.dropZone.classList.add('hidden');
        elements.fileInfo.classList.remove('hidden');
        updateConvertButtonState();
    }

    function clearSelectedFile() {
        state.selectedFile = null;
        elements.fileInput.value = '';
        elements.dropZone.classList.remove('hidden');
        elements.fileInfo.classList.add('hidden');
        updateConvertButtonState();
    }

    function initializePaste() {
        elements.zplInput.addEventListener('input', () => {
            updateConvertButtonState();
            scheduleLivePreview();
        });

        elements.clearBtn.addEventListener('click', () => {
            clearLivePreviewTimer();
            elements.zplInput.value = '';
            updateConvertButtonState();
        });
    }

    function scheduleLivePreview() {
        clearLivePreviewTimer();

        if (state.currentMode !== 'paste') {
            return;
        }

        const zplData = elements.zplInput.value.trim();
        if (!zplData) {
            return;
        }

        state.livePreviewTimer = window.setTimeout(() => {
            requestRender(zplData, getRenderSettings());
        }, 500);
    }

    function clearLivePreviewTimer() {
        if (state.livePreviewTimer) {
            window.clearTimeout(state.livePreviewTimer);
            state.livePreviewTimer = null;
        }
    }

    async function requestRender(zplData, settings, options = {}) {
        const requestId = ++state.renderRequestSequence;
        state.latestRenderRequest = requestId;
        await renderZplToPng(zplData, settings, requestId, options);
    }

    function updatePdfPickerStatus(element, message) {
        if (element) {
            element.textContent = message;
        }
    }

    function attachPdfPickerDropzone(dropzone, onFiles) {
        if (!dropzone) {
            return;
        }

        dropzone.addEventListener('dragover', (event) => {
            event.preventDefault();
            dropzone.classList.add('dragover');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragover');
        });

        dropzone.addEventListener('drop', async (event) => {
            event.preventDefault();
            dropzone.classList.remove('dragover');
            const files = Array.from(event.dataTransfer?.files || []);
            if (!files.length) {
                return;
            }

            await onFiles(files);
        });
    }

    function initializePdfSplit() {
        elements.pdfSplitInput.addEventListener('change', async (event) => {
            const [file] = Array.from(event.target.files || []);
            await handleSplitFile(file);
        });

        attachPdfPickerDropzone(elements.pdfSplitPicker, async (files) => {
            await handleSplitFile(files[0]);
        });

        elements.pdfSplitMode.addEventListener('change', () => {
            renderSplitPreviewState();
        });

        elements.pdfSplitRanges.addEventListener('input', () => {
            renderSplitPreviewState();
        });

        elements.pdfSplitRunBtn.addEventListener('click', async () => {
            await runPdfSplit();
        });

        renderPdfSplitOutputs();
        renderSplitPreviewState();
    }

    async function handleSplitFile(file) {
        if (!file) {
            return;
        }

        updatePdfPickerStatus(elements.pdfSplitStatus, file.name);
        await loadSplitFile(file);
    }

    async function loadSplitFile(file) {
        try {
            clearPdfSplitOutputs();
            state.pdfSplitSourceBytes = cloneArrayBuffer(await file.arrayBuffer());
            const { PDFDocument } = window.PDFLib;
            const document = await PDFDocument.load(cloneArrayBuffer(state.pdfSplitSourceBytes));
            state.pdfSplitPageCount = document.getPageCount();
            state.pdfSplitPreviewDocument = await loadPdfPreviewDocument(cloneArrayBuffer(state.pdfSplitSourceBytes));
            state.pdfSplitActivePage = 1;
            hidePdfSplitFeedback();
            renderPdfSplitOutputs();
            renderSplitPreviewState();
        } catch (error) {
            console.error('PDF split load error:', error);
            showPdfSplitFeedback(`Failed to read PDF. (${error.message})`, true);
        }
    }

    async function runPdfSplit() {
        if (!state.pdfSplitSourceBytes || !state.pdfSplitPageCount) {
            showPdfSplitFeedback('Upload a PDF before splitting.', true);
            return;
        }

        try {
            clearPdfSplitOutputs();
            const mode = elements.pdfSplitMode.value;
            const sourceDocument = await window.PDFLib.PDFDocument.load(cloneArrayBuffer(state.pdfSplitSourceBytes));

            if (mode === 'every') {
                for (let pageIndex = 0; pageIndex < state.pdfSplitPageCount; pageIndex += 1) {
                    const bytes = await buildPdfFromPageIndices(sourceDocument, [pageIndex]);
                    addPdfSplitOutput(`page-${pageIndex + 1}.pdf`, bytes);
                }
            } else if (mode === 'selected') {
                const selectedPages = parsePageListInput(elements.pdfSplitRanges.value, state.pdfSplitPageCount);
                const bytes = await buildPdfFromPageIndices(sourceDocument, selectedPages);
                addPdfSplitOutput('selected-pages.pdf', bytes);
            } else {
                const ranges = parsePageRangeInput(elements.pdfSplitRanges.value, state.pdfSplitPageCount);
                for (const range of ranges) {
                    const bytes = await buildPdfFromPageIndices(sourceDocument, range.indices);
                    addPdfSplitOutput(`pages-${range.label}.pdf`, bytes);
                }
            }

            renderPdfSplitOutputs();
            renderSplitPreviewState();
            hidePdfSplitFeedback();
        } catch (error) {
            console.error('PDF split error:', error);
            showPdfSplitFeedback(error.message || 'Failed to split PDF.', true);
        }
    }

    async function buildPdfFromPageIndices(sourceDocument, pageIndices) {
        const outputDocument = await window.PDFLib.PDFDocument.create();
        const copiedPages = await outputDocument.copyPages(sourceDocument, pageIndices);
        copiedPages.forEach((page) => outputDocument.addPage(page));
        return outputDocument.save();
    }

    function parsePageListInput(value, pageCount) {
        const tokens = value.split(',').map((token) => token.trim()).filter(Boolean);
        if (!tokens.length) {
            throw new Error('Enter one or more page numbers.');
        }

        const seen = new Set();
        const pages = [];

        tokens.forEach((token) => {
            if (!/^\d+$/.test(token)) {
                throw new Error('Selected pages must be comma-separated page numbers.');
            }

            const pageNumber = Number(token);
            if (pageNumber < 1 || pageNumber > pageCount) {
                throw new Error('Selected page is outside the document range.');
            }

            if (!seen.has(pageNumber)) {
                seen.add(pageNumber);
                pages.push(pageNumber - 1);
            }
        });

        return pages;
    }

    function parsePageRangeInput(value, pageCount) {
        const tokens = value.split(',').map((token) => token.trim()).filter(Boolean);
        if (!tokens.length) {
            throw new Error('Enter one or more page ranges such as 1-3,4-6.');
        }

        return tokens.map((token) => {
            const match = token.match(/^(\d+)-(\d+)$/);
            if (!match) {
                throw new Error('Ranges must use start-end format, for example 1-3.');
            }

            const start = Number(match[1]);
            const end = Number(match[2]);
            if (start < 1 || end < start || end > pageCount) {
                throw new Error('A page range is outside the document bounds.');
            }

            return {
                label: `${start}-${end}`,
                indices: Array.from({ length: end - start + 1 }, (_, index) => start - 1 + index)
            };
        });
    }

    function addPdfSplitOutput(name, bytes) {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        state.pdfSplitOutputs.push({
            name,
            url: URL.createObjectURL(blob)
        });
    }

    function clearPdfSplitOutputs() {
        state.pdfSplitOutputs.forEach((output) => URL.revokeObjectURL(output.url));
        state.pdfSplitOutputs = [];
    }

    function renderPdfSplitOutputs() {
        elements.pdfSplitOutputList.innerHTML = '';

        if (!state.pdfSplitOutputs.length) {
            elements.pdfSplitEmpty.classList.remove('hidden');
            return;
        }

        elements.pdfSplitEmpty.classList.add('hidden');

        state.pdfSplitOutputs.forEach((output) => {
            const row = document.createElement('div');
            row.className = 'pdf-output-row';
            row.innerHTML = `
                <span class="pdf-output-name">${escapeHtml(output.name)}</span>
                <button class="btn btn-outline">Download</button>
            `;
            row.querySelector('button').addEventListener('click', () => downloadBlobUrl(output.url, output.name));
            elements.pdfSplitOutputList.appendChild(row);
        });
    }

    function renderSplitPreviewState() {
        renderSplitPageGrid();
        updateSplitPreview();
    }

    function renderSplitPageGrid() {
        elements.pdfSplitPageGrid.innerHTML = '';

        if (!state.pdfSplitPageCount) {
            return;
        }

        const highlightedPages = getSplitHighlightedPages();

        for (let pageNumber = 1; pageNumber <= state.pdfSplitPageCount; pageNumber += 1) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'pdf-page-chip';
            button.textContent = `${pageNumber}`;
            button.classList.toggle('is-active', pageNumber === state.pdfSplitActivePage);
            button.classList.toggle('is-selected', highlightedPages.has(pageNumber));
            button.addEventListener('click', () => {
                state.pdfSplitActivePage = pageNumber;

                if (elements.pdfSplitMode.value === 'selected') {
                    toggleSelectedSplitPage(pageNumber);
                }

                renderSplitPreviewState();
            });
            elements.pdfSplitPageGrid.appendChild(button);
        }
    }

    function toggleSelectedSplitPage(pageNumber) {
        const pages = Array.from(getSplitHighlightedPages()).sort((left, right) => left - right);
        const nextPages = pages.includes(pageNumber)
            ? pages.filter((value) => value !== pageNumber)
            : [...pages, pageNumber].sort((left, right) => left - right);

        elements.pdfSplitRanges.value = nextPages.join(',');
    }

    function getSplitHighlightedPages() {
        if (!state.pdfSplitPageCount) {
            return new Set();
        }

        if (elements.pdfSplitMode.value === 'every') {
            return new Set(Array.from({ length: state.pdfSplitPageCount }, (_, index) => index + 1));
        }

        const rawValue = elements.pdfSplitRanges.value.trim();
        if (!rawValue) {
            return new Set();
        }

        if (elements.pdfSplitMode.value === 'selected') {
            return getSoftSelectedPages(rawValue, state.pdfSplitPageCount);
        }

        return getSoftRangePages(rawValue, state.pdfSplitPageCount);
    }

    function getSoftSelectedPages(value, pageCount) {
        const pages = new Set();
        value.split(',').map((token) => token.trim()).filter(Boolean).forEach((token) => {
            if (!/^\d+$/.test(token)) {
                return;
            }

            const pageNumber = Number(token);
            if (pageNumber >= 1 && pageNumber <= pageCount) {
                pages.add(pageNumber);
            }
        });
        return pages;
    }

    function getSoftRangePages(value, pageCount) {
        const pages = new Set();
        value.split(',').map((token) => token.trim()).filter(Boolean).forEach((token) => {
            const match = token.match(/^(\d+)-(\d+)$/);
            if (!match) {
                return;
            }

            const start = Number(match[1]);
            const end = Number(match[2]);
            if (start < 1 || end < start || end > pageCount) {
                return;
            }

            for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
                pages.add(pageNumber);
            }
        });
        return pages;
    }

    async function updateSplitPreview() {
        if (!state.pdfSplitPreviewDocument || !state.pdfSplitPageCount) {
            elements.pdfSplitPreviewMeta.textContent = translations.en.pdf_split_preview_hint;
            elements.pdfSplitPreviewCanvas.classList.add('hidden');
            elements.pdfSplitPreviewEmpty.classList.remove('hidden');
            return;
        }

        if (state.pdfSplitActivePage < 1 || state.pdfSplitActivePage > state.pdfSplitPageCount) {
            state.pdfSplitActivePage = 1;
        }

        const highlightedPages = getSplitHighlightedPages();
        const previewStatus = highlightedPages.has(state.pdfSplitActivePage) ? 'selected' : 'inspecting';
        elements.pdfSplitPreviewMeta.textContent = `Page ${state.pdfSplitActivePage} of ${state.pdfSplitPageCount} · ${previewStatus}`;

        try {
            await renderPdfPagePreview({
                pdfDocument: state.pdfSplitPreviewDocument,
                pageNumber: state.pdfSplitActivePage,
                canvas: elements.pdfSplitPreviewCanvas,
                emptyState: elements.pdfSplitPreviewEmpty,
                maxWidth: 560,
                maxHeight: 680,
                sequenceKey: 'pdfSplitPreviewSequence'
            });
        } catch (error) {
            console.error('PDF split preview error:', error);
            showPdfSplitFeedback(`Preview failed. (${error.message})`, true);
        }
    }

    function showPdfSplitFeedback(message, isError = false) {
        elements.pdfSplitFeedback.textContent = message;
        elements.pdfSplitFeedback.classList.remove('hidden');
        elements.pdfSplitFeedback.classList.toggle('is-error', isError);
    }

    function hidePdfSplitFeedback() {
        elements.pdfSplitFeedback.textContent = '';
        elements.pdfSplitFeedback.classList.add('hidden');
        elements.pdfSplitFeedback.classList.remove('is-error');
    }

    function cloneArrayBuffer(buffer) {
        return buffer.slice(0);
    }

    async function loadPdfPreviewDocument(bytes) {
        if (!window.pdfjsLib) {
            throw new Error('PDF preview library is unavailable.');
        }

        const loadingTask = window.pdfjsLib.getDocument({ data: new Uint8Array(bytes) });
        return loadingTask.promise;
    }

    async function renderPdfPagePreview({ pdfDocument, pageNumber, canvas, emptyState, maxWidth, maxHeight, sequenceKey, extraRotation = 0 }) {
        const sequence = ++state[sequenceKey];
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1, rotation: extraRotation });
        const scale = Math.min(maxWidth / viewport.width, maxHeight / viewport.height, 1.35);
        const finalScale = Math.max(scale, 0.45);
        const deviceScale = window.devicePixelRatio || 1;
        const renderViewport = page.getViewport({ scale: finalScale * deviceScale, rotation: extraRotation });

        if (sequence !== state[sequenceKey]) {
            return;
        }

        const context = canvas.getContext('2d');
        canvas.width = Math.ceil(renderViewport.width);
        canvas.height = Math.ceil(renderViewport.height);
        canvas.style.width = `${(renderViewport.width / deviceScale).toFixed(0)}px`;
        canvas.style.height = `${(renderViewport.height / deviceScale).toFixed(0)}px`;

        await page.render({
            canvasContext: context,
            viewport: renderViewport
        }).promise;

        if (sequence !== state[sequenceKey]) {
            return;
        }

        canvas.classList.remove('hidden');
        emptyState.classList.add('hidden');
    }

    function initializePdfOrganizer() {
        elements.pdfOrganizerInput.addEventListener('change', async (event) => {
            const [file] = Array.from(event.target.files || []);
            await handleOrganizerFile(file);
        });

        attachPdfPickerDropzone(elements.pdfOrganizerPicker, async (files) => {
            await handleOrganizerFile(files[0]);
        });

        elements.pdfOrganizerExportBtn.addEventListener('click', async () => {
            await exportOrganizedPdf();
        });

        renderOrganizerList();
        updateOrganizerPreview();
    }

    async function handleOrganizerFile(file) {
        if (!file) {
            return;
        }

        updatePdfPickerStatus(elements.pdfOrganizerStatus, file.name);
        await loadOrganizerFile(file);
    }

    async function loadOrganizerFile(file) {
        try {
            state.pdfOrganizerSourceBytes = cloneArrayBuffer(await file.arrayBuffer());
            const { PDFDocument } = window.PDFLib;
            const document = await PDFDocument.load(cloneArrayBuffer(state.pdfOrganizerSourceBytes));
            state.pdfOrganizerPages = document.getPageIndices().map((pageIndex) => ({
                sourceIndex: pageIndex,
                rotation: 0
            }));
            state.pdfOrganizerPreviewDocument = await loadPdfPreviewDocument(cloneArrayBuffer(state.pdfOrganizerSourceBytes));
            state.pdfOrganizerActiveIndex = 0;
            hidePdfOrganizerFeedback();
            renderOrganizerList();
            await updateOrganizerPreview();
        } catch (error) {
            console.error('PDF organizer load error:', error);
            showPdfOrganizerFeedback(`Failed to read PDF. (${error.message})`, true);
        }
    }

    function renderOrganizerList() {
        elements.pdfOrganizerList.innerHTML = '';

        if (!state.pdfOrganizerPages.length) {
            elements.pdfOrganizerEmpty.classList.remove('hidden');
            return;
        }

        elements.pdfOrganizerEmpty.classList.add('hidden');

        state.pdfOrganizerPages.forEach((page, index) => {
            const row = document.createElement('div');
            row.className = 'pdf-file-row';
            row.classList.toggle('is-active', index === state.pdfOrganizerActiveIndex);
            row.innerHTML = `
                <div class="pdf-file-meta">
                    <span class="pdf-file-name">Page ${page.sourceIndex + 1}</span>
                    <span class="pdf-file-subtitle">Rotation ${page.rotation}°</span>
                </div>
                <div class="pdf-file-actions">
                    <button class="pdf-action-btn" data-action="up">Up</button>
                    <button class="pdf-action-btn" data-action="down">Down</button>
                    <button class="pdf-action-btn" data-action="rotate">Rotate</button>
                    <button class="pdf-action-btn" data-action="remove">Remove</button>
                </div>
            `;
            row.addEventListener('click', () => {
                state.pdfOrganizerActiveIndex = index;
                renderOrganizerList();
                updateOrganizerPreview();
            });
            row.querySelector('[data-action="up"]').addEventListener('click', (event) => {
                event.stopPropagation();
                moveOrganizerPage(index, -1);
            });
            row.querySelector('[data-action="down"]').addEventListener('click', (event) => {
                event.stopPropagation();
                moveOrganizerPage(index, 1);
            });
            row.querySelector('[data-action="rotate"]').addEventListener('click', (event) => {
                event.stopPropagation();
                rotateOrganizerPage(index);
            });
            row.querySelector('[data-action="remove"]').addEventListener('click', (event) => {
                event.stopPropagation();
                removeOrganizerPage(index);
            });
            elements.pdfOrganizerList.appendChild(row);
        });
    }

    function moveOrganizerPage(index, direction) {
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= state.pdfOrganizerPages.length) {
            return;
        }

        const pages = [...state.pdfOrganizerPages];
        const [page] = pages.splice(index, 1);
        pages.splice(nextIndex, 0, page);
        state.pdfOrganizerPages = pages;
        state.pdfOrganizerActiveIndex = nextIndex;
        renderOrganizerList();
        updateOrganizerPreview();
    }

    function rotateOrganizerPage(index) {
        state.pdfOrganizerPages[index].rotation = (state.pdfOrganizerPages[index].rotation + 90) % 360;
        state.pdfOrganizerActiveIndex = index;
        renderOrganizerList();
        updateOrganizerPreview();
    }

    function removeOrganizerPage(index) {
        state.pdfOrganizerPages = state.pdfOrganizerPages.filter((_, itemIndex) => itemIndex !== index);
        state.pdfOrganizerActiveIndex = Math.max(0, Math.min(state.pdfOrganizerActiveIndex, state.pdfOrganizerPages.length - 1));
        renderOrganizerList();
        updateOrganizerPreview();
    }

    async function updateOrganizerPreview() {
        if (!state.pdfOrganizerPreviewDocument || !state.pdfOrganizerPages.length) {
            elements.pdfOrganizerPreviewMeta.textContent = translations.en.pdf_preview_hint;
            elements.pdfOrganizerPreviewCanvas.classList.add('hidden');
            elements.pdfOrganizerPreviewEmpty.classList.remove('hidden');
            return;
        }

        if (state.pdfOrganizerActiveIndex < 0 || state.pdfOrganizerActiveIndex >= state.pdfOrganizerPages.length) {
            state.pdfOrganizerActiveIndex = 0;
        }

        const page = state.pdfOrganizerPages[state.pdfOrganizerActiveIndex];
        elements.pdfOrganizerPreviewMeta.textContent = `Page ${page.sourceIndex + 1} of ${state.pdfOrganizerPages.length} · Rotation ${page.rotation}°`;

        try {
            await renderPdfPagePreview({
                pdfDocument: state.pdfOrganizerPreviewDocument,
                pageNumber: page.sourceIndex + 1,
                canvas: elements.pdfOrganizerPreviewCanvas,
                emptyState: elements.pdfOrganizerPreviewEmpty,
                maxWidth: 560,
                maxHeight: 700,
                sequenceKey: 'pdfOrganizerPreviewSequence',
                extraRotation: page.rotation
            });
        } catch (error) {
            console.error('PDF organizer preview error:', error);
            showPdfOrganizerFeedback(`Preview failed. (${error.message})`, true);
        }
    }

    async function exportOrganizedPdf() {
        if (!state.pdfOrganizerSourceBytes || !state.pdfOrganizerPages.length) {
            showPdfOrganizerFeedback('Upload a PDF and keep at least one page to export.', true);
            return;
        }

        try {
            const { PDFDocument, degrees } = window.PDFLib;
            const sourceDocument = await PDFDocument.load(cloneArrayBuffer(state.pdfOrganizerSourceBytes));
            const updatedDocument = await PDFDocument.create();

            for (const page of state.pdfOrganizerPages) {
                const [copiedPage] = await updatedDocument.copyPages(sourceDocument, [page.sourceIndex]);
                copiedPage.setRotation(degrees(page.rotation));
                updatedDocument.addPage(copiedPage);
            }

            const updatedBytes = await updatedDocument.save();
            const updatedUrl = URL.createObjectURL(new Blob([updatedBytes], { type: 'application/pdf' }));
            downloadBlobUrl(updatedUrl, 'organized.pdf');
            setTimeout(() => URL.revokeObjectURL(updatedUrl), 1000);
            hidePdfOrganizerFeedback();
        } catch (error) {
            console.error('PDF organizer export error:', error);
            showPdfOrganizerFeedback(`Failed to export PDF. (${error.message})`, true);
        }
    }

    function showPdfOrganizerFeedback(message, isError = false) {
        elements.pdfOrganizerFeedback.textContent = message;
        elements.pdfOrganizerFeedback.classList.remove('hidden');
        elements.pdfOrganizerFeedback.classList.toggle('is-error', isError);
    }

    function hidePdfOrganizerFeedback() {
        elements.pdfOrganizerFeedback.textContent = '';
        elements.pdfOrganizerFeedback.classList.add('hidden');
        elements.pdfOrganizerFeedback.classList.remove('is-error');
    }

    function initializePdfMerge() {
        elements.pdfMergeInput.addEventListener('change', async (event) => {
            const files = Array.from(event.target.files || []);
            await handleMergeFiles(files);
            elements.pdfMergeInput.value = '';
        });

        attachPdfPickerDropzone(elements.pdfMergePicker, handleMergeFiles);

        elements.pdfMergeDownloadBtn.addEventListener('click', async () => {
            await downloadMergedPdf();
        });

        renderMergeFileList();
    }

    async function handleMergeFiles(files) {
        updatePdfPickerStatus(elements.pdfMergeStatus, files.length ? `${files.length} file${files.length === 1 ? '' : 's'} selected.` : 'No files selected yet.');
        await addMergeFiles(files);
    }

    async function addMergeFiles(files) {
        const nextFiles = [];

        for (const file of files) {
            try {
                nextFiles.push({
                    name: file.name,
                    bytes: cloneArrayBuffer(await file.arrayBuffer())
                });
            } catch (error) {
                console.error('PDF merge file read error:', error);
            }
        }

        state.pdfMergeFiles = [...state.pdfMergeFiles, ...nextFiles];
        renderMergeFileList();
    }

    function renderMergeFileList() {
        elements.pdfMergeList.innerHTML = '';

        if (!state.pdfMergeFiles.length) {
            elements.pdfMergeEmpty.classList.remove('hidden');
            return;
        }

        elements.pdfMergeEmpty.classList.add('hidden');

        state.pdfMergeFiles.forEach((file, index) => {
            const row = document.createElement('div');
            row.className = 'pdf-file-row';
            row.innerHTML = `
                <div class="pdf-file-meta">
                    <span class="pdf-file-name">${escapeHtml(file.name)}</span>
                    <span class="pdf-file-subtitle">PDF ${index + 1}</span>
                </div>
                <div class="pdf-file-actions">
                    <button class="pdf-action-btn" data-action="up">Up</button>
                    <button class="pdf-action-btn" data-action="down">Down</button>
                    <button class="pdf-action-btn" data-action="remove">Remove</button>
                </div>
            `;

            row.querySelector('[data-action="up"]').addEventListener('click', () => moveMergeFile(index, -1));
            row.querySelector('[data-action="down"]').addEventListener('click', () => moveMergeFile(index, 1));
            row.querySelector('[data-action="remove"]').addEventListener('click', () => removeMergeFile(index));
            elements.pdfMergeList.appendChild(row);
        });
    }

    function moveMergeFile(index, direction) {
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= state.pdfMergeFiles.length) {
            return;
        }

        const files = [...state.pdfMergeFiles];
        const [item] = files.splice(index, 1);
        files.splice(nextIndex, 0, item);
        state.pdfMergeFiles = files;
        renderMergeFileList();
    }

    function removeMergeFile(index) {
        state.pdfMergeFiles = state.pdfMergeFiles.filter((_, itemIndex) => itemIndex !== index);
        renderMergeFileList();
    }

    async function downloadMergedPdf() {
        if (state.pdfMergeFiles.length < 2) {
            showPdfMergeFeedback('Select at least two PDF files to merge.', true);
            return;
        }

        try {
            const { PDFDocument } = window.PDFLib;
            const mergedDocument = await PDFDocument.create();

            for (const file of state.pdfMergeFiles) {
                const source = await PDFDocument.load(cloneArrayBuffer(file.bytes));
                const pageIndices = source.getPageIndices();
                const copiedPages = await mergedDocument.copyPages(source, pageIndices);
                copiedPages.forEach((page) => mergedDocument.addPage(page));
            }

            const mergedBytes = await mergedDocument.save();
            const mergedUrl = URL.createObjectURL(new Blob([mergedBytes], { type: 'application/pdf' }));
            downloadBlobUrl(mergedUrl, 'merged.pdf');
            setTimeout(() => URL.revokeObjectURL(mergedUrl), 1000);
            hidePdfMergeFeedback();
        } catch (error) {
            console.error('PDF merge error:', error);
            showPdfMergeFeedback(`Failed to merge PDFs. (${error.message})`, true);
        }
    }

    function showPdfMergeFeedback(message, isError = false) {
        elements.pdfMergeFeedback.textContent = message;
        elements.pdfMergeFeedback.classList.remove('hidden');
        elements.pdfMergeFeedback.classList.toggle('is-error', isError);
    }

    function hidePdfMergeFeedback() {
        elements.pdfMergeFeedback.textContent = '';
        elements.pdfMergeFeedback.classList.add('hidden');
        elements.pdfMergeFeedback.classList.remove('is-error');
    }

    function initializeSharedState() {
        const sharedState = parseSharedState();
        if (!sharedState) {
            return;
        }

        clearSelectedFile();
        elements.zplInput.value = sharedState.zpl;
        elements.widthInput.value = sharedState.width;
        elements.heightInput.value = sharedState.height;
        elements.densitySelect.value = sharedState.density;
        elements.presetSelect.value = 'custom';
        switchInputTab('paste');
        updateConvertButtonState();
        requestRender(sharedState.zpl, getRenderSettings());
    }

    function parseSharedState() {
        if (!window.location.hash.startsWith('#zpl=')) {
            return null;
        }

        if (!window.LZString) {
            return null;
        }

        try {
            const compressed = window.location.hash.slice(5);
            const decompressed = window.LZString.decompressFromEncodedURIComponent(compressed);
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

    function initializeHistory() {
        state.conversionHistory = loadHistoryEntries();
        renderHistoryList();

        elements.clearHistoryBtn.addEventListener('click', () => {
            state.conversionHistory = [];
            localStorage.removeItem(HISTORY_STORAGE_KEY);
            renderHistoryList();
        });
    }

    function loadHistoryEntries() {
        try {
            const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
            if (!raw) {
                return [];
            }

            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed.filter(isValidHistoryEntry).slice(0, HISTORY_LIMIT);
        } catch (error) {
            console.error('History parse error:', error);
            return [];
        }
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

    function saveHistoryEntry(zplData, settings) {
        const entry = {
            timestamp: Date.now(),
            width: String(settings.width),
            height: String(settings.height),
            density: String(settings.density),
            snippet: zplData.replace(/\s+/g, ' ').trim().slice(0, 90),
            zpl: zplData
        };

        state.conversionHistory = [entry, ...state.conversionHistory.filter((item) => item.zpl !== entry.zpl)].slice(0, HISTORY_LIMIT);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.conversionHistory));
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
            if (!isValidHistoryEntry(entry)) {
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
        if (!isValidHistoryEntry(entry)) {
            return;
        }

        clearSelectedFile();
        elements.zplInput.value = entry.zpl;
        elements.widthInput.value = entry.width;
        elements.heightInput.value = entry.height;
        elements.densitySelect.value = entry.density;
        elements.presetSelect.value = 'custom';
        switchInputTab('paste');
        updateConvertButtonState();
        await requestRender(entry.zpl, getRenderSettings());
    }

    function escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function initializeActions() {
        elements.convertBtn.addEventListener('click', async () => {
            const zplData = await getCurrentZplData();
            if (!zplData) {
                return;
            }

            const settings = getRenderSettings();
            await requestRender(zplData, settings, { persistHistory: true });
        });

        elements.downloadBtn.addEventListener('click', () => {
            downloadBlobUrl(state.generatedBlobUrl, 'label.png');
        });

        elements.downloadPdfBtn.addEventListener('click', async () => {
            await downloadCurrentPdf();
        });

        elements.copyLinkBtn.addEventListener('click', async () => {
            await copyShareLink();
        });

        elements.newConvertBtn.addEventListener('click', resetView);
        elements.closeResultBtn.addEventListener('click', resetView);
    }

    function updateConvertButtonState() {
        const isEnabled = state.currentMode === 'upload'
            ? Boolean(state.selectedFile)
            : elements.zplInput.value.trim().length > 0;

        elements.convertBtn.disabled = !isEnabled;
        elements.convertBtn.style.opacity = isEnabled ? '1' : '0.5';
        elements.convertBtn.style.cursor = isEnabled ? 'pointer' : 'not-allowed';
    }

    async function getCurrentZplData() {
        if (state.currentMode === 'upload') {
            return getFileZplData();
        }

        return elements.zplInput.value.trim();
    }

    async function getFileZplData() {
        if (!state.selectedFile) {
            return '';
        }

        try {
            return await state.selectedFile.text();
        } catch (error) {
            alert('Error reading the ZPL file.');
            return '';
        }
    }

    function getRenderSettings() {
        return {
            density: elements.densitySelect.value,
            width: elements.widthInput.value || 4,
            height: elements.heightInput.value || 6
        };
    }

    async function renderZplToPng(zplData, settings, requestId, options = {}) {
        setLoadingState(true);

        try {
            const blob = await fetchLabelImage(zplData, settings);

            if (requestId !== state.latestRenderRequest) {
                return;
            }

            state.generatedImageBlob = blob;
            state.lastRenderedZpl = zplData;
            state.lastRenderSettings = { ...settings };
            hideFeedback();
            const blobUrl = createBlobUrl(blob);
            displayResult(blobUrl);

            if (options.persistHistory) {
                saveHistoryEntry(zplData, settings);
            }
        } catch (error) {
            if (requestId !== state.latestRenderRequest) {
                return;
            }

            console.error('Conversion error:', error);
            alert(`Failed to convert ZPL. Please check your code or try again. (${error.message})`);
        } finally {
            if (requestId === state.latestRenderRequest) {
                setLoadingState(false);
            }
        }
    }

    async function fetchLabelImage(zplData, settings) {
        const url = `https://api.labelary.com/v1/printers/${settings.density}dpmm/labels/${settings.width}x${settings.height}/0/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'image/png',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: zplData
        });

        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }

        return response.blob();
    }

    function createBlobUrl(blob) {
        if (state.generatedBlobUrl) {
            URL.revokeObjectURL(state.generatedBlobUrl);
        }

        state.generatedBlobUrl = URL.createObjectURL(blob);
        return state.generatedBlobUrl;
    }

    function setLoadingState(isLoading) {
        elements.convertBtn.classList.toggle('hidden', isLoading);
        elements.loader.classList.toggle('hidden', !isLoading);

        if (isLoading) {
            elements.resultSection.classList.add('hidden');
        }
    }

    function displayResult(imageUrl) {
        elements.imagePreview.innerHTML = `<img src="${imageUrl}" alt="Generated Shipping Label">`;
        elements.resultSection.classList.remove('hidden');

        setTimeout(() => {
            elements.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
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

    async function copyShareLink() {
        if (!state.lastRenderedZpl || !state.lastRenderSettings || !window.LZString) {
            showFeedback(translations.en.share_link_failed, true);
            return;
        }

        try {
            const payload = {
                zpl: state.lastRenderedZpl,
                width: String(state.lastRenderSettings.width),
                height: String(state.lastRenderSettings.height),
                density: String(state.lastRenderSettings.density)
            };
            const encoded = window.LZString.compressToEncodedURIComponent(JSON.stringify(payload));
            const shareUrl = `${window.location.origin}${window.location.pathname}#zpl=${encoded}`;
            await navigator.clipboard.writeText(shareUrl);
            showFeedback(translations.en.share_link_ready);
        } catch (error) {
            console.error('Share link error:', error);
            showFeedback(translations.en.share_link_failed, true);
        }
    }

    async function downloadCurrentPdf() {
        if (!state.generatedImageBlob) {
            showFeedback('Please generate a label before exporting PDF.', true);
            return;
        }

        if (!window.PDFLib || !window.PDFLib.PDFDocument) {
            showFeedback('PDF export is not available right now.', true);
            return;
        }

        const label = elements.downloadPdfBtn.querySelector('[data-i18n="btn_download_pdf"]');
        const originalText = label ? label.textContent : 'Download PDF';
        elements.downloadPdfBtn.disabled = true;

        if (label) {
            label.textContent = 'Generating PDF...';
        }

        try {
            const pdfBytes = await buildPdfFromCurrentImage();
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            downloadBlobUrl(pdfUrl, 'label.pdf');
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
            hideFeedback();
        } catch (error) {
            console.error('PDF export error:', error);
            showFeedback(`Failed to build PDF. (${error.message})`, true);
        } finally {
            elements.downloadPdfBtn.disabled = false;
            if (label) {
                label.textContent = originalText;
            }
        }
    }

    async function buildPdfFromCurrentImage() {
        const { PDFDocument } = window.PDFLib;
        const pdfDocument = await PDFDocument.create();
        const imageBytes = await state.generatedImageBlob.arrayBuffer();
        const pngImage = await pdfDocument.embedPng(imageBytes);
        const page = pdfDocument.addPage([pngImage.width, pngImage.height]);

        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: pngImage.width,
            height: pngImage.height
        });

        return pdfDocument.save();
    }

    function showFeedback(message, isError = false) {
        if (!elements.actionFeedback) {
            return;
        }

        elements.actionFeedback.textContent = message;
        elements.actionFeedback.classList.remove('hidden');
        elements.actionFeedback.classList.toggle('is-error', isError);
    }

    function hideFeedback() {
        if (!elements.actionFeedback) {
            return;
        }

        elements.actionFeedback.textContent = '';
        elements.actionFeedback.classList.add('hidden');
        elements.actionFeedback.classList.remove('is-error');
    }

    function resetView() {
        hideFeedback();
        elements.resultSection.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
