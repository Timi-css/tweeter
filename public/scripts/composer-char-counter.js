$(document).ready(function () {
  countChar = function (words) {
    let charLength = words.value.length;
    $(".counter").text(140 - charLength);
    if (charLength > 140) {
      $("#counter").css("color", "#e5c959");
    } else {
      $("#counter").css("color", "#4B4B37");
    }
  };
});
