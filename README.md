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

## Release Notes

Basic VS Code plugin with a LaTeX preview helper; core P2P2P conversion workflow is not yet implemented.

## Install the VSIX in VS Code

1. Open VS Code and press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Line.
2. Run **Extensions: Install from VSIX...** and select the `p2p2p-0.0.1.vsix` file from the directory. or 'code --install-extension p2p2p-0.0.1.vsix'
3. Reload VS Code when prompted. The “P2P2P: Generate Diagram” command will then be available from the Command Palette.

## Assessment of Current Completion

Activate simply logs “P2P2P-VSCode activated!” and registers `p2p2p.generateDiagram`, whose only effect is to show an informational popup. A new `p2p2p.previewLatex` command provides a MathJax-backed LaTeX preview, but there is still no logic for converting PlusCal to PlantUML or generating PDFs, so the core workflow remains unimplemented.

## Extension metadata & contributions

`package.json` exposes two commands titled “P2P2P: Generate Diagram” and “P2P2P: Preview LaTeX,” both hooked into the command palette. No additional activation events, configuration settings, or contributions (views, tasks, etc.) are present, indicating that only the most basic scaffolding is in place.

### 1.0.0

---
