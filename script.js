// Simple Rich Text Editor

const fonts = ["Arial", "Verdana", "Times New Roman", "Georgia", "Courier New", "Tahoma", "Trebuchet MS"];
const fontNameSelect = document.getElementById("fontName");
const fontSizeSelect = document.getElementById("fontSize");

function populateSelect(select, items) {
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });
}

populateSelect(fontNameSelect, fonts);
populateSelect(fontSizeSelect, Array.from({ length: 7 }, (_, i) => i + 1));

// Generic command handler
function commandHandler(command, value = null) {
    document.execCommand(command, false, value);
    document.getElementById("editor").focus();
}

// Toolbar button mapping
const commandMap = {
    bold: () => commandHandler("bold"),
    italic: () => commandHandler("italic"),
    underline: () => commandHandler("underline"),
    leftAlign: () => commandHandler("justifyLeft"),
    centerAlign: () => commandHandler("justifyCenter"),
    rightAlign: () => commandHandler("justifyRight"),
    undo: () => commandHandler("undo"),
    redo: () => commandHandler("redo")
};

// Attach event listeners to buttons
Object.keys(commandMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", commandMap[id]);
});

// Color pickers
const foreColor = document.getElementById("foreColor");
const backColor = document.getElementById("backColor");
foreColor.addEventListener("input", e => commandHandler("foreColor", e.target.value));
backColor.addEventListener("input", e => commandHandler("hiliteColor", e.target.value));

// Font family & size
fontNameSelect.addEventListener("change", e => commandHandler("fontName", e.target.value));
fontSizeSelect.addEventListener("change", e => commandHandler("fontSize", e.target.value));

// Placeholder text
const editor = document.getElementById("editor");
editor.setAttribute("data-placeholder", "Start typing here...");

// Show placeholder style
editor.addEventListener("focus", () => {
    if (editor.innerHTML === "") editor.classList.remove("empty");
});

editor.addEventListener("blur", () => {
    if (editor.innerHTML === "") editor.classList.add("empty");
});

// Initial empty class
editor.classList.add("empty");
