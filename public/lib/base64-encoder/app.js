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
    if (outputText.value === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Encode something!",
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
