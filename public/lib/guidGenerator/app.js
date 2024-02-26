document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById("generateBtn");
  const result = document.getElementById("result");
  const copyBtn = document.getElementById("copyBtn");
  const resetBtn = document.getElementById("resetBtn");

  // Generate
  generateBtn.addEventListener("click", () => {
    const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );

    result.value = guid;
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
        return;
      })
      .catch((err) => {
        showError("Unable to copy text to clipboard!");
        return;
      });
  });

  // Reset
  resetBtn.addEventListener("click", function () {
    result.value = "";
  });

  // Alert: Error
  function showError(message) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: message,
    });
  }
  // Alert: Success
  function showSuccess(message) {
    Swal.fire({
      icon: "success",
      title: "Done...",
      text: message,
    });
  }
});
