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
    const rgbArray = inputValue
      .split(",")
      .map((val) => parseInt(val.trim(), 10));

    if (!isValidRGBInput(rgbArray)) {
      showErrorAlert("Invalid RGB input!");
      return;
    }

    const hex = convertRGBtoHex(rgbArray);
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
  function isValidRGBInput(rgbArray) {
    return (
      rgbArray.length === 3 &&
      !rgbArray.some(isNaN) &&
      !rgbArray.some((val) => val < 0 || val > 255)
    );
  }

  function convertRGBtoHex(rgbArray) {
    return rgbArray
      .map((val) => {
        const hexValue = val.toString(16);
        return hexValue.length === 1 ? "0" + hexValue : hexValue;
      })
      .join("");
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
