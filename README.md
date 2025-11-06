# P2P2P README

This is the README for the "P2P2P" extension.

## Features

## Known Issues

## Release Notes

Basic VSCODE Plugin, no P2P2P functionality yet.

## Install and Try the Extension Locally

1. **Download the source** – either clone the repository with `git clone https://github.com/<your-org>/P2P2P_VSCode_Plugin.git` or download the directory as a ZIP and extract it.
2. **Install dependencies** – open the folder in a terminal and run `npm install` to restore the TypeScript tooling used by the extension.
3. **Build the extension** – run `npm run compile`; this produces the compiled JavaScript in the `out/` directory that VS Code loads.
4. **Add it to VS Code** – copy the entire project folder into your VS Code extensions directory (for example `~/.vscode/extensions/p2p2p-local`) or use `Developer: Install Extension from Location...` and point it at this folder.
5. **Reload VS Code** – restart VS Code (or reload the window) so the extension is picked up, then run “P2P2P: Generate Diagram” from the Command Palette to verify it is active.

## Assessment of Current Completion

Activate simply logs “P2P2P-VSCode activated!” and registers p2p2p.generateDiagram, whose only effect is to show an informational popup. There is no logic yet for converting PlusCal to PlantUML or generating PDFs, so the core workflow is still unimplemented.

## Extension metadata & contributions

Package.json exposes a single command titled “P2P2P: Generate Diagram” and hooks it into the command palette. No additional activation events, configuration settings, or contributions (views, tasks, etc.) are present, indicating that only the most basic scaffolding is in place.

### 1.0.0

---
