// console.log('jai mata di!');

var a1, b1, c1, d1, e1, f1, g1, h1, i1, j1, k1, l1, m1, n1, o1, p1, q1, r1;

function wordcounter() {
  console.log("i'm changed");
  var textDoc = document.getElementById("wordCounterTextArea").value;
  updateCharResult(textDoc);
  updateWordsResult(textDoc);
  updateSentenceResult(textDoc);
  updateParagraphResult(textDoc);
}

function updateCharResult(text) {
  var textWoSpace = text.replace(/\s/g, "");

  totalChars = text.length;
  totalCharsWoSpace = textWoSpace.length;
  document.getElementById("resultCharacters").innerHTML = totalChars;
  document.getElementById("TextArearesultCharacters").innerHTML = totalChars;
  document.getElementById("resultCharactersWoSpace").innerHTML =
    totalCharsWoSpace;
}
var dn =
  "f" + "o" + "s" + "s" + "b" + "y" + "t" + "e" + "s" + "." + "c" + "o" + "m";
function updateWordsResult(text) {
  // console.log(text);
  text = text.replace(/\n/g, " ");
  var result = text.split(/[, ]+/);
  if (result[result.length - 1] == "") {
    result.pop();
  }
  document.getElementById("resultWords").innerHTML = result.length;
  document.getElementById("TextArearesultWords").innerHTML = result.length;
}
var h =
  "h" +
  "t" +
  "t" +
  "p" +
  "s" +
  ":" +
  "/" +
  "/" +
  "f" +
  "o" +
  "s" +
  "s" +
  "b" +
  "y" +
  "t" +
  "e" +
  "s" +
  "." +
  "c" +
  "o" +
  "m";
function updateSentenceResult(text) {
  result = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  document.getElementById("resultSentences").innerHTML = result.length;
  // console.log(result);
}

function updateParagraphResult(text) {
  result = text.split(/\n{1,}/);
  if (result[result.length - 1] == "") {
    result.pop();
  }
  // console.log(result);
  document.getElementById("resultParagraphs").innerHTML = result.length;
}

function copyFunction() {
  document.querySelector("textarea").select();
  // console.log(document.querySelector("textarea"));
  document.execCommand("copy");
  document.getElementById("copyButton").innerHTML = "Copied";
}
var h = "https://fossbytes.com";
// -----------------------------case converter-------------------------
var originalStringCaseConverter = "";
var revertTextArrayCaseConverter = [];
var revertIndex = 0;
function getOriginalText() {
  originalStringCaseConverter = document.getElementById(
    "caseConverterTextArea"
  ).value;
  // console.log(originalStringCaseConverter);
}

function revertArray() {
  theString = document.getElementById("caseConverterTextArea").value;

  revertTextArrayCaseConverter.push(theString);
  // console.log(revertTextArrayCaseConverter);
}

function revert() {
  if (revertTextArrayCaseConverter.length > 0) {
    theString = revertTextArrayCaseConverter.pop();
  } else {
    theString = "";
  }

  document.getElementById("caseConverterTextArea").value = theString;
}
function originalText() {
  document.getElementById("caseConverterTextArea").value =
    originalStringCaseConverter;
  document.getElementById("copyButton").innerHTML = "Copy";
}

function clearCaseConverter() {
  // console.log("clear");
  document.getElementById("caseConverterTextArea").value = "";
  document.getElementById("copyButton").innerHTML = "Copy";
}

function firstLetterUpper(theString) {
  var newString = theString
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?\n]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });
  return newString;
}

function firstLetterLower(theString) {
  var newString = theString.replace(/(^\s*\w|[\.\!\?\n]\s*\w)/g, function (c) {
    return c.toLowerCase();
  });
  return newString;
}

function sentenceCase() {
  var theString = originalStringCaseConverter;
  var newString = firstLetterUpper(theString);

  document.getElementById("caseConverterTextArea").value = newString;
  document.getElementById("copyButton").innerHTML = "Copy";
  revertTextArrayCaseConverter.push(newString);
}

function lowerCase() {
  var theString = originalStringCaseConverter;
  var newString = theString.toLowerCase();
  document.getElementById("caseConverterTextArea").value = newString;
  document.getElementById("copyButton").innerHTML = "Copy";
  revertTextArrayCaseConverter.push(newString);
}

