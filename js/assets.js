/* ========================================
   ASSET CATEGORIES
======================================== */

const assetCategories = [
  "HVAC",
  "IT Equipment",
  "Safety Equipment",
  "Electrical",
];

/* ========================================
   ASSET DATA
======================================== */

const assets = [
  {
    id: "AST-001",
    name: "Air Conditioner",
    category: "HVAC",
    facilityId: "FAC-001",
    serialNumber: "AC-001-2024",
    purchaseDate: "2024-03-15",
    status: "Active",
  },
  {
    id: "AST-002",
    name: "Dell Office Computer",
    category: "IT Equipment",
    facilityId: "FAC-001",
    serialNumber: "PC-DELL-002",
    purchaseDate: "2025-01-20",
    status: "Active",
  },
  {
    id: "AST-003",
    name: "Fire Extinguisher",
    category: "Safety Equipment",
    facilityId: "FAC-001",
    serialNumber: "FE-003-2023",
    purchaseDate: "2023-06-10",
    status: "Inspection Due",
  },
  {
    id: "AST-004",
    name: "Main Circuit Box",
    category: "Electrical",
    facilityId: "FAC-002",
    serialNumber: "CB-004-2022",
    purchaseDate: "2022-09-05",
    status: "Active",
  },
  {
    id: "AST-005",
    name: "HP Reception Computer",
    category: "IT Equipment",
    facilityId: "FAC-002",
    serialNumber: "PC-HP-005",
    purchaseDate: "2024-11-18",
    status: "Maintenance",
  },
  {
    id: "AST-006",
    name: "Server Room Air Conditioner",
    category: "HVAC",
    facilityId: "FAC-003",
    serialNumber: "AC-SRV-006",
    purchaseDate: "2021-04-25",
    status: "Active",
  },
  {
    id: "AST-007",
    name: "Emergency Fire Extinguisher",
    category: "Safety Equipment",
    facilityId: "FAC-003",
    serialNumber: "FE-007-2025",
    purchaseDate: "2025-02-14",
    status: "Active",
  },
  {
    id: "AST-008",
    name: "Secondary Circuit Box",
    category: "Electrical",
    facilityId: "FAC-004",
    serialNumber: "CB-008-2020",
    purchaseDate: "2020-08-30",
    status: "Out of Service",
  },
];

/* ========================================
   ASSET FUNCTIONS
======================================== */

// Update Asset Summary
function updateAssetSummary() {
  const totalAssets = assets.length;

  const activeAssets = assets.filter(
    (asset) => asset.status === "Active",
  ).length;

  const maintenanceAssets = assets.filter(
    (asset) => asset.status === "Maintenance",
  ).length;

  const outOfServiceAssets = assets.filter(
    (asset) => asset.status === "Out of Service",
  ).length;

  $("#totalAssets").text(totalAssets);
  $("#activeAssetCount").text(activeAssets);
  $("#maintenanceAssetCount").text(maintenanceAssets);
  $("#outOfServiceAssetCount").text(outOfServiceAssets);
}

// Populate Category and facility dropdown
function populateAssetFormOptions() {
  const $categorySelect = $("#assetCategory");
  const $facilitySelect = $("#assetFacility");

  $categorySelect.find("option:not(:first)").remove();
  $facilitySelect.find("option:not(:first)").remove();

  assetCategories.forEach((category) => {
    $categorySelect.append(`<option value="${category}">${category}</option>`);
  });

  facilities.forEach((facility) => {
    $facilitySelect.append(
      `<option value="${facility.id}">${facility.name}</option>`,
    );
  });
}

// Render asset table rows
function renderAssets() {
  const $tableBody = $("#assetsTableBody");

  // Clear existing rows before rendering
  $tableBody.empty();

  if (assets.length === 0) {
    $tableBody.html(`
    <tr class="empty-state-row">
      <td colspan="9" class="text-center text-muted py-4">
        No assets have been added yet.
      </td>
    </tr>
  `);

    return;
  }

  assets.forEach((asset) => {
    // Find the facility linked to this asset
    const facility = facilities.find(
      (facility) => facility.id === asset.facilityId,
    );

    const facilityName = facility ? facility.name : "Unknown Facility";

    let statusClass = "bg-secondary";

    switch (asset.status) {
      case "Active":
        statusClass = "bg-success";
        break;

      case "Maintenance":
        statusClass = "bg-warning text-dark";
        break;

      case "Inspection Due":
        statusClass = "bg-info text-dark";
        break;

      case "Out of Service":
        statusClass = "bg-danger";
        break;
    }
    const row = `
      <tr>
        <td>${asset.id}</td>
        <td>${asset.name}</td>
        <td>${asset.category}</td>
        <td>${facilityName}</td>
        <td>${asset.serialNumber}</td>
        <td>${asset.purchaseDate}</td>
        <td>${calculateAssetAge(asset.purchaseDate)}</td>
        <td><span class="badge ${statusClass}">
              ${asset.status}
            </span>
        </td>
        <td>
        <div class="d-flex flex-wrap gap-2">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary view-asset-btn"
            data-id="${asset.id}"
          >
            View
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary edit-asset-btn"
          data-id="${asset.id}">
            Edit
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger delete-asset-btn"
            data-id="${asset.id}"
          >
            Delete
        </button>
        </div>
        </td>
      </tr>
    `;

    $tableBody.append(row);
  });
}

