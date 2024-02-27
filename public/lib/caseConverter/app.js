document.addEventListener("DOMContentLoaded", function () {
  // Get DOM Elements
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const pasteBtn = document.getElementById("pasteBtn");
  const copyBtn = document.getElementById("copyBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const resetBtn = document.getElementById("resetBtn");

  // Extra DOM Elements
  const lowerCase = document.getElementById("lowerCase");
  const upperCase = document.getElementById("upperCase");
  const sentenceCase = document.getElementById("sentenceCase");
  const capitalizedCase = document.getElementById("capitalizedCase");
  const pascalCase = document.getElementById("pascalCase");
  const alternateCase = document.getElementById("alternateCase");
  const inverseCase = document.getElementById("inverseCase");
  const snakeCase = document.getElementById("snakeCase");
  const camelCase = document.getElementById("camelCase");

  // Paste
  pasteBtn.addEventListener("click", function () {
    inputText.value = "";
    navigator.clipboard.readText().then((text) => {
      inputText.value = text;
    });
  });

  // Copy
  copyBtn.addEventListener("click", function () {
    outputText.select();
    navigator.clipboard
      .writeText(outputText.value)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  });

  // Download
  downloadBtn.addEventListener("click", function () {
    const blob = new Blob([outputText.value], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "converted_text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // Reset
  resetBtn.addEventListener("click", function () {
    inputText.value = "";
    outputText.value = "";
  });

  ///// Case Conversion
  // lowerCase
  lowerCase.addEventListener("click", function () {
    outputText.value = inputText.value.toLowerCase();
  });

  // upperCase
  upperCase.addEventListener("click", function () {
    outputText.value = inputText.value.toUpperCase();
  });

  // sentenceCase
  sentenceCase.addEventListener("click", function () {
    outputText.value = inputText.value.replace(/(^\w|\.\s+\w)/g, (match) =>
      match.toUpperCase()
    );
  });

  // capitalizedCase
  capitalizedCase.addEventListener("click", function () {
    outputText.value = inputText.value.replace(/\b\w/g, (match) =>
      match.toUpperCase()
    );
  });

  // pascalCase
  pascalCase.addEventListener("click", function () {
    outputText.value = inputText.value
      .replace(/\b\w/g, (match) => match.toUpperCase())
      .replace(/\s/g, "");
  });

  // alternateCase
  alternateCase.addEventListener("click", function () {
    outputText.value = inputText.value
      .split("")
      .map((char, index) =>
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      )
      .join("");
  });

  // inverseCase
  inverseCase.addEventListener("click", function () {
    outputText.value = inputText.value
      .split("")
      .map((char) =>
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      )
      .join("");
  });

  // snakeCase
  snakeCase.addEventListener("click", function () {
    outputText.value = inputText.value.replace(/\s+/g, "_").toLowerCase();
  });

  // camelCase
  camelCase.addEventListener("click", function () {
    const words = inputText.value.split(" ");
    const camelCased = words
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
    outputText.value = camelCased;
  });
});
