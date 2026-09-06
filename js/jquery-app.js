$(function () {
  console.log("jQuery loaded");
});

$(function () {
  $(".sidebar-link").on("click", function (event) {
    event.preventDefault();

    $(".sidebar-link").removeClass("active");
    $(this).addClass("active");

    const pageTitle = $(this).text().trim();

    $(".page-title").text(pageTitle);
    $(".content-title").text(pageTitle);
  });
});
