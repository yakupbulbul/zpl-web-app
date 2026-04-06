window.ZplWebApp = window.ZplWebApp || {};

window.ZplWebApp.createPdfTools = function createPdfTools({
    elements,
    state,
    translations,
    cloneArrayBuffer,
    escapeHtml,
    downloadBlobUrl
}) {
    function init() {
        initializePdfMerge();
        initializePdfOrganizer();
        initializePdfSplit();
    }

    function updatePickerStatus(element, message) {
        if (element) {
            element.textContent = message;
        }
    }

    function attachPickerDropzone(dropzone, onFiles) {
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

        attachPickerDropzone(elements.pdfSplitPicker, async (files) => {
            await handleSplitFile(files[0]);
        });

        elements.pdfSplitMode.addEventListener('change', renderSplitPreviewState);
        elements.pdfSplitRanges.addEventListener('input', renderSplitPreviewState);
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

        updatePickerStatus(elements.pdfSplitStatus, file.name);
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

        attachPickerDropzone(elements.pdfOrganizerPicker, async (files) => {
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

        updatePickerStatus(elements.pdfOrganizerStatus, file.name);
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

        attachPickerDropzone(elements.pdfMergePicker, handleMergeFiles);

        elements.pdfMergeDownloadBtn.addEventListener('click', async () => {
            await downloadMergedPdf();
        });

        renderMergeFileList();
    }

    async function handleMergeFiles(files) {
        updatePickerStatus(elements.pdfMergeStatus, files.length ? `${files.length} file${files.length === 1 ? '' : 's'} selected.` : 'No files selected yet.');
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

    return {
        init
    };
};