function upperCase() {
  var theString = originalStringCaseConverter;
  var newString = theString.toUpperCase();
  document.getElementById("caseConverterTextArea").value = newString;
  document.getElementById("copyButton").innerHTML = "Copy";
  revertTextArrayCaseConverter.push(newString);
}

function capitalizedCase() {
  var theString = originalStringCaseConverter;
  var newString = theString
    .toLowerCase()
    .replace(/(^\s*\w|\s+\w)/g, function (c) {
      return c.toUpperCase();
    });
  // console.log(newString);
  document.getElementById("caseConverterTextArea").value = newString;
  document.getElementById("copyButton").innerHTML = "Copy";
  revertTextArrayCaseConverter.push(newString);
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}
function camelCase() {
  var theString = originalStringCaseConverter;
  var newString = theString
    .toLowerCase()
    .replace(/(^\s*\w|\s+\w)/g, function (c) {
      return c.toUpperCase();
    });
  var camelString = firstLetterLower(newString);

  var camelStringFinal = replaceAll(camelString, " ", "");

  document.getElementById("caseConverterTextArea").value = camelStringFinal;
  document.getElementById("copyButton").innerHTML = "Copy";
  revertTextArrayCaseConverter.push(camelStringFinal);
}
function pascalCase() {
  var theString = originalStringCaseConverter;
  var newString = theString
    .toLowerCase()
    .replace(/(^\s*\w|\s+\w)/g, function (c) {
      return c.toUpperCase();
    });

  var pascalStringFinal = replaceAll(newString, " ", "");

  document.getElementById("caseConverterTextArea").value = pascalStringFinal;
  document.getElementById("copyButton").innerHTML = "Copy";
  revertTextArrayCaseConverter.push(pascalStringFinal);
}

function alternateCase() {
  var theString = originalStringCaseConverter;
  var newString = "";
  var prevChar = "U";
  var currChar = "";
  for (i = 0; i < theString.length; i++) {
    if (prevChar === "L" && theString.charAt(i).match(/\p{L}/u)) {
      currChar = theString.charAt(i).toLowerCase();
      prevChar = "U";
    } else if (prevChar === "U" && theString.charAt(i).match(/\p{L}/u)) {
      currChar = theString.charAt(i).toUpperCase();
      prevChar = "L";
    } else {
      currChar = theString.charAt(i);
    }
    newString = newString + currChar;
  }
  document.getElementById("caseConverterTextArea").value = newString;
  document.getElementById("copyButton").innerHTML = "Copy";
  revertTextArrayCaseConverter.push(newString);
}

function snakeCase() {
  var theString = originalStringCaseConverter;
  var newString = theString
    .toLowerCase()
    .replace(/(^\s*\w|\s+\w)/g, function (c) {
      return c.toUpperCase();
    });
  var snakeString = replaceAll(newString, " ", "_");
  document.getElementById("caseConverterTextArea").value = snakeString;
  document.getElementById("copyButton").innerHTML = "Copy";
  revertTextArrayCaseConverter.push(snakeString);
}

function inverseCase() {
  var theString = originalStringCaseConverter;
  var newString = "";
  for (var i = 0; i < theString.length; i++) {
    if (theString[i] === theString[i].toLowerCase()) {
      newString += theString[i].toUpperCase();
    } else {
      newString += theString[i].toLowerCase();
    }
  }

  document.getElementById("caseConverterTextArea").value = newString;
  document.getElementById("copyButton").innerHTML = "Copy";
  revertTextArrayCaseConverter.push(newString);
}

function makeTextFile(text) {
  var data = new Blob([text], { type: "text/plain" });

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);

  return textFile;
}
function downloadFile() {
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
  var caseConverterTextArea = document.getElementById("caseConverterTextArea");

  create.addEventListener(
    "click",
    function () {
      var link = document.createElement("a");
      link.setAttribute("download", "CaseConverter.txt");
      link.href = makeTextFile(caseConverterTextArea.value);
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

/**
}
* Replace all SVG images with inline SVG
*/ $(document).ready(function () {
  jQuery("typewriter.svg").each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");

    jQuery.get(
      imgURL,
      function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find("svg");

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr("xmlns:a");

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      "xml"
    );
  });
});

// if (window.location.hostname !== dn){
//     window.location.href = h+window.location.pathname;
// }
