import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('P2P2P-VSCode activated!');

	let disposable = vscode.commands.registerCommand('p2p2p.generateDiagram', () => {
		vscode.window.showInformationMessage('P2P2P Diagram Generator Running!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
