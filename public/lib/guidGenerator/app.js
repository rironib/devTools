// Get DOM elements
const generateButton = document.getElementById("generate");
const resultTextarea = document.getElementById("result");
const copyButton = document.getElementById("copy");
const clearButton = document.getElementById("clear");

// Function to generate a GUID
function generateGuid() {
  const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );

  return guid;
}

// Event listener for the Generate button
generateButton.addEventListener("click", () => {
  const newGuid = generateGuid();
  resultTextarea.value = newGuid;
});

// Function to copy the text to the clipboard and show SweetAlert2 popups
function copyText() {
  const textToCopy = resultTextarea.value;

  if (textToCopy) {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    Swal.fire({
      icon: "success",
      title: "Text Copied",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Nothing to copy!",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

// Event listener for the Copy button
copyButton.addEventListener("click", copyText);

// Event listener for the Clear button
clearButton.addEventListener("click", () => {
  resultTextarea.value = "";
});
