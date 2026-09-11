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
    <tr data-status="${request.status}">
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

  // Filter maintenance requests by status
  $("#maintenanceFilter").on("change", function () {
    const selectedStatus = $(this).val();

    $("#maintenanceTableBody tr").each(function () {
      const rowStatus = $(this).data("status");

      if (selectedStatus == "All" || rowStatus == selectedStatus) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // Facility overview data
  const facilityOverviewData = [
    {
      name: "Head Office",
      occupancy: 82,
      status: "Operational",
    },
    {
      name: "Warehouse A",
      occupancy: 64,
      status: "Operational",
    },
    {
      name: "Administration Block",
      occupancy: 91,
      status: "Maintenance",
    },
    {
      name: "Teachers Block",
      occupancy: 91,
      status: "Maintenance",
    },
  ];

  // Render facility overview
  facilityOverviewData.forEach(function (facility) {
    $(".facilityOverview").append(`
      <div class="mb-4">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div>
          <p class="fw-semibold mb-0">${facility.name}</p>
          <small class="text-muted">${facility.status}</small>
        </div>

        <span class="fw-semibold">${facility.occupancy}%</span>
      </div>
      

      <div
        class="progress"
        role="progressbar"
        aria-label="${facility.name} occupancy"
        aria-valuenow="${facility.occupancy}"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="progress-bar"
          style="width: ${facility.occupancy}%"
        ></div>
      </div>
    </div>
      `);
  });

  // Recent activity data (Dashboard display data)
  const recentActivities = [
    {
      icon: "bi-tools",
      title: "Maintenance request created",
      description: "Air conditioning issue reported at Head Office",
      time: "10 minutes ago",
    },
    {
      icon: "bi-box-seam",
      title: "Asset assigned",
      description: "Laptop assigned to Administration Department",
      time: "35 minutes ago",
    },
    {
      icon: "bi-clipboard-check",
      title: "Inspection completed",
      description: "Warehouse A safety inspection completed",
      time: "1 hour ago",
    },
  ];

  // Render recent activities
  recentActivities.forEach(function (activity) {
    $("#recentActivity").append(`
    <div class="d-flex gap-3 py-3 border-bottom">
      <div class="dashboard-activity-icon">
        <i class="bi ${activity.icon}"></i>
      </div>

      <div class="flex-grow-1">
        <p class="fw-semibold mb-1">${activity.title}</p>

        <p class="text-muted mb-1">
          ${activity.description}
        </p>

        <small class="text-muted">
          ${activity.time}
        </small>
      </div>
    </div>
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

  // Facility Management module data
  const facilities = [
    {
      id: "FAC-001",
      name: "Head Office",
      type: "Office",
      location: "Oberhausen",
      manager: "Anna Müller",
      status: "Active",
    },
    {
      id: "FAC-002",
      name: "Warehouse A",
      type: "Warehouse",
      location: "Essen",
      manager: "David Schmidt",
      status: "Active",
    },
    {
      id: "FAC-003",
      name: "Administration Block",
      type: "Office",
      location: "Oberhausen",
      manager: "Sarah Weber",
      status: "Under Maintenance",
    },
    {
      id: "FAC-004",
      name: "Teachers Block",
      type: "Education",
      location: "Oberhausen",
      manager: "Michael Braun",
      status: "Inactive",
    },
  ];

  // Render facilities data
  function renderFacilities() {
    $("#facilitiesTableBody").empty();

    facilities.forEach(function (facility) {
      $("#facilitiesTableBody").append(`
      <tr>
    <td>${facility.id}</td>
    <td>${facility.name}</td>
    <td>${facility.type}</td>
    <td>${facility.location}</td>
    <td>${facility.manager}</td>
    <td>${facility.status}</td>
    <td>
      <button type="button" class="btn btn-sm btn-outline-primary disabled">View</button
    </td>
    </tr>
    `);
    });
  }

  renderFacilities();

  //Handle adding a new facility
  $("#facilityForm").on("submit", function (event) {
    event.preventDefault();

    const facilityName = $("#facilityName").val().trim();
    const facilityType = $("#facilityType").val().trim();
    const facilityLocation = $("#facilityLocation").val().trim();
    const facilityManager = $("#facilityManager").val().trim();
    const facilityStatus = $("#facilityStatus").val();

    const newFacility = {
      id: `FAC-${String(facilities.length + 1).padStart(3, "0")}`,
      name: facilityName,
      type: facilityType,
      location: facilityLocation,
      manager: facilityManager,
      status: facilityStatus,
    };

    facilities.push(newFacility);

    renderFacilities();

    this.reset();

    const facilityModal = bootstrap.Modal.getInstance(
      document.getElementById("facilityModal"),
    );

    facilityModal.hide();
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
      $("#sidebarToggle").attr("aria-expanded", "false");
    }
  });
});
