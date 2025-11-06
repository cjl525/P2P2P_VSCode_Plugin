# P2P2P README

This is the README for the "P2P2P" extension.

## Features

## Known Issues

## Release Notes

Basic VS Code plugin, no P2P2P functionality yet.

## Install the VSIX in VS Code

1. Open VS Code and press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Line.
2. Run **Extensions: Install from VSIX...** and select the `p2p2p-0.0.1.vsix` file from the directory. or 'code --install-extension p2p2p-0.0.1.vsix'
3. Reload VS Code when prompted. The “P2P2P: Generate Diagram” command will then be available from the Command Palette.

## Assessment of Current Completion

Activate simply logs “P2P2P-VSCode activated!” and registers `p2p2p.generateDiagram`, whose only effect is to show an informational popup. There is no logic yet for converting PlusCal to PlantUML or generating PDFs, so the core workflow is still unimplemented.

## Extension metadata & contributions

`package.json` exposes a single command titled “P2P2P: Generate Diagram” and hooks it into the command palette. No additional activation events, configuration settings, or contributions (views, tasks, etc.) are present, indicating that only the most basic scaffolding is in place.

### 1.0.0

---
