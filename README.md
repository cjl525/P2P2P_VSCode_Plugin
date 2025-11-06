# P2P2P README

This is the README for the "P2P2P" extension.

## Features

## Known Issues

## Release Notes

Basic VS Code plugin, no P2P2P functionality yet.

## Build and Package the Extension

1. **Install dependencies** – from the project root run `npm install` to restore the TypeScript tooling used by the extension.
2. **Generate the VSIX** – run `npm run package:vsix`. This script compiles the TypeScript sources and assembles `p2p2p-0.0.1.vsix` in the project root.

The generated package uses a minimal manifest tailored for this project so no additional tooling (such as `vsce`) is required. The `.vsix` artifact is ignored by git to avoid checking binary archives into the repository, so you will only see it locally after running the packaging script.

## Install the VSIX in VS Code

1. Open VS Code and press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette.
2. Run **Extensions: Install from VSIX...** and select the `p2p2p-0.0.1.vsix` file.
3. Reload VS Code when prompted. The “P2P2P: Generate Diagram” command will then be available from the Command Palette.

## Assessment of Current Completion

Activate simply logs “P2P2P-VSCode activated!” and registers `p2p2p.generateDiagram`, whose only effect is to show an informational popup. There is no logic yet for converting PlusCal to PlantUML or generating PDFs, so the core workflow is still unimplemented.

## Extension metadata & contributions

`package.json` exposes a single command titled “P2P2P: Generate Diagram” and hooks it into the command palette. No additional activation events, configuration settings, or contributions (views, tasks, etc.) are present, indicating that only the most basic scaffolding is in place.

### 1.0.0

---
