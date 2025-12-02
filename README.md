# P2P2P README

This is the README for the "P2P2P" extension.

## Features

- Quick command palette entry to preview LaTeX expressions with MathJax in a side-by-side webview.
- Generate LaTeX via your Rust backend and compile it to a PDF saved under `p2p2p_output/<model_name>.pdf`.
- Turn a PlantUML diagram into a LaTeX-wrapped PDF with an optional logo, saved in `p2p2p_output/`.

## How to use the LaTeX preview

1. Open any file in VS Code and highlight the LaTeX expression you want to preview, or leave your cursor in the editor.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and run **P2P2P: Preview LaTeX**.
3. If you selected text, it is rendered immediately. If nothing is selected, you will be prompted to type LaTeX (for example, `\frac{a}{b}`) and press Enter.
4. A preview webview opens beside your editor and renders the expression using MathJax. You do **not** need to provide an image (JPEG/PNG); the preview is generated directly from the LaTeX source.

## How to generate a PDF from the Rust backend

1. Ensure your Rust backend binary is installed and reachable on your PATH (default command: `p2p2p-backend`).
2. (Optional) Override the backend path via **Settings** → **Extensions** → **P2P2P** → **Backend Command**.
3. Install a LaTeX toolchain that includes `latexmk` or `pdflatex`.
4. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and run **P2P2P: Generate PDF**.
5. Enter a model name when prompted. The extension will:
   - Call the Rust backend to render a LaTeX file from your template.
   - Compile the LaTeX into a PDF using `latexmk` (falling back to `pdflatex`).
   - Save both the `.tex` and `.pdf` under `p2p2p_output/<model_name>.*` within your workspace.

## How to convert PlantUML to PDF via LaTeX

1. Install [PlantUML](https://plantuml.com/) on your PATH and ensure `latexmk` or `pdflatex` is available.
2. Open a `.puml` file (or note its path). Optionally, pick a logo image you want to appear above the diagram.
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and run **P2P2P: PlantUML to PDF**.
4. Enter the `.puml` file path (pre-filled with the active editor file if applicable) and the optional logo path when prompted.
5. The extension will:
   - Ask PlantUML to generate a PNG rendering of the diagram into `p2p2p_output/`.
   - Generate a LaTeX wrapper that places the logo (if provided) above the diagram.
   - Compile the LaTeX into a PDF using `latexmk` (with a `pdflatex` fallback) named after the `.puml` stem in `p2p2p_output/`.

## Known Issues

PDF generation requires a reachable Rust backend executable (configurable via `p2p2p.backendCommand`) and a LaTeX toolchain (`latexmk` or `pdflatex`) installed on your system.

## Release Notes

Adds a LaTeX preview helper plus a Rust-backend-driven PDF generator that writes to `p2p2p_output/<model_name>.pdf` (requires the backend and LaTeX toolchain).

## Install the VSIX in VS Code

> The checked-in `p2p2p-0.0.1.vsix` was created before the LaTeX preview existed. Build and install a fresh VSIX from this branch to get `P2P2P: Preview LaTeX`.

1. Install the VS Code packaging tool if you do not already have it: `npm install -g @vscode/vsce` (or add it as a dev dependency and run with `npx`).
2. Run `npm run compile` from the repository root to generate the `out/` artifacts.
3. Run `npx vsce package` to produce `p2p2p-0.0.4.vsix` from the current source.
4. In VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and run **Extensions: Install from VSIX...**, then select the newly built VSIX (or run `code --install-extension p2p2p-0.0.4.vsix`).
5. Reload VS Code when prompted. All P2P2P commands will then be available from the Command Palette.

## Assessment of Current Completion

Activate simply logs “P2P2P-VSCode activated!” and registers `p2p2p.generateDiagram`, whose only effect is to show an informational popup. A `p2p2p.previewLatex` command provides a MathJax-backed LaTeX preview, and `p2p2p.generatePdf` shells out to your Rust backend and LaTeX toolchain, but PlusCal → PlantUML translation is still not implemented.

## Extension metadata & contributions

`package.json` exposes three commands titled “P2P2P: Generate Diagram,” “P2P2P: Preview LaTeX,” and “P2P2P: Generate PDF,” plus a configurable `p2p2p.backendCommand` setting for locating the Rust backend executable.

### 1.0.0

---
