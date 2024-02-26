document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const inputText = document.getElementById("inputText");
  const convertBtn = document.getElementById("convertBtn");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const outputText = document.getElementById("outputText");

  // Event Listeners
  convertBtn.addEventListener("click", handleConvert);
  pasteBtn.addEventListener("click", handlePaste);
  copyBtn.addEventListener("click", handleCopy);
  resetBtn.addEventListener("click", handleReset);

  // Event Handlers
  function handleConvert() {
    const inputValue = inputText.value;
    const rgbaArray = inputValue
      .split(",")
      .map((val) => parseFloat(val.trim()));

    if (!isValidRGBAInput(rgbaArray)) {
      showErrorAlert("Invalid RGBA input!");
      return;
    }

    const hex = convertRGBAtoHex(rgbaArray);
    outputText.value = `#${hex.toUpperCase()}`;
  }

  // Paste Handler
  function handlePaste() {
    navigator.clipboard.readText().then((clipboardText) => {
      inputText.value = clipboardText;
    });
  }

  // Copy Handler
  function handleCopy() {
    const copiedText = outputText.value.trim();
    if (!copiedText) {
      showErrorAlert("Convert something!");
      return;
    }

    copyTextToClipboard(copiedText);
  }

  // Reset Handler
  function handleReset() {
    inputText.value = "";
    outputText.value = "";
  }

  // Helper Functions
  function isValidRGBAInput(rgbaArray) {
    return (
      rgbaArray.length === 4 &&
      !rgbaArray.slice(0, 3).some(isNaN) &&
      rgbaArray[3] >= 0 &&
      rgbaArray[3] <= 1
    );
  }

  function convertRGBAtoHex(rgbaArray) {
    const alphaHex = Math.round(rgbaArray[3] * 255).toString(16);
    return (
      rgbaArray
        .slice(0, 3)
        .map((val) => {
          const hexValue = Math.round(val).toString(16);
          return hexValue.length === 1 ? "0" + hexValue : hexValue;
        })
        .join("") + (alphaHex.length === 1 ? "0" + alphaHex : alphaHex)
    );
  }

  function copyTextToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => showSuccessAlert("Text copied successfully!"))
      .catch(() => showErrorAlert("Unable to copy text to clipboard"));
  }

  function showErrorAlert(message) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }

  function showSuccessAlert(message) {
    Swal.fire({
      icon: "success",
      title: "Done...",
      text: message,
    });
  }
});
