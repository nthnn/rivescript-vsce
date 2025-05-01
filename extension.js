const vscode = require("vscode");
const fs = require("fs");
const RiveScript = require("rivescript");

function activate(context) {
    const { extensionUri } = context;
    const disposable = vscode.commands.registerCommand("extension.testRive", () => {
        const editor = vscode.window.activeTextEditor;
        if(!editor || !editor.document.fileName.endsWith(".rive")) {
            return;
        }

        let bot = createBotFromDocument(editor.document);
        const mediaRoot = vscode.Uri.joinPath(extensionUri, "media");
        const panel = vscode.window.createWebviewPanel(
            "rivescriptChat",
            "RiveScript Chat",
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                localResourceRoots: [mediaRoot]
            }
        );

        panel.iconPath = {
            light: vscode.Uri.joinPath(extensionUri, "media", "rivescript-chat-icon.png"),
            dark:  vscode.Uri.joinPath(extensionUri, "media", "rivescript-chat-icon.png")
        };

        panel.webview.html = getWebviewContent(extensionUri, panel);
        panel.webview.onDidReceiveMessage(async message => {
            if(message.type === "userMessage")
                panel.webview.postMessage({
                    type: "botMessage",
                    text: await bot.reply("local-user", message.text)
                });
            else if(message.type === "reload") {
                bot = createBotFromDocument(
                    vscode.window.activeTextEditor.document
                );
            }
        });
    });

    context.subscriptions.push(disposable);
}

function createBotFromDocument(doc) {
    const bot = new RiveScript();
    bot.stream(doc.getText());
    bot.sortReplies();

    return bot;
}

function getWebviewContent(extensionUri, panel) {
    let html = fs.readFileSync(vscode.Uri.joinPath(
        extensionUri,
        "media",
        "index.html"
    ).fsPath, "utf8");

    html = html.replace(
        /%%CSS_URI%%/g,
        panel.webview.asWebviewUri(
            vscode.Uri.joinPath(extensionUri, "media", "style.css")
        )
    );
    html = html.replace(
        /%%SCRIPT_URI%%/g,
        panel.webview.asWebviewUri(
            vscode.Uri.joinPath(extensionUri, "media", "script.js")
        )
    );

    return html;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
