document.addEventListener("DOMContentLoaded", function () {
  const link = document.getElementById("link");
  const width = document.getElementById("width");
  const height = document.getElementById("height");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const result = document.getElementById("result");

  document.getElementById("generateBtn").addEventListener("click", function () {
    const link = document.getElementById("link").value;
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;

    if (!link || !isValidURL(link)) {
      showError("Enter valid link!");
      return;
    } else if (!width) {
      showError("Enter valid width!");
      return;
    } else if (!height) {
      showError("Enter valid height!");
      return;
    }

    const iframeCode = `<iframe src="${link}" width="${width}" height="${height}"></iframe>`;

    document.getElementById("result").value = iframeCode;
  });

  pasteBtn.addEventListener("click", function () {
    navigator.clipboard.readText().then(function (clipboardText) {
      link.value = clipboardText;
    });
  });

  copyBtn.addEventListener("click", function () {
    if (result.value === "") {
      showError("Result is empty!");
      return;
    }
    const resultElement = document.getElementById("result");
    const textToCopy = resultElement.value;

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
    link.value = "";
    width.value = "";
    height.value = "";
    result.value = "";
  });

  function isValidURL(url) {
    var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
  }

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
