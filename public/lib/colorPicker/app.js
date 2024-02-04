document.addEventListener("DOMContentLoaded", function () {
  const colorPicker = document.getElementById("colorPicker");
  const selectedColor = document.getElementById("selectedColor");
  const hexOutput = document.getElementById("hexOutput");
  const rgbOutput = document.getElementById("rgbOutput");
  const rgbaOutput = document.getElementById("rgbaOutput");
  const hsvOutput = document.getElementById("hsvOutput");
  const hslOutput = document.getElementById("hslOutput");

  // Initial color
  updateColor(colorPicker.value);

  // Event listener for color change
  colorPicker.addEventListener("input", function (event) {
    const newColor = event.target.value;
    updateColor(newColor);
  });

  // Function to update the selected color and outputs
  function updateColor(color) {
    selectedColor.style.backgroundColor = color;

    // Convert color to different representations
    const colorValues = convertColor(color);

    // Update outputs
    hexOutput.textContent = `HEX: ${colorValues.hex}`;
    rgbOutput.textContent = `RGB: ${colorValues.rgb}`;
    rgbaOutput.textContent = `RGBA: ${colorValues.rgba}`;
    hsvOutput.textContent = `HSV: ${colorValues.hsv}`;
    hslOutput.textContent = `HSL: ${colorValues.hsl}`;
  }

  // Function to convert color to different representations
  function convertColor(color) {
    const hex = color.toUpperCase();
    const rgb = hexToRgb(hex);
    const rgba = hexToRgba(hex);
    const hsv = rgbToHsv(rgb);
    const hsl = rgbToHsl(rgb);

    return {
      hex,
      rgb,
      rgba,
      hsv,
      hsl,
    };
  }

  // Helper functions for color conversions
  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  function hexToRgba(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }

  function rgbToHsv(rgb) {
    const [r, g, b] = rgb.split(",").map(Number);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0,
      s = max !== 0 ? delta / max : 0,
      v = max;

    if (delta !== 0) {
      if (max === r) {
        h = (g - b) / delta + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }

      h *= 60;
    }

    return `${Math.round(
      h
    )}, ${Math.round(s * 100)}%, ${Math.round((v / 255) * 100)}%`;
  }

  function rgbToHsl(rgb) {
    const [r, g, b] = rgb.split(",").map(Number);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0,
      s = max !== 0 ? delta / (255 - Math.abs(max + min - 255)) : 0,
      l = (max + min) / 2;

    if (delta !== 0) {
      if (max === r) {
        h = (g - b) / delta + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }

      h *= 60;
    }

    return `${Math.round(
      h
    )}, ${Math.round(s * 100)}%, ${Math.round(l / 2.55)}%`;
  }
});
