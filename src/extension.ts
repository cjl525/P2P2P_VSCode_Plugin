import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('P2P2P-VSCode activated!');

  const disposable = vscode.commands.registerCommand('p2p2p.generateDiagram', () => {
    vscode.window.showInformationMessage('P2P2P Diagram Generator Running!');
  });

  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBar.text = '$(rocket) P2P2P';
  statusBar.tooltip = 'Generate a P2P2P diagram';
  statusBar.command = 'p2p2p.generateDiagram';
  statusBar.show();

  context.subscriptions.push(disposable);
  context.subscriptions.push(statusBar);
}

export function deactivate() {}
