document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("inputText");
  const decryptBtn = document.getElementById("decryptBtn");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const outputText = document.getElementById("outputText");

  decryptBtn.addEventListener("click", function () {
    const base64Text = inputText.value;
    try {
      const decryptedText = atob(base64Text);
      outputText.innerText = decryptedText;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Base64 encoded text",
      });
    }
  });

  pasteBtn.addEventListener("click", function () {
    navigator.clipboard.readText().then(function (clipboardText) {
      inputText.value = clipboardText;
    });
  });

  copyBtn.addEventListener("click", function () {
    if (outputText.value === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Decode something!",
      });
      return;
    } else {
      const outputTextElement = document.getElementById("outputText");
      const textToCopy =
        outputTextElement.textContent || outputTextElement.innerText;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Done...",
            text: "Text copied successfully!",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Unable to copy text to clipboard",
          });
        });
    }
  });

  resetBtn.addEventListener("click", function () {
    inputText.value = "";
    outputText.innerText = "";
  });
});
