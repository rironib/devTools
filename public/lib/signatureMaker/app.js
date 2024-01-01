var wrapper = document.getElementById("signature-pad");
var clearButton = document.querySelector("[data-action=clear]");

var undoButton = document.querySelector("[data-action=undo]");
var savePNGButton = document.querySelector("[data-action=save-png]");
var saveJPGButton = document.querySelector("[data-action=save-jpg]");
var saveSVGButton = document.querySelector("[data-action=save-svg]");
var canvas = document.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {
  // It's Necessary to use an opaque color when saving image as JPEG;
  // this option can be omitted if only saving as PNG or SVG
  backgroundColor: "rgb(255, 255, 255)",
});

function changePenColor() {
  color = document.getElementById("penColor").value;
  signaturePad.penColor =
    "rgb(" +
    color
      .match(/[A-Za-z0-9]{2}/g)
      .map(function (v) {
        return parseInt(v, 16);
      })
      .join(",") +
    ")";
  resizeCanvas();
}

function changePadColor() {
  color = document.getElementById("padColor").value;
  console.log(color);
  signaturePad.backgroundColor =
    "rgb(" +
    color
      .match(/[A-Za-z0-9]{2}/g)
      .map(function (v) {
        return parseInt(v, 16);
      })
      .join(",") +
    ")";
  resizeCanvas();
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.
  var ratio = Math.max(window.devicePixelRatio || 1, 1);

  // This part causes the canvas to be cleared
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  // This library does not listen for canvas changes, so after the canvas is automatically
  // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
  // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
  // that the state of this library is consistent with visual state of the canvas, you
  // have to clear it manually.
  signaturePad.clear();
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  if (
    navigator.userAgent.indexOf("Safari") > -1 &&
    navigator.userAgent.indexOf("Chrome") === -1
  ) {
    window.open(dataURL);
  } else {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(";base64,");
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

undoButton.addEventListener("click", function (event) {
  var data = signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    signaturePad.fromData(data);
  }
});

// changeColorButton.addEventListener("click", function (event) {
//   var r = Math.round(Math.random() * 255);
//   var g = Math.round(Math.random() * 255);
//   var b = Math.round(Math.random() * 255);
//   var color = "rgb(" + r + "," + g + "," + b +")";

//   signaturePad.penColor = color;
// });

savePNGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL();
    download(dataURL, "signature.png");
  }
});

saveJPGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL("image/jpeg");
    download(dataURL, "signature.jpg");
  }
});

saveSVGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL("image/svg+xml");
    download(dataURL, "signature.svg");
  }
});

var fontLoaded = false;
var list1Loaded = false;

var gridViewBool = true;
var listViewBool = false;

WebFont.load({
  google: {
    families: [
      "Sacramento",
      "Kalam",
      "La Belle Aurore",
      "Gochi Hand",
      "Caveat",
      "Marck Script",
      "Handlee",
      "Nothing You Could Do",
      "Covered By Your Grace",
      "Just Another Hand",
      "Shadows Into Light",
      "Bad Script",
      "Yellowtail",
      "Dancing Script",
      "Great Vibes",
      "Qwigley",
      "Bilbo Swash Caps",
      "Stalemate",
    ],
  },
});

function listView() {
  var gridListDivs = document.querySelectorAll(".grid-list-view");
  for (var i = 0; i < gridListDivs.length; i++) {
    gridListDivs[i].classList.remove("col-md-6");
    gridListDivs[i].classList.add("col-md-12");
  }
  listViewBool = true;
  gridViewBool = false;
  document.getElementById("gridViewBtn").classList.remove("btn-secondary");
  document.getElementById("gridViewBtn").classList.add("btn-outline-secondary");
  document
    .getElementById("listViewBtn")
    .classList.remove("btn-outline-secondary");
  document.getElementById("listViewBtn").classList.add("btn-secondary");
}

