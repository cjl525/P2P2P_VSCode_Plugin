# P2P2P README

This is the README for the "P2P2P" extension.

## Features


## Known Issues


## Release Notes

Basic VSCODE Plugin, no P2P2P functionality yet. 


Assessment of Current Completion

activate simply logs “P2P2P-VSCode activated!” and registers p2p2p.generateDiagram, whose only effect is to show an informational popup. There is no logic yet for converting PlusCal to PlantUML or generating PDFs, so the core workflow is still unimplemented.

## Extension metadata & contributions

 package.json exposes a single command titled “P2P2P: Generate Diagram” and hooks it into the command palette. No additional activation events, configuration settings, or contributions (views, tasks, etc.) are present, indicating that only the most basic scaffolding is in place.

### 1.0.0


---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
