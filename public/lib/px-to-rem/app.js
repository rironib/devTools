function convert() {
  const pxInput = document.getElementById("px");
  const remOutput = document.getElementById("rem");

  if (isNaN(pxInput.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Input isn't a valid number!",
    });
    return;
  } else if (pxInput.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Insert a valid number!",
    });
    return;
  }

  const pxValue = parseFloat(pxInput.value);
  const remValue = pxValue / 16;

  const roundedValue = parseFloat(remValue.toFixed(2));
  const decimalValue = (roundedValue % 1).toFixed(2).substring(2);

  if (decimalValue === "00") {
    remOutput.value = remValue.toFixed(0);
    return;
  } else {
    remOutput.value = remValue.toFixed(2);
    return;
  }
}

function reset() {
  document.getElementById("px").value = "";
  document.getElementById("rem").value = "";
}
