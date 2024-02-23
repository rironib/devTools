const container = document.getElementById("container");
const refreshBtn = document.querySelector(".refresh-btn");

const maxPaletteBoxes = 48;

const generatePalette = () => {
  container.innerHTML = "";
  for (let i = 0; i < maxPaletteBoxes; i++) {
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    randomHex = `#${randomHex.padStart(6, "0")}`;

    const color = document.createElement("div");

    color.classList.add(
      "min-w-36",
      "sm:min-w-40",
      "lg:min-w-48",
      "min-h-36",
      "sm:min-h-40",
      "lg:min-h-48",
      "w-auto",
      "h-auto"
    );

    color.innerHTML = `<div class='p-2 sm:p-1 text-center bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 hover:dark:bg-slate-600 rounded-md overflow-hidden cursor-pointer'><div class="w-full h-auto min-h-36 sm:min-h-40 lg:min-h-48 border-2 border-slate-400 dark:border-slate-600 rounded-md" style="background: ${randomHex}"></div>
    <span class="hex-value block mt-3 mb-2 text-lg md:font-medium uppercase select-none">${randomHex}</span></div>`;
    color.addEventListener("click", () => copyColor(color, randomHex));
    container.appendChild(color);
  }
};
generatePalette();

const copyColor = (elem, hexVal) => {
  const colorElement = elem.querySelector(".hex-value");
  navigator.clipboard
    .writeText(hexVal)
    .then(() => {
      colorElement.innerText = "Copied";
      setTimeout(() => (colorElement.innerText = hexVal), 1000);
    })
    .catch(() => alert("Failed to copy the color code!"));
};

refreshBtn.addEventListener("click", generatePalette);
