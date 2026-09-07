$(function () {
  console.log("jQuery loaded");

  //Dashboard summary data
  const dashboardData = {
    totalFacilities: 8,
    openRequests: 12,
    availableSpaces: 24,
    activeAssets: 156,
  };

  // Display dashboard summary values
  $("#totalFacilities").text(dashboardData.totalFacilities);
  $("#openRequests").text(dashboardData.openRequests);
  $("#availableSpaces").text(dashboardData.availableSpaces);
  $("#activeAssets").text(dashboardData.activeAssets);

  // Recent maintenance requets
  const maintenanceRequests = [
    {
      id: "MR-1001",
      facility: "Head Office",
      issue: "Air conditioning failure",
      priority: "High",
      status: "Open",
      date: "05 Sep 2026",
    },
    {
      id: "MR-1002",
      facility: "Warehouse A",
      issue: "Lighting fault",
      priority: "Medium",
      status: "In Progress",
      date: "04 Sep 2026",
    },
    {
      id: "MR-1003",
      facility: "Administration Block",
      issue: "Broken door lock",
      priority: "Low",
      status: "Completed",
      date: "03 Sep 2026",
    },
    {
      id: "MR-1004",
      facility: "Teachers Block",
      issue: "Broken toilet door",
      priority: "High",
      status: "in progress",
      date: "02 Sep 2026",
    },
  ];

  // Dynamically render priority and status badges
  function getPriorityBadge(priority) {
    if (priority === "High") {
      return "text-bg-danger";
    }
    if (priority === "Medium") {
      return "text-bg-warning";
    }
    return "text-bg-success";
  }

  function getStatusBadge(status) {
    if (status === "Open") {
      return "text-bg-warning";
    }
    if (status === "In Progress") {
      return "text-bg-primary";
    }
    return "text-bg-success";
  }

  // Render maintenance requests
  maintenanceRequests.forEach(function (request) {
    $("#maintenanceTableBody").append(`
    <tr>
      <td class="fw-semibold">#${request.id}</td>
      <td>${request.facility}</td>
      <td>${request.issue}</td>
      <td>
      <span class="badge ${getPriorityBadge(request.priority)}">${request.priority}</span>
      </td>
      <td>
      <span class="badge ${getStatusBadge(request.status)}">${request.status}</span>
      </td>
      <td>${request.date}</td>
    </tr>
  `);
  });

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

    const isOpen = $(".sidebar").hasClass("show");

    $(this).attr("aria-expanded", isOpen);
  });

  // Reset sidebar state when returning to desktop size
  $(window).on("resize", function () {
    if ($(window).width() >= 768) {
      $(".sidebar").removeClass("show");
    }
  });
});
