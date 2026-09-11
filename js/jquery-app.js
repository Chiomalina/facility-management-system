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

    if (facilities.length === 0) {
      $("#facilitiesTableBody").html(`
      <tr class="empty-state-row">
        <td colspan="7" class="text-center text-muted py-4">
          No facilities have been added yet.
        </td>
      </tr>
    `);

      return;
    }

    facilities.forEach(function (facility) {
      // Facilities Status Badges
      let statusClass = "bg-secondary";

      if (facility.status === "Active") {
        statusClass = "bg-success";
      } else if (facility.status === "Under Maintenance") {
        statusClass = "bg-warning text-dark";
      } else if (facility.status === "Inactive") {
        statusClass = "bg-secondary";
      }
      $("#facilitiesTableBody").append(`
      <tr>
        <td>${facility.id}</td>
        <td>${facility.name}</td>
        <td>${facility.type}</td>
        <td>${facility.location}</td>
        <td>${facility.manager}</td>
        <td>
          <span class="badge ${statusClass}">${facility.status}</span>
        </td>
        <td>
            <button
            type="button"
            class="btn btn-sm btn-outline-primary view-facility-btn"
            data-id="${facility.id}"
            >
              View
            </button>
            <button
            type="button"
            class="btn btn-sm btn-outline-secondary edit-facility-btn"
            data-id="${facility.id}"
          >
            Edit
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger delete-facility-btn"
            data-id="${facility.id}"
          >
            Delete
          </button>
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

    // Facility Form Validation
    if (
      !facilityName ||
      !facilityType ||
      !facilityLocation ||
      !facilityManager ||
      !facilityStatus
    ) {
      alert("Please complete all facility fields.");
      return;
    }

    const editingFacilityId = $("#editingFacilityId").val();

    if (editingFacilityId) {
      const facilityToUpdate = facilities.find(function (facility) {
        return facility.id === editingFacilityId;
      });

      if (!facilityToUpdate) {
        return;
      }

      facilityToUpdate.name = facilityName;
      facilityToUpdate.type = facilityType;
      facilityToUpdate.location = facilityLocation;
      facilityToUpdate.manager = facilityManager;
      facilityToUpdate.status = facilityStatus;
    } else {
      const newFacility = {
        id: `FAC-${String(facilities.length + 1).padStart(3, "0")}`,
        name: facilityName,
        type: facilityType,
        location: facilityLocation,
        manager: facilityManager,
        status: facilityStatus,
      };

      facilities.push(newFacility);
    }

    this.reset();

    renderFacilities();

    $("#editingFacilityId").val("");
    $("#facilityModalLabel").text("Add Facility");
    $("#facilityForm button[type='submit']").text("Save Facility");

    const facilityModal = bootstrap.Modal.getInstance(
      document.getElementById("facilityModal"),
    );

    facilityModal.hide();
  });

  // Listen for view button Click in Facility
  $("#facilitiesTableBody").on("click", ".view-facility-btn", function () {
    const facilityId = $(this).data("id");

    const selectedFacility = facilities.find(function (facility) {
      return facility.id === facilityId;
    });

    console.log(selectedFacility);

    if (!selectedFacility) {
      return;
    }

    $("#facilityDetailsBody").html(`
    <dl class="row mb-0">
      <dt class="col-sm-4">Facility ID</dt>
      <dd class="col-sm-8">${selectedFacility.id}</dd>

      <dt class="col-sm-4">Name</dt>
      <dd class="col-sm-8">${selectedFacility.name}</dd>

      <dt class="col-sm-4">Type</dt>
      <dd class="col-sm-8">${selectedFacility.type}</dd>

      <dt class="col-sm-4">Location</dt>
      <dd class="col-sm-8">${selectedFacility.location}</dd>

      <dt class="col-sm-4">Manager</dt>
      <dd class="col-sm-8">${selectedFacility.manager}</dd>

      <dt class="col-sm-4">Status</dt>
      <dd class="col-sm-8">${selectedFacility.status}</dd>
    </dl>
  `);

    const detailsModal = new bootstrap.Modal(
      document.getElementById("facilityDetailsModal"),
    );

    detailsModal.show();
  });

  //Listen and Handle the Edit Button Click
  $("#facilitiesTableBody").on("click", ".edit-facility-btn", function () {
    const facilityId = $(this).data("id");

    const selectedFacility = facilities.find(function (facility) {
      return facility.id === facilityId;
    });

    if (!selectedFacility) {
      return;
    }

    $("#editingFacilityId").val(selectedFacility.id);
    $("#facilityName").val(selectedFacility.name);
    $("#facilityType").val(selectedFacility.type);
    $("#facilityLocation").val(selectedFacility.location);
    $("#facilityManager").val(selectedFacility.manager);
    $("#facilityStatus").val(selectedFacility.status);

    $("#facilityModalLabel").text("Edit Facility");
    $("#facilityForm button[type='submit']").text("Update Facility");

    const facilityModal = new bootstrap.Modal(
      document.getElementById("facilityModal"),
    );

    facilityModal.show();
  });

  // Listen to and handle the delete button
  $("#facilitiesTableBody").on("click", ".delete-facility-btn", function () {
    const facilityId = $(this).data("id");

    const facilityIndex = facilities.findIndex(function (facility) {
      return facility.id === facilityId;
    });

    if (facilityIndex === -1) {
      return;
    }

    const facility = facilities[facilityIndex];

    const confirmed = confirm(
      `Are you sure you want to delete "${facility.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    facilities.splice(facilityIndex, 1);

    renderFacilities();
  });

  //No Search/Filter matches
  function updateFacilityEmptyState() {
    $("#noFacilityResults").remove();

    const visibleRows = $("#facilitiesTableBody tr")
      .not(".empty-state-row")
      .filter(":visible");

    if (facilities.length > 0 && visibleRows.length === 0) {
      $("#facilitiesTableBody").append(`
      <tr id="noFacilityResults">
        <td colspan="7" class="text-center text-muted py-4">
          No matching facilities found.
        </td>
      </tr>
    `);
    }
  }

  //Facilities Search Logic
  $("#facilitySearch").on("input", function () {
    const searchTerm = $(this).val().trim().toLowerCase();

    $("#facilitiesTableBody tr").each(function () {
      const rowText = $(this).text().toLowerCase();

      const matchesSearch = rowText.includes(searchTerm);

      $(this).toggle(matchesSearch);
    });

    updateFacilityEmptyState();
  });

  //Facilities Search by Status
  $("#facilityStatusFilter").on("change", function () {
    const selectedStatus = $(this).val();

    $("#facilitiesTableBody tr").each(function () {
      const rowStatus = $(this).find("td:nth-child(6)").text().trim();

      const matchesStatus =
        selectedStatus === "all" || rowStatus === selectedStatus;

      $(this).toggle(matchesStatus);
    });
    updateFacilityEmptyState();
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
