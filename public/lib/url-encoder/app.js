document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("encodeTxt");
  const encodeBtn = document.getElementById("encodeBtn");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const outputText = document.getElementById("encodeResult");

  function isValidLinkFunction(input) {
    const linkRegex = /^(http|https|ftp):\/\//;
    return linkRegex.test(input);
  }

  encodeBtn.addEventListener("click", function () {
    const inputValue = inputText.value.trim();

    if (!inputValue) {
      showError("Input is empty!");
      return;
    }

    const isAlreadyEncoded = encodeURIComponent(inputValue) === inputValue;
    if (isAlreadyEncoded) {
      showError("Input is already encoded!");
      return;
    }

    const isValidLink = isValidLinkFunction(inputValue);
    if (!isValidLink) {
      showError("Invalid link!");
      return;
    }

    const encodedValue = encodeURIComponent(inputValue);
    outputText.value = encodedValue;
  });

  pasteBtn.addEventListener("click", function () {
    navigator.clipboard.readText().then(function (clipboardText) {
      inputText.value = clipboardText;
    });
  });

  copyBtn.addEventListener("click", function () {
    if (outputText.value === "") {
      showError("Result is empty!");
      return;
    }
    const outputTextElement = document.getElementById("encodeResult");
    const textToCopy = outputTextElement.value;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showSuccess("Text copied successfully!");
      })
      .catch((err) => {
        showError("Unable to copy text to clipboard!");
      });
  });

  resetBtn.addEventListener("click", function () {
    inputText.value = "";
    outputText.value = "";
  });

  // Alerts
  function showError(message) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: message,
    });
  }
  function showSuccess(message) {
    Swal.fire({
      icon: "success",
      title: "Done...",
      text: message,
    });
  }
});
