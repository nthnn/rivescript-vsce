<p align="center">
    <img src="media/rivescript-icon.png" width="200" />
</p>
<h1 align="center">RiveScript</h1>

## Overview

A Visual Studio Code extension that elevates your RiveScript development workflow by combining robust syntax support with an integrated chat interface. With syntax highlighting, language-aware editing features, and a live preview panel, you can write, test, and iterate on your conversational scripts without ever leaving your editor.

- **Rich Syntax Highlighting**: Colorized tokens for triggers, replies, variables, comments, and more—so your `.rive` files are always clear and easy to read.

- **Language Configuration**: Smart indentation, auto-comment toggling, bracket matching, and word-based suggestions tailored specifically for RiveScript’s syntax.

- **Side-by-Side Chat Panel**: Launch a webview panel next to your code. Send messages to your bot and see its replies in real time—no extra browser windows or tools needed.

- **Hot-Reload Capability**: Modify your script, click Reload, and instantly update the bot logic in the chat panel. Keep the conversation going without restarting the extension.

- **Quick Access**
    * Command Palette: run Test RiveScript
    * Keyboard Shortcut: `Ctrl + Shift + T` (when your cursor is in a RiveScript file)

## Usage

1. Open any `.rive` file in your editor.
2. Invoke the chat tester:
    - Via Command Palette: type `> Test RiveScript`
    - Or press `Ctrl + Shift + T` (while in a RiveScript file)
3. A RiveScript Chat panel appears beside your code.
4. Type messages and see your bot’s replies instantly.
5. Edit your `.rive` file; then click Reload in the panel toolbar to update the bot’s brain.

# License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
