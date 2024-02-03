document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("inputText");
  const encryptBtn = document.getElementById("encryptBtn");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const outputText = document.getElementById("outputText");

  encryptBtn.addEventListener("click", function () {
    const plainText = inputText.value;
    const encryptedText = btoa(plainText);
    outputText.innerText = encryptedText;
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
