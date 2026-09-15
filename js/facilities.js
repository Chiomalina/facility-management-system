/* ========================================
   FACILITY DATA
======================================== */

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

/* ========================================
   FACILITY FUNCTIONS
======================================== */

// Render facilities data
function renderFacilities() {
  //Displays facility rows

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
        <div class="d-flex flex-wrap gap-2">

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
          </div>
        </td>
    </tr>
    `);
  });
}

//Generate ID
function generateFacilityId() {
  //create safe unique ID
  const highestId = facilities.reduce(function (maxId, facility) {
    const numericId = Number(facility.id.replace("FAC-", ""));

    return Math.max(maxId, numericId);
  }, 0);

  return `FAC-${String(highestId + 1).padStart(3, "0")}`;
}

//Reset Facility Form
function resetFacilityForm() {
  //restore Add Facility form state
  $("#facilityForm")[0].reset();
  $("#editingFacilityId").val("");
  $("#facilityModalLabel").text("Add Facility");
  $("#facilityForm button[type='submit']").text("Save Facility");
}

function updateFacilityStats() {
  //calculate summary cards
  const totalFacilities = facilities.length;

  const activeFacilities = facilities.filter(function (facility) {
    return facility.status === "Active";
  }).length;

  const maintenanceFacilities = facilities.filter(function (facility) {
    return facility.status === "Under Maintenance";
  }).length;

  const inactiveFacilities = facilities.filter(function (facility) {
    return facility.status === "Inactive";
  }).length;

  $("#totalFacilities").text(totalFacilities);
  $("#activeFacilities").text(activeFacilities);
  $("#maintenanceFacilities").text(maintenanceFacilities);
  $("#inactiveFacilities").text(inactiveFacilities);
}

//No Search/Filter matches
function updateFacilityEmptyState() {
  //show no-results message
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

//Combine search and status filtering
function applyFacilityFilters() {
  //combine search + status filtering
  const searchTerm = $("#facilitySearch").val().trim().toLowerCase();
  const selectedStatus = $("#facilityStatusFilter").val();

  $("#noFacilityResults").remove();

  $("#facilitiesTableBody tr")
    .not(".empty-state-row")
    .each(function () {
      const rowText = $(this).text().toLowerCase();
      const rowStatus = $(this).find("td:nth-child(6)").text().trim();

      const matchesSearch = rowText.includes(searchTerm);

      const matchesStatus =
        selectedStatus === "all" || rowStatus === selectedStatus;

      $(this).toggle(matchesSearch && matchesStatus);
    });

  updateFacilityEmptyState();
}

$(function () {
  renderFacilities();
  updateFacilityStats();

  // Handle Add / Edit Facility form submission
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
        id: generateFacilityId(),
        name: facilityName,
        type: facilityType,
        location: facilityLocation,
        manager: facilityManager,
        status: facilityStatus,
      };

      facilities.push(newFacility);
    }

    renderFacilities();
    updateFacilityStats();

    resetFacilityForm();

    const facilityModal = bootstrap.Modal.getInstance(
      document.getElementById("facilityModal"),
    );

    facilityModal.hide();
  });

  // View Facility
  $("#facilitiesTableBody").on("click", ".view-facility-btn", function () {
    const facilityId = $(this).data("id");

    const selectedFacility = facilities.find(function (facility) {
      return facility.id === facilityId;
    });

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

  // Edit Facility
  $("#facilitiesTableBody").on("click", ".edit-facility-btn", function () {
    // existing Edit code
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

  // Delete Facility
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
    updateFacilityStats();
  });

  $("#facilitySearch").on("input", function () {
    applyFacilityFilters();
  });

  $("#facilityStatusFilter").on("change", function () {
    applyFacilityFilters();
  });
});
