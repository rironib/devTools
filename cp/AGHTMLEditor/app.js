$(document).ready(function () {
  $(".continuebtn").click(function () {
    $(".sec1").fadeOut();
    $(".sec2").fadeIn();
  });
  $("").click(function () {
    if (name === "") {
      return;
    }
  });
});

/***
  alert("Download Button Work Only Browser\nhttp://bit.ly/Aghtmleditorv3")
  ***/

$(document).ready(function () {
  $(".nextsec").click(function () {
    $(".sec2").fadeOut();
    $(".sec3").fadeIn();
  });
  $("").click(function () {
    if (name === "") {
      return;
    }
  });
});

$(document).ready(function () {
  $(".button7").click(function () {
    $(".sec3").fadeOut();
    $(".sec2").fadeIn();
  });
  $("").click(function () {
    if (name === "") {
      return;
    }
  });
});

/** help button  **/
function show() {
  alert(
    "Main features of this code :\n1). Live output of codes. \n2). Download and Copy Code Buttons  \n3). Ready made tags\n4). Share Code Button\n\nThere are many more thing you need to explore so now just go explore and enjoy my code"
  );
}

/** Share button **/
function new_share() {
  var whatsapp_content = document.getElementById("code").value;
  if (whatsapp_content !== "") {
    var url =
      "https://api.whatsapp.com/send?text=" + whatsapp_content + whatsapp_link;
    document.getElementById("whatsapp_link").setAttribute("href", url);
  }
}

/** Copy Button **/
function myFunction() {
  var copyText = document.getElementById("code");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}

/** Iframe **/
function run() {
  var code = document.querySelector("#code").value;
  document.querySelector("#out").srcdoc = code;
}

/*** Download button ***/

function saveTextAsFile() {
  var textToSave = document.getElementById("code").value;
  var textToSaveAsBlob = new Blob([textToSave], { type: "text/plain" });
  var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
  var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  downloadLink.href = textToSaveAsURL;
  downloadLink.onclick = destroyClickedElement;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}
function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}
function loadFileAsText() {
  var fileToLoad = document.getElementById("fileToLoad").files[0];
  var fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    document.getElementById("amit").value = textFromFileLoaded;
  };
  fileReader.readAsText(fileToLoad, "UTF-8");
}

/** Keybord buttons **/
var o = "<>";
var e = "</>";
$.fn.selectRange = function (start, end) {
  if (end === undefined) {
    end = start;
  }
  return this.each(function () {
    if ("selectionStart" in this) {
      this.selectionStart = start;
      this.selectionEnd = end;
    } else if (this.setSelectionRange) {
      this.setSelectionRange(start, end);
    } else if (this.createTextRange) {
      var range = this.createTextRange();
      range.collapse(true);
      range.moveEnd("character", end);
      range.moveStart("character", start);
      range.select();
    }
  });
};

$(document).ready(function () {
  $("#code").selectRange(122).focus();
  $("#code").html($("#code").val());
  $("#code").on("input", function (e) {
    $("#code").html($("#code").val());
  });
  $("#hs").click(function () {
    if ($("#hs").attr("class") == "hid") {
      $("#hs").attr("class", "sho");
      $("#hs").html("INPUT");
      $("#code").fadeOut("slow");
    } else {
      $("#hs").attr("class", "hid");
      $("#hs").html("OUTPUT");
      $("#code").fadeIn("slow");
    }
  });
});
function addelm(s, b, atr = "") {
  var cursorPos = $("#code").prop("selectionStart");
  var v = $("#code").val();
  var textBefore = v.substring(0, cursorPos);
  var textAfter = v.substring(cursorPos, v.length);
  if (b == 1) {
    $("#code")
      .val(textBefore + "<" + s + atr + "></" + s + ">" + textAfter)
      .selectRange(cursorPos + s.length + 2)
      .focus();
  } else if (b == 2) {
    $("#code")
      .val(textBefore + s + textAfter)
      .selectRange(cursorPos + s.length - 1)
      .focus();
  } else if (b == 3) {
    $("#code")
      .val(textBefore + s + ":;" + textAfter)
      .selectRange(cursorPos + s.length + 1)
      .focus();
  } else if (b == 4) {
    $("#code")
      .val(textBefore + s + "()" + textAfter)
      .selectRange(cursorPos + s.length + 1)
      .focus();
  } else if (b == 5) {
    $("#code")
      .val(textBefore + s + textAfter)
      .selectRange(cursorPos + s.length)
      .focus();
  } else {
    $("#code")
      .val(textBefore + s + '=""' + textAfter)
      .selectRange(cursorPos + s.length + 2)
      .focus();
  }
}
function chng() {
  $("#code").css("opacity", $("#opa").val() / 100);
}

function but(afclk, name) {
  return (
    '<button onclick="addelm' + "(" + afclk + ")" + '">' + name + "</button>"
  );
}
function tag(nam) {
  return "<" + nam + "></" + nam + ">";
}
