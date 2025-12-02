# P2P2P README

This is the README for the "P2P2P" extension.

## Features

- Quick command palette entry to preview LaTeX expressions with MathJax in a side-by-side webview.

## How to use the LaTeX preview

1. Open any file in VS Code and highlight the LaTeX expression you want to preview, or leave your cursor in the editor.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and run **P2P2P: Preview LaTeX**.
3. If you selected text, it is rendered immediately. If nothing is selected, you will be prompted to type LaTeX (for example, `\frac{a}{b}`) and press Enter.
4. A preview webview opens beside your editor and renders the expression using MathJax. You do **not** need to provide an image (JPEG/PNG); the preview is generated directly from the LaTeX source.

## Known Issues

PDF generation requires a reachable Rust backend executable (configurable via `p2p2p.backendCommand`) and a LaTeX toolchain (`latexmk` or `pdflatex`) installed on your system.

## Release Notes

Basic VS Code plugin with a LaTeX preview helper; core P2P2P conversion workflow is not yet implemented.

## Install the VSIX in VS Code

> The checked-in `p2p2p-0.0.1.vsix` was created before the LaTeX preview existed. Build and install a fresh VSIX from this branch to get `P2P2P: Preview LaTeX`.

1. Install the VS Code packaging tool if you do not already have it: `npm install -g @vscode/vsce` (or add it as a dev dependency and run with `npx`).
2. Run `npm run compile` from the repository root to generate the `out/` artifacts.
3. Run `npx vsce package` to produce `p2p2p-0.0.4.vsix` from the current source.
4. In VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and run **Extensions: Install from VSIX...**, then select the newly built VSIX (or run `code --install-extension p2p2p-0.0.4.vsix`).
5. Reload VS Code when prompted. All P2P2P commands will then be available from the Command Palette.

## Assessment of Current Completion

Activate simply logs “P2P2P-VSCode activated!” and registers `p2p2p.generateDiagram`, whose only effect is to show an informational popup. A new `p2p2p.previewLatex` command provides a MathJax-backed LaTeX preview, but there is still no logic for converting PlusCal to PlantUML or generating PDFs, so the core workflow remains unimplemented.

## Extension metadata & contributions

`package.json` exposes two commands titled “P2P2P: Generate Diagram” and “P2P2P: Preview LaTeX,” both hooked into the command palette. No additional activation events, configuration settings, or contributions (views, tasks, etc.) are present, indicating that only the most basic scaffolding is in place.

### 1.0.0

---