function gridView() {
  var gridListDivs = document.querySelectorAll(".grid-list-view");
  for (var i = 0; i < gridListDivs.length; i++) {
    gridListDivs[i].classList.remove("col-md-12");
    gridListDivs[i].classList.add("col-md-6");
  }
  listViewBool = false;
  gridViewBool = true;
  document.getElementById("gridViewBtn").classList.add("btn-secondary");
  document
    .getElementById("gridViewBtn")
    .classList.remove("btn-outline-secondary");
  document.getElementById("listViewBtn").classList.add("btn-outline-secondary");
  document.getElementById("listViewBtn").classList.remove("btn-secondary");
}
function loadMore() {
  console.log("load more");
  var totalFontDivs = document.querySelectorAll(".fontDiv").length;
  if (list1Loaded == false) {
    console.log("list1Loaded");
    var fontList1 = [
      "Redressed",
      "Indie Flower",
      "Architects Daughter",
      "Pacifico",
      "Kavivanar",
      "Permanent Marker",
      "Patrick Hand",
      "Satisfy",
      "Courgette",
      "Kaushan Script",
      "Parisienne",
      "Gloria Hallelujah",
      "Cookie",
      "Merienda",
      "Neucha",
      "Homemade Apple",
      "Rock Salt",
      "Tangerine",
      "Allura",
      "Hachi Maru Pop",
      "Nanum Pen Script",
      "Alex Brush",
      "Mr Dafoe",
      "Damion",
      "Reenie Beanie",
      "Pinyon Script",
      "Niconne",
      "Italianno",
      "Norican",
      "Leckerli One",
      "Yesteryear",
      "Mrs Saint Delafield",
      "Sofia",
      "Arizonia",
      "Herr Von Muellerhoff",
      "Rochester",
      "Kristi",
      "Cedarville Cursive",
      "Grand Hotel",
      "Nanum Brush Script",
      "Petit Formal Script",
    ];
    WebFont.load({
      google: {
        families: fontList1,
      },
    });

    for (var i = 0; i < fontList1.length; i++) {
      if (listViewBool == true) {
        var signatureDiv = `<div class="col-md-12 mb-5 grid-list-view">
          <div class="card">
            <h5 id="fontName${
              i + totalFontDivs + 1
            }" class="card-header text-muted bg-white border-bottom-0 fontName">
              ${fontList1[i]}
            </h5>
            <div class="card-body fontDiv" style="padding-top:40px;min-height:100px;font-size:52px;line-height:150%;font-weight:300;font-family:${
              fontList1[i]
            };">
              ${document.getElementById("signatureName").value}
            </div>
            <div class="card-footer bg-white border-top-0">
              <button class="btn  btn-outline-success" onclick="downloadFontSignature('${
                fontList1[i]
              }');">Download Signature</button>
            </div>
          </div>
        </div>`;
      }

      if (gridViewBool == true) {
        var signatureDiv = `<div class="col-md-6 mb-5 grid-list-view">
          <div class="card">
            <h5 id="fontName${
              i + totalFontDivs + 1
            }" class="card-header text-muted bg-white border-bottom-0 fontName">
              ${fontList1[i]}
            </h5>
            <div class="card-body fontDiv" style="padding-top:40px;min-height:100px;font-size:52px;line-height:150%;font-weight:300;font-family:${
              fontList1[i]
            };">
              ${document.getElementById("signatureName").value}
            </div>
            <div class="card-footer bg-white border-top-0">
              <button class="btn  btn-outline-success" onclick="downloadFontSignature('${
                fontList1[i]
              }');">Download Signature</button>
            </div>
          </div>
        </div>`;
      }

      var sigRow = document.getElementById("signatureDivRow");
      sigRow.insertAdjacentHTML("beforeend", signatureDiv);
    }

    list1Loaded = true;
    document.getElementById("loadMoreBtn").style.display = "none";
  }
}

function drawSignature() {
  document.getElementById("drawSignature").style.display = "block";
  document.getElementById("typeSignature").style.display = "none";
  document.getElementById("drawSignatureButton").classList.add("btn-success");
  document
    .getElementById("drawSignatureButton")
    .classList.remove("btn-outline-success");
  document
    .getElementById("typeSignatureButton")
    .classList.remove("btn-success");
  document
    .getElementById("typeSignatureButton")
    .classList.add("btn-outline-success");
}

function typeSignature() {
  document.getElementById("drawSignature").style.display = "none";
  document.getElementById("typeSignature").style.display = "block";
  document.getElementById("typeSignatureButton").classList.add("btn-success");
  document
    .getElementById("typeSignatureButton")
    .classList.remove("btn-outline-success");
  document
    .getElementById("drawSignatureButton")
    .classList.remove("btn-success");
  document
    .getElementById("drawSignatureButton")
    .classList.add("btn-outline-success");
}

function generateSignatures() {
  // load fonts only if they are not loaded earlier
  if (fontLoaded == false) {
    WebFont.load({
      google: {
        families: [
          "Sacramento",
          "Kalam",
          "La Belle Aurore",
          "Gochi Hand",
          "Caveat",
          "Marck Script",
          "Handlee",
          "Nothing You Could Do",
          "Covered By Your Grace",
          "Just Another Hand",
          "Shadows Into Light",
          "Bad Script",
          "Yellowtail",
          "Dancing Script",
          "Great Vibes",
          "Qwigley",
          "Bilbo Swash Caps",
          "Stalemate",
        ],
      },
    });
    fontLoaded = true;
  }
  // document.getElementById('signatureResult').style.display == 'block';
  if (document.getElementById("signatureResult").style.display == "none") {
    document.getElementById("signatureResult").style.display = "block";
  }

  var text = document.getElementById("signatureName").value;
  var fontDivs = document.querySelectorAll(".fontDiv");
  for (var i = 0; i < fontDivs.length; i++) {
    console.log();
    fontDivs[i].innerHTML = text;
  }
}

function downloadFontSignature(fontName) {
  var text = document.getElementById("signatureName").value;
  var x = document.createElement("CANVAS");
  var ctx = x.getContext("2d");
  ctx.canvas.width = 2000;
  ctx.canvas.height = 400;
  ctx.font = "162px " + fontName;
  var widthText = ctx.measureText(text).width;
  // var heightText = ctx.measureText(text).height;
  ctx.fillStyle = document.getElementById("fontColor").value;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(text, (2000 - widthText) / 2, 165);
  var link = document.createElement("a");
  link.download = "filename.png";
  link.href = x.toDataURL();
  link.click();
}

function changeSignatureColor() {
  var fontColor = document.getElementById("fontColor").value;
  console.log(fontColor);
  var fontDivs = document.querySelectorAll(".fontDiv");
  for (var i = 0; i < fontDivs.length; i++) {
    console.log();
    fontDivs[i].style.color = fontColor;
  }
}
