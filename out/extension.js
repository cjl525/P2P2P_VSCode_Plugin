"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const promises_1 = require("fs/promises");
const util_1 = require("util");
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
function activate(context) {
    console.log('P2P2P-VSCode activated!');
    const disposable = vscode.commands.registerCommand('p2p2p.generateDiagram', () => {
        vscode.window.showInformationMessage('P2P2P Diagram Generator Running!');
    });
    const latexPreviewCommand = vscode.commands.registerCommand('p2p2p.previewLatex', async () => {
        const editor = vscode.window.activeTextEditor;
        const selection = editor?.selection;
        const selectedText = selection && !selection.isEmpty ? editor.document.getText(selection) : '';
        const latexInput = selectedText ||
            (await vscode.window.showInputBox({
                prompt: 'Enter LaTeX to preview',
                placeHolder: '\\frac{a}{b}',
            })) || '';
        if (!latexInput.trim()) {
            vscode.window.showInformationMessage('No LaTeX input provided for preview.');
            return;
        }
        const panel = vscode.window.createWebviewPanel('p2p2pLatexPreview', 'P2P2P LaTeX Preview', vscode.ViewColumn.Beside, {
            enableScripts: true,
        });
        panel.webview.html = getLatexPreviewHtml(latexInput);
    });
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBar.text = '$(rocket) P2P2P';
    statusBar.tooltip = 'Generate a P2P2P diagram';
    statusBar.command = 'p2p2p.generateDiagram';
    statusBar.show();
    context.subscriptions.push(disposable);
    context.subscriptions.push(latexPreviewCommand);
    context.subscriptions.push(statusBar);
    context.subscriptions.push(vscode.commands.registerCommand('p2p2p.generatePdf', async () => {
        const modelName = await vscode.window.showInputBox({
            prompt: 'Model name for the generated PDF (used for file naming)',
            placeHolder: 'my_model',
            validateInput: (value) => (!value.trim() ? 'Model name is required' : undefined),
        });
        if (!modelName) {
            return;
        }
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || process.cwd();
        const outputDir = path.join(workspaceFolder, 'p2p2p_output');
        const texPath = path.join(outputDir, `${modelName}.tex`);
        const pdfPath = path.join(outputDir, `${modelName}.pdf`);
        try {
            await (0, promises_1.mkdir)(outputDir, { recursive: true });
            await runBackendToLatex(modelName, texPath, workspaceFolder);
            await compileLatex(texPath, outputDir, modelName);
            vscode.window.showInformationMessage(`PDF generated at ${pdfPath}`);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Failed to generate PDF: ${message}`);
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('p2p2p.plantumlToPdf', async () => {
        const editor = vscode.window.activeTextEditor;
        const suggestedFile = editor?.document.uri.fsPath.endsWith('.puml')
            ? editor.document.uri.fsPath
            : undefined;
        const pumlPath = await vscode.window.showInputBox({
            prompt: 'Path to the PlantUML (.puml) file to render',
            placeHolder: 'path/to/diagram.puml',
            value: suggestedFile,
            validateInput: (value) => (!value.trim() ? 'A PlantUML file path is required' : undefined),
        });
        if (!pumlPath) {
            return;
        }
        const logoPath = await vscode.window.showInputBox({
            prompt: 'Optional path to a logo image to place above the diagram',
            placeHolder: 'path/to/logo.png (leave empty to omit logo)',
        });
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || process.cwd();
        const outputDir = path.join(workspaceFolder, 'p2p2p_output');
        const fileStem = path.basename(pumlPath, path.extname(pumlPath));
        const texPath = path.join(outputDir, `${fileStem}.tex`);
        const pdfPath = path.join(outputDir, `${fileStem}.pdf`);
        try {
            await (0, promises_1.mkdir)(outputDir, { recursive: true });
            await generatePlantumlLatex(pumlPath, outputDir, fileStem, logoPath || undefined);
            await compileLatex(texPath, outputDir, fileStem);
            vscode.window.showInformationMessage(`PlantUML PDF generated at ${pdfPath}`);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Failed to generate PlantUML PDF: ${message}`);
        }
    }));
}
function deactivate() { }
function getLatexPreviewHtml(latex) {
    const serializedLatex = JSON.stringify(latex);
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>P2P2P LaTeX Preview</title>
    <script>
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
        },
        svg: { fontCache: 'global' },
      };
    </script>
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 1.5rem;
        background: #0f111a;
        color: #e5e7eb;
      }
      .container {
        max-width: 960px;
        margin: 0 auto;
      }
      .source {
        background: #1f2430;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        white-space: pre-wrap;
        word-break: break-word;
        border: 1px solid #2f3545;
      }
      h1 {
        margin-top: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>LaTeX Preview</h1>
      <div id="preview">
        $$${latex}$$
      </div>
      <h2>Source</h2>
      <pre id="source" class="source"></pre>
    </div>
    <script>
      const latexSource = ${serializedLatex};
      const sourceElement = document.getElementById('source');
      sourceElement.textContent = latexSource;
      MathJax.typesetPromise();
    </script>
  </body>
</html>`;
}
//# sourceMappingURL=extension.js.map