const vscode = acquireVsCodeApi();

const messagesDiv = document.getElementById("messages");
const inputBox = document.getElementById("input");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");
const reloadBtn = document.getElementById("reload");

inputBox.addEventListener(
    "input",
    ()=> sendBtn.disabled = inputBox.value.trim() === ""
);

inputBox.addEventListener(
    "keydown",
    e => e.key === "Enter" && sendMessage()
);

sendBtn.addEventListener("click", sendMessage);

clearBtn.addEventListener("click", ()=> {
    messagesDiv.innerHTML = "";
    showDivider("Cleared Chat History");
});

reloadBtn.addEventListener("click", ()=> {
    vscode.postMessage({type: "reload"});
    inputBox.focus();

    showDivider("Script Reloaded");
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

window.addEventListener("message", event => {
    const msg = event.data;
    if(msg.type === "botMessage")
        appendMessage(msg.text, "bot");
});

function sendMessage() {
    const text = inputBox.value.trim();
    if(!text)
        return;

    appendMessage(text,"user");
    vscode.postMessage({type:"userMessage", text});

    inputBox.value = "";
    sendBtn.disabled = true;
    inputBox.focus();
}

function appendMessage(text, who) {
    const div = document.createElement("div");

    div.className = "message " + who;
    div.textContent = text;

    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showDivider(text) {
    const div = document.createElement("div");
    div.classList.add("divider");
    div.innerHTML = text;

    messagesDiv.appendChild(div);
}

showDivider("RiveScript Loaded")