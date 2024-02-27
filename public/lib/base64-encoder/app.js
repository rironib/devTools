document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("inputText");
  const encryptBtn = document.getElementById("encryptBtn");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const outputText = document.getElementById("outputText");

  // Encrypt
  encryptBtn.addEventListener("click", function () {
    const plainText = inputText.value;

    if (!plainText) {
      showError("Input is empty!");
      return;
    }

    const encryptedText = btoa(plainText);
    outputText.innerText = encryptedText;
  });

  // Paste
  pasteBtn.addEventListener("click", function () {
    navigator.clipboard.readText().then(function (clipboardText) {
      inputText.value = clipboardText;
    });
  });

  // Copy
  copyBtn.addEventListener("click", function () {
    if (outputText.value === "") {
      showError("Result is empty!");
      return;
    } else {
      const outputTextElement = document.getElementById("outputText");
      const textToCopy =
        outputTextElement.textContent || outputTextElement.innerText;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          showSuccess("Text copied successfully!");
        })
        .catch((err) => {
          showError("Unable to copy text to clipboard!");
        });
    }
  });

  // Reset
  resetBtn.addEventListener("click", function () {
    inputText.value = "";
    outputText.innerText = "";
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
