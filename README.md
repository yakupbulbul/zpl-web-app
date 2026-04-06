# ZPL + PDF Tool Suite

Client-side utility suite for working with Zebra Programming Language labels and PDF files in the browser.

## What It Includes

- ZPL upload and paste workflow with Labelary-based live rendering
- PNG and PDF export for rendered labels
- Debounced live preview in the ZPL editor
- Preset label sizes and densities
- Local conversion history stored in `localStorage`
- Shareable ZPL session links via compressed URL hashes
- PDF merge in the browser
- PDF page organizer with reorder, remove, and rotate actions
- PDF split for selected pages, per-page output, and page ranges

## Stack

- Vanilla HTML, CSS, and JavaScript
- Labelary API for ZPL preview rendering
- `pdf-lib` for browser-side PDF generation and manipulation
- `lz-string` for compressed share links

## Running Locally

1. Clone the repository.
2. Serve it with any static file server.
3. Open the site in a modern browser.

Example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- No backend, database, or authentication is required.
- Theme preference, language preference, and ZPL history are stored locally in the browser.
- PDF processing is fully client-side.
