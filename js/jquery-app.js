$(function () {
  console.log("jQuery loaded");
});

$("#testButton").on("click", function () {
  $("#message").append("jQuery is working");
});
