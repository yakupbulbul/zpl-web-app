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
            "label_density": "Print Density",
            "label_size": "Label Size (Inches)",
            "btn_convert": "Convert to PNG",
            "loader_text": "Generating Label...",
            "result_title": "Generated Label",
            "btn_download": "Download PNG",
            "btn_download_pdf": "Download PDF",
            "btn_convert_another": "Convert Another",
            "footer_built": "Built with",
            "footer_by": "by Yakup",
            "footer_github": "GitHub Profile",
            "tool_nav_zpl": "ZPL Tools",
            "tool_nav_pdf": "PDF Tools",
            "pdf_tools_title": "PDF Tools",
            "pdf_tools_subtitle": "Browser-based PDF utilities will live here alongside the existing ZPL workflow.",
            "pdf_tool_merge_title": "PDF Merge",
            "pdf_tool_merge_desc": "Combine multiple PDF files in the browser without leaving the app.",
            "pdf_tool_organize_title": "PDF Page Organizer",
            "pdf_tool_organize_desc": "Reorder, remove, and rotate pages with a lightweight browser UI.",
            "pdf_tool_split_title": "PDF Split",
            "pdf_tool_split_desc": "Extract page ranges or split documents into separate files on the client.",
            "pdf_tool_coming_soon": "Coming soon"
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
        densitySelect: document.getElementById('density'),
        widthInput: document.getElementById('width'),
        heightInput: document.getElementById('height'),
        convertBtn: document.getElementById('convert-btn'),
        loader: document.getElementById('loader'),
        resultSection: document.getElementById('result-section'),
        imagePreview: document.getElementById('image-preview'),
        downloadBtn: document.getElementById('download-btn'),
        downloadPdfBtn: document.getElementById('download-pdf-btn'),
        newConvertBtn: document.getElementById('new-convert-btn'),
        closeResultBtn: document.getElementById('close-result-btn'),
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
        currentTool: 'zpl'
    };

    initializeTheme();
    initializeLanguage();
    initializeToolSuite();
    initializeTabs();
    initializeUpload();
    initializePaste();
    initializeActions();
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
        elements.zplInput.addEventListener('input', updateConvertButtonState);

        elements.clearBtn.addEventListener('click', () => {
            elements.zplInput.value = '';
            updateConvertButtonState();
        });
    }

    function initializeActions() {
        elements.convertBtn.addEventListener('click', async () => {
            const zplData = await getCurrentZplData();
            if (!zplData) {
                return;
            }

            const settings = getRenderSettings();
            await renderZplToPng(zplData, settings);
        });

        elements.downloadBtn.addEventListener('click', () => {
            downloadBlobUrl(state.generatedBlobUrl, 'label.png');
        });

        elements.downloadPdfBtn.addEventListener('click', async () => {
            await downloadCurrentPdf();
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

    async function renderZplToPng(zplData, settings) {
        setLoadingState(true);

        try {
            const blob = await fetchLabelImage(zplData, settings);
            state.generatedImageBlob = blob;
            hideFeedback();
            const blobUrl = createBlobUrl(blob);
            displayResult(blobUrl);
        } catch (error) {
            console.error('Conversion error:', error);
            alert(`Failed to convert ZPL. Please check your code or try again. (${error.message})`);
        } finally {
            setLoadingState(false);
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
