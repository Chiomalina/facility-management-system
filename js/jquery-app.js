$(function () {
  console.log("jQuery loaded");

  // Handle sidebar navigation clicks
  $(".sidebar-link").on("click", function (event) {
    event.preventDefault();

    // Update active navigation link
    $(".sidebar-link").removeClass("active");
    $(this).addClass("active");

    // Get clicked page title
    const pageTitle = $(this).text().trim();

    // Update topbar and content titles
    $(".page-title").text(pageTitle);
    $(".content-title").text(pageTitle);

    // Close sidebar after selection on mobile
    if ($(window).width() < 768) {
      $(".sidebar").removeClass("show");
    }
  });

  // Toggle sidebar visibility on mobile
  $("#sidebarToggle").on("click", function () {
    $(".sidebar").toggleClass("show");
  });
});
