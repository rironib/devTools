$(function () {
  $("#generate").click(function () {
    var width = $("#iframewidth").val();
    var height = $("#iframeheight").val();
    var url = $("#url").val();
    $("#iframecode").val(
      "<iframe src='" +
        url +
        "' width='" +
        width +
        "' height='" +
        height +
        "'></iframe>"
    );
  });
});
