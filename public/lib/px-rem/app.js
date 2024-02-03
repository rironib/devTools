function convert() {
  // Get the value in PX input
  var pxInput = document.getElementById("px");
  var remOutput = document.getElementById("rem");

  // Check if PX input is empty
  if (pxInput.value.trim() === "") {
    remOutput.value = "Please enter a value";
    return;
  }

  // Convert PX to REM (assuming 1rem = 16px)
  var pxValue = parseFloat(pxInput.value);
  var remValue = pxValue / 16;

  // Set the value in REM input
  remOutput.value = remValue.toFixed(2);
}

function reset() {
  // Reset both input fields
  document.getElementById("px").value = "";
  document.getElementById("rem").value = "";
}
