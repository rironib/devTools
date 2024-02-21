function urlencodeTxt() {
  var urlEncodeTxt = document.getElementById("encodeTxt").value;
  var resEncode = encodeURIComponent(urlEncodeTxt);
  document.getElementById("encodeResult").value = resEncode;
}
