document.addEventListener('DOMContentLoaded', () => {
    // --- Translations ---
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
            "btn_convert_another": "Convert Another",
            "footer_built": "Built with",
            "footer_by": "by Yakup",
            "footer_github": "GitHub Profile"
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

    // DOM Elements
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Upload Elements
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const fileInfo = document.getElementById('file-info');
    const fileNameDisplay = document.getElementById('file-name');
    const removeFileBtn = document.getElementById('remove-file-btn');
    
    // Paste Elements
    const zplInput = document.getElementById('zpl-input');
    const clearBtn = document.getElementById('clear-btn');
    
    // Settings & Action Elements
    const densitySelect = document.getElementById('density');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const convertBtn = document.getElementById('convert-btn');
    const loader = document.getElementById('loader');
    
    // Result Elements
    const resultSection = document.getElementById('result-section');
    const imagePreview = document.getElementById('image-preview');
    const downloadBtn = document.getElementById('download-btn');
    const newConvertBtn = document.getElementById('new-convert-btn');
    const closeResultBtn = document.getElementById('close-result-btn');

    // State
    let currentMode = 'upload'; // 'upload' or 'paste'
    let selectedFile = null;
    let generatedBlobUrl = null;

    // --- Theme Logic ---
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.name = theme === 'light' ? 'moon-outline' : 'sunny-outline';
        }
    };
    
    // Initialize theme
    setTheme(getPreferredTheme());
    
        if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // --- Language Logic ---
    const langBtn = document.getElementById('lang-btn');
    
    const setLanguage = (lang) => {
        if (!translations[lang]) lang = 'en';
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        if (langBtn) langBtn.value = lang;
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
    };
    
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);
    
    if (langBtn) {
        langBtn.addEventListener('change', (e) => setLanguage(e.target.value));
    }

    // --- Tab Switching ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            currentMode = target;
            
            // Update Tab UI
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update Content UI
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${target}-tab`).classList.add('active');
            
            updateConvertButtonState();
        });
    });

    // --- File Upload Logic ---
    browseBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    removeFileBtn.addEventListener('click', () => {
        selectedFile = null;
        fileInput.value = '';
        dropZone.classList.remove('hidden');
        fileInfo.classList.add('hidden');
        updateConvertButtonState();
    });

    function handleFile(file) {
        // Validate basic file type
        selectedFile = file;
        fileNameDisplay.textContent = file.name;
        dropZone.classList.add('hidden');
        fileInfo.classList.remove('hidden');
        updateConvertButtonState();
    }

    // --- Paste Logic ---
    zplInput.addEventListener('input', updateConvertButtonState);
    
    clearBtn.addEventListener('click', () => {
        zplInput.value = '';
        updateConvertButtonState();
    });

    // --- Validation ---
    function updateConvertButtonState() {
        if (currentMode === 'upload') {
            convertBtn.disabled = !selectedFile;
            convertBtn.style.opacity = !selectedFile ? '0.5' : '1';
            convertBtn.style.cursor = !selectedFile ? 'not-allowed' : 'pointer';
        } else {
            const hasText = zplInput.value.trim().length > 0;
            convertBtn.disabled = !hasText;
            convertBtn.style.opacity = !hasText ? '0.5' : '1';
            convertBtn.style.cursor = !hasText ? 'not-allowed' : 'pointer';
        }
    }

    // Initial check
    updateConvertButtonState();

    // --- Conversion Logic ---
    convertBtn.addEventListener('click', async () => {
        let zplData = '';
        
        if (currentMode === 'upload' && selectedFile) {
            try {
                zplData = await selectedFile.text();
            } catch (err) {
                alert('Error reading the ZPL file.');
                return;
            }
        } else if (currentMode === 'paste') {
            zplData = zplInput.value.trim();
        }

        if (!zplData) return;

        // Settings
        const density = densitySelect.value;
        const width = widthInput.value || 4;
        const height = heightInput.value || 6;
        
        const url = `https://api.labelary.com/v1/printers/${density}dpmm/labels/${width}x${height}/0/`;
        
        setLoadingState(true);

        try {
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

            const blob = await response.blob();
            
            // Cleanup previous blob URL if exists
            if (generatedBlobUrl) {
                URL.revokeObjectURL(generatedBlobUrl);
            }
            
            generatedBlobUrl = URL.createObjectURL(blob);
            displayResult(generatedBlobUrl);
            
        } catch (error) {
            console.error('Conversion error:', error);
            alert(`Failed to convert ZPL. Please check your code or try again. (${error.message})`);
        } finally {
            setLoadingState(false);
        }
    });

    function setLoadingState(isLoading) {
        if (isLoading) {
            convertBtn.classList.add('hidden');
            loader.classList.remove('hidden');
            resultSection.classList.add('hidden');
        } else {
            convertBtn.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    function displayResult(imgUrl) {
        // Build image tag
        imagePreview.innerHTML = `<img src="${imgUrl}" alt="Generated Shipping Label">`;
        
        // Show result section with animation
        resultSection.classList.remove('hidden');
        
        // Scroll to results smoothly
        setTimeout(() => {
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    // --- Action Logic ---
    downloadBtn.addEventListener('click', () => {
        if (generatedBlobUrl) {
            const a = document.createElement('a');
            a.href = generatedBlobUrl;
            a.download = 'label.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });

    newConvertBtn.addEventListener('click', resetView);
    closeResultBtn.addEventListener('click', resetView);

    function resetView() {
        resultSection.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
