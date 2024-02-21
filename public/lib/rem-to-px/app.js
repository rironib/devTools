function convert() {
  const remInput = document.getElementById("rem");
  const pxOutput = document.getElementById("px");

  if (isNaN(remInput.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Input isn't a valid number!",
    });
    return;
  } else if (remInput.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Insert a valid number!",
    });
    return;
  }

  const remValue = parseFloat(remInput.value);
  const pxValue = remValue * 16;

  const roundedValue = parseFloat(pxValue.toFixed(2));
  const decimalValue = (roundedValue % 1).toFixed(2).substring(2);

  if (decimalValue === "00") {
    pxOutput.value = pxValue.toFixed(0);
    return;
  } else {
    pxOutput.value = pxValue.toFixed(2);
    return;
  }
}

function reset() {
  document.getElementById("rem").value = "";
  document.getElementById("px").value = "";
}
