document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("decodeTxt");
  const decodeBtn = document.getElementById("decodeBtn");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const outputText = document.getElementById("decodeResult");

  function isValidLinkFunction(input) {
    const linkRegex = /^(http|https|ftp)%3A%2F%2F/;
    return linkRegex.test(input);
  }

  decodeBtn.addEventListener("click", function () {
    const inputValue = inputText.value.trim();

    if (!inputValue) {
      showError("Input is empty!");
      return;
    }

    const isAlreadyDecoded = decodeURIComponent(inputValue) === inputValue;
    if (isAlreadyDecoded) {
      showError("Input is already decoded!");
      return;
    }

    const isValidLink = !isValidLinkFunction(inputValue);
    if (isValidLink) {
      showError("Invalid link!");
      return;
    }

    const decodedValue = decodeURIComponent(inputValue);
    outputText.value = decodedValue;
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
    const outputTextElement = document.getElementById("decodeResult");
    const textToCopy = outputTextElement.value;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showSuccess("Text copied successfully!");
        return;
      })
      .catch((err) => {
        showError("Unable to copy text to clipboard!");
        return;
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
