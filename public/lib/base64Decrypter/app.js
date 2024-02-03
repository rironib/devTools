document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("inputText");
  const decryptBtn = document.getElementById("decryptBtn");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const downloadBtn = document.getElementById("resetBtn");
  const outputText = document.getElementById("outputText");

  decryptBtn.addEventListener("click", function () {
    const base64Text = inputText.value;
    try {
      const decryptedText = atob(base64Text);
      outputText.innerText = decryptedText;
    } catch (error) {
      outputText.innerText = "Error: Invalid Base64 encoded text";
    }
  });

  pasteBtn.addEventListener("click", function () {
    navigator.clipboard.readText().then(function (clipboardText) {
      inputText.value = clipboardText;
    });
  });

  copyBtn.addEventListener("click", function () {
    const range = document.createRange();
    range.selectNode(outputText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Text copied to clipboard");
  });

  resetBtn.addEventListener("click", function () {
    inputText.value = "";
    outputText.innerText = "";
  });
});
