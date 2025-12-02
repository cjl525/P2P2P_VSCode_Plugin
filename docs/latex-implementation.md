# LaTeX features overview

This extension ships three LaTeX-oriented flows:

- **Preview LaTeX (Command Palette):** Opens a MathJax-powered webview beside the editor, rendering either the current selection or prompted input.
- **Generate PDF (Rust backend):** Invokes the configurable `p2p2p.backendCommand` to emit a LaTeX file, then compiles it with `latexmk` (falling back to `pdflatex`) into `p2p2p_output/<model>.pdf`.
- **PlantUML to PDF:** Renders a `.puml` diagram to PNG, wraps it in a LaTeX template with an optional logo, and compiles it to PDF in `p2p2p_output/`.

## Key implementation points

- The LaTeX preview command builds a VS Code webview using MathJax v3 so no external images are required for rendering.
- PDF generation shares a helper that runs `latexmk` when available and automatically falls back to `pdflatex`.
- Output files (`.tex` and `.pdf`) are written under `p2p2p_output/` in the first workspace folder or the current working directory.
