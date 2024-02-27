document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const result = document.getElementById("result");

  // Download
  function download() {
    let textFile = null,
      makeTextFile = function (text) {
        const data = new Blob([text], { type: "text/plain" });
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
      };

    downloadBtn.addEventListener(
      "click",
      function () {
        const link = document.createElement("a");
        link.setAttribute("download", "StrikethroughText.txt");
        link.href = makeTextFile(result.value);
        document.body.appendChild(link);
        window.requestAnimationFrame(function () {
          const event = new MouseEvent("click");
          link.dispatchEvent(event);
          document.body.removeChild(link);
        });
      },
      false
    );
  }
  download();

  // Convert
  input.addEventListener("input", function () {
    result.value = Array.from(input.value)
      .map((char) => char + "\u0336")
      .join("");
  });

  // Paste
  pasteBtn.addEventListener("click", function () {
    navigator.clipboard.readText().then(function (clipboardText) {
      input.value = clipboardText;
    });
  });

  // Copy
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
      })
      .catch((err) => {
        showError("Unable to copy text to clipboard!");
      });
  });

  // Reset
  resetBtn.addEventListener("click", function () {
    input.value = "";
    result.value = "";
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
