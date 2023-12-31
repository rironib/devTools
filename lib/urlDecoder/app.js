function paste() {
  navigator.clipboard.readText().then(function (pastedContent) {
    document.getElementById("decodeTxt").value = pastedContent;
  });
}

function decodeBtn() {
  var inputElement = document.getElementById("decodeTxt");
  var resultElement = document.getElementById("decodeResult");
  var inputValue = inputElement.value;

  if (!inputValue.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      timer: 1500,
      showConfirmButton: false,
    });
    return;
  }

  var decodedValue = decodeURIComponent(inputValue);
  resultElement.value = decodedValue;
}

function copy() {
  var resultElement = document.getElementById("decodeResult");
  resultElement.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

function reset() {
  var inputElement = document.getElementById("decodeTxt");
  var resultElement = document.getElementById("decodeResult");
  inputElement.value = "";
  resultElement.value = "";
}
