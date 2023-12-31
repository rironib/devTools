function urldecodeTxt() {
  var urlDecodeTxt = document.getElementById("decodeTxt").value;
  var resDecode = decodeURIComponent(urlDecodeTxt);
  document.getElementById("decodeResult").value = resDecode;
}
