# P2P2P README

This is the README for the "P2P2P" extension.

## Features

## Known Issues

## Release Notes

Basic VSCODE Plugin, no P2P2P functionality yet. 

## Assessment of Current Completion

Activate simply logs “P2P2P-VSCode activated!” and registers p2p2p.generateDiagram, whose only effect is to show an informational popup. There is no logic yet for converting PlusCal to PlantUML or generating PDFs, so the core workflow is still unimplemented.

## Extension metadata & contributions

Package.json exposes a single command titled “P2P2P: Generate Diagram” and hooks it into the command palette. No additional activation events, configuration settings, or contributions (views, tasks, etc.) are present, indicating that only the most basic scaffolding is in place.

### 1.0.0

---
