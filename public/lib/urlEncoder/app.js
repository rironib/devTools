function paste() {
  navigator.clipboard.readText().then(function (pastedContent) {
    document.getElementById("encode").value = pastedContent;
  });
}

function encodeurl() {
  var inputValue = document.getElementById("encode").value;

  if (!inputValue || !isValidUrl(inputValue)) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      timer: 1500,
      showConfirmButton: false,
    });
    return;
  }

  var encodedValue = encodeURIComponent(inputValue);
  document.getElementById("result").value = encodedValue;
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function copy() {
  var resultValue = document.getElementById("result").value;

  var textArea = document.createElement("textarea");
  textArea.value = resultValue;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  document.body.removeChild(textArea);

  Swal.fire({
    icon: "success",
    title: "Copied!",
    timer: 1500,
    showConfirmButton: false,
  });
}

function reset() {
  document.getElementById("encode").value = "";
  document.getElementById("result").value = "";
}