function generateAssetId() {
  const highestId = assets.reduce((maxId, asset) => {
    const numericId = Number(asset.id.replace("AST-", ""));

    return Math.max(maxId, numericId);
  }, 0);

  return `AST-${String(highestId + 1).padStart(3, "0")}`;
}

function calculateAssetAge(purchaseDate) {
  if (!purchaseDate) {
    return "Unknown";
  }

  const [year, month, day] = purchaseDate.split("-").map(Number);

  const purchase = new Date(year, month - 1, day);
  const today = new Date();

  // Invalid date protection
  if (Number.isNaN(purchase.getTime())) {
    return "Invalid date";
  }

  // Future date protection
  if (purchase > today) {
    return "Invalid purchase date";
  }

  let years = today.getFullYear() - purchase.getFullYear();
  let months = today.getMonth() - purchase.getMonth();

  if (today.getDate() < purchase.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }

  if (months === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  return `${years} year${years !== 1 ? "s" : ""}, ${months} month${
    months !== 1 ? "s" : ""
  }`;
}

/* ========================================
   ASSET FILTER FUNCTIONS
======================================== */
function applyAssetFilters() {
  const searchTerm = $("#assetSearch").val().trim().toLowerCase();
  const selectedStatus = $("#assetStatusFilter").val();
  const selectedFacilityId = $("#assetFacilityFilter").val();
  const selectedCategory = $("#assetCategoryFilter").val();

  const selectedFacility = facilities.find(
    (facility) => facility.id === selectedFacilityId,
  );

  const selectedFacilityName = selectedFacility ? selectedFacility.name : "";

  $("#assetsTableBody tr")
    .not(".empty-state-row")
    .each(function () {
      // filter calculations...
      const rowText = $(this).text().toLowerCase();

      const rowCategory = $(this).find("td:nth-child(3)").text().trim();

      const rowFacility = $(this).find("td:nth-child(4)").text().trim();

      const rowStatus = $(this).find("td:nth-child(8)").text().trim();

      const matchesSearch = rowText.includes(searchTerm);

      const matchesStatus =
        selectedStatus === "all" || rowStatus === selectedStatus;

      const matchesFacility =
        selectedFacilityId === "all" || rowFacility === selectedFacilityName;

      const matchesCategory =
        selectedCategory === "all" || rowCategory === selectedCategory;

      $(this).toggle(
        matchesSearch && matchesStatus && matchesFacility && matchesCategory,
      );

      // Check only after all rows have been filtered
      updateAssetEmptyState();
    });
}

// No Search / Filter matches
function updateAssetEmptyState() {
  $("#noAssetResults").remove();

  const visibleRows = $("#assetsTableBody tr")
    .not(".empty-state-row")
    .filter(":visible");

  if (assets.length > 0 && visibleRows.length === 0) {
    $("#assetsTableBody").append(`
      <tr id="noAssetResults">
        <td colspan="9" class="text-center text-muted py-4">
          No matching assets found.
        </td>
      </tr>
    `);
  }
}

// search by Facility
function populateAssetFacilityFilter() {
  const $facilityFilter = $("#assetFacilityFilter");

  $facilityFilter.find("option:not(:first)").remove();

  facilities.forEach((facility) => {
    $facilityFilter.append(
      `<option value="${facility.id}">${facility.name}</option>`,
    );
  });
}

// Search by Category
function populateAssetCategoryFilter() {
  const $categoryFilter = $("#assetCategoryFilter");

  $categoryFilter.find("option:not(:first)").remove();

  assetCategories.forEach((category) => {
    $categoryFilter.append(`<option value="${category}">${category}</option>`);
  });
}

/* ========================================
   ASSET INITIALIZATION
======================================== */

$(function () {
  const today = new Date().toISOString().split("T")[0];

  const purchaseDate = $("#assetPurchaseDate").val();

  if (purchaseDate > today) {
    alert("Purchase date cannot be in the future.");
    return;
  }

  $("#assetPurchaseDate").attr("max", today);

  // initial rendering
  populateAssetFormOptions();
  renderAssets();
  updateAssetSummary();
  populateAssetFacilityFilter();
  populateAssetCategoryFilter();

  // Handle Asset form submission
  // Add Asset
  $("#assetForm").on("submit", function (event) {
    event.preventDefault();
    const editingAssetId = $("#editingAssetId").val();

    if (editingAssetId) {
      const asset = assets.find((asset) => asset.id === editingAssetId);

      if (!asset) return;

      asset.name = $("#assetName").val().trim();
      asset.category = $("#assetCategory").val();
      asset.facilityId = $("#assetFacility").val();
      asset.serialNumber = $("#assetSerialNumber").val().trim();
      asset.purchaseDate = $("#assetPurchaseDate").val();
      asset.status = $("#assetStatus").val();
    } else {
      const newAsset = {
        id: generateAssetId(),
        name: $("#assetName").val().trim(),
        category: $("#assetCategory").val(),
        facilityId: $("#assetFacility").val(),
        serialNumber: $("#assetSerialNumber").val().trim(),
        purchaseDate: $("#assetPurchaseDate").val(),
        status: $("#assetStatus").val(),
      };
      assets.push(newAsset);
    }

    renderAssets();
    updateAssetSummary();

    this.reset();
    $("#editingAssetId").val("");

    const assetModal = bootstrap.Modal.getInstance(
      document.getElementById("assetModal"),
    );

    assetModal.hide();
  });

  // Edit Asset button
  $("#assetsTableBody").on("click", ".edit-asset-btn", function () {
    const assetId = $(this).data("id");

    const asset = assets.find((asset) => asset.id === assetId);

    if (!asset) return;

    $("#editingAssetId").val(asset.id);
    $("#assetName").val(asset.name);
    $("#assetCategory").val(asset.category);
    $("#assetFacility").val(asset.facilityId);
    $("#assetSerialNumber").val(asset.serialNumber);
    $("#assetPurchaseDate").val(asset.purchaseDate);
    $("#assetStatus").val(asset.status);

    $("#assetModalLabel").text("Edit Asset");
    $("#assetForm button[type='submit']").text("Update Asset");

    const assetModal = new bootstrap.Modal(
      document.getElementById("assetModal"),
    );

    assetModal.show();
  });

  renderAssets();
  updateAssetSummary();
  applyAssetFilters();

  // View Asset details
  $("#assetsTableBody").on("click", ".view-asset-btn", function () {
    const assetId = $(this).data("id");

    const selectedAsset = assets.find((asset) => asset.id === assetId);

    if (!selectedAsset) return;

    const facility = facilities.find(
      (facility) => facility.id === selectedAsset.facilityId,
    );

    const facilityName = facility ? facility.name : "Unknown Facility";
    const assetAge = calculateAssetAge(selectedAsset.purchaseDate);

    $("#assetDetailsBody").html(`
    <dl class="row mb-0">
      <dt class="col-sm-4">Asset ID</dt>
      <dd class="col-sm-8">${selectedAsset.id}</dd>

      <dt class="col-sm-4">Asset Name</dt>
      <dd class="col-sm-8">${selectedAsset.name}</dd>

      <dt class="col-sm-4">Category</dt>
      <dd class="col-sm-8">${selectedAsset.category}</dd>

      <dt class="col-sm-4">Facility</dt>
      <dd class="col-sm-8">${facilityName}</dd>

      <dt class="col-sm-4">Serial Number</dt>
      <dd class="col-sm-8">${selectedAsset.serialNumber}</dd>

      <dt class="col-sm-4">Purchase Date</dt>
      <dd class="col-sm-8">${selectedAsset.purchaseDate}</dd>

      <dt class="col-sm-4">Asset Age</dt>
      <dd class="col-sm-8">${assetAge}</dd>

      <dt class="col-sm-4">Status</dt>
      <dd class="col-sm-8">${selectedAsset.status}</dd>
    </dl>
  `);

    const assetDetailsModal = new bootstrap.Modal(
      document.getElementById("assetDetailsModal"),
    );

    assetDetailsModal.show();
  });

  // Delete Asset
  $("#assetsTableBody").on("click", ".delete-asset-btn", function () {
    const assetId = $(this).data("id");

    const assetIndex = assets.findIndex((asset) => asset.id === assetId);

    if (assetIndex === -1) return;

    const asset = assets[assetIndex];

    const confirmed = confirm(
      `Are you sure you want to delete "${asset.name}"?`,
    );

    if (!confirmed) return;

    assets.splice(assetIndex, 1);

    renderAssets();
    updateAssetSummary();
    applyAssetFilters();
  });

  // Search Assets
  $("#assetSearch").on("input", function () {
    applyAssetFilters();
  });

  // Status Filter
  $("#assetStatusFilter").on("change", function () {
    applyAssetFilters();
  });

  // Facility Filter
  $("#assetFacilityFilter").on("change", function () {
    applyAssetFilters();
  });

  // Category Filter
  $("#assetCategoryFilter").on("change", function () {
    applyAssetFilters();
  });

  // Reset the Modal back to ADD Mode
  $("#addAssetBtn").on("click", function () {
    $("#assetForm")[0].reset();
    $("#editingAssetId").val("");

    $("#assetModalLabel").text("Add Asset");
    $("#assetForm button[type='submit']").text("Save Asset");
  });
});
