function clearStrikeThrough() {
  // console.log("clear");
  document.getElementById("strikeThroughTextArea").value = "";
  document.getElementById("strikeThroughTextAreaResult").value = "";
  document.getElementById("copyButton").innerHTML = "Copy";
}

function downloadFileStrikethrough() {
  var textFile = null,
    makeTextFile = function (text) {
      var data = new Blob([text], { type: "text/plain" });

      // If we are replacing a previously generated file we need to
      // manually revoke the object URL to avoid memory leaks.
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }

      textFile = window.URL.createObjectURL(data);

      return textFile;
    };
  var create = document.getElementById("create");
  var strikeThroughTextAreaResult = document.getElementById(
    "strikeThroughTextAreaResult"
  );

  create.addEventListener(
    "click",
    function () {
      var link = document.createElement("a");
      link.setAttribute("download", "StrikethroughText.txt");
      link.href = makeTextFile(strikeThroughTextAreaResult.value);
      document.body.appendChild(link);
      console.log("here");
      // wait for the link to be added to the document
      window.requestAnimationFrame(function () {
        var event = new MouseEvent("click");
        link.dispatchEvent(event);
        document.body.removeChild(link);
      });
    },
    false
  );
}

function copyFunctionStrikeThrough() {
  document.querySelector("#strikeThroughTextAreaResult").select();
  // console.log(document.querySelector("textarea"));
  document.execCommand("copy");
  document.getElementById("copyButton").innerHTML = "Copied";
}

function convertToStrikeThrough() {
  // console.log('Jai Mata Di');
  var text = document.getElementById("strikeThroughTextArea").value;
  // console.log(text);
  document.getElementById("strikeThroughTextAreaResult").value = text
    .split("")
    .map((char) => char + "\u0336")
    .join("");
  // console.log(text.split('').map(char => char + '\u0336').join(''));
  // document.getElementById('copyButton').innerHTML = "Copy";
}
