import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import ChemicalReagentForm from "./forms/ChemicalReagentForm";
import DetailPopup from "./DetailPopup";

const API_URL = "http://localhost:5000/api/chemical";

const ChemicalReagents = () => {
  // State
  const [reagents, setReagents] = useState([]);

  // Filter values
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);

  // Predefined Filters
  const [categories, setCategories] = useState([
    "Lactic Acid",
    "Lactic Acid Fermentation",
    "Polymerization",
    "Filtration and Purification",
    "Sugar Analysis",
  ]);
  const [statuses, setStatuses] = useState([
    "Opened",
    "Unopened",
    "EXPIRED: Opened",
    "EXPIRED: Unopened",
    "EXPIRED: Sealed",
  ]);
  const [locations, setLocations] = useState([
    "Table 2, Cabinet 4",
    "Shelf 2b",
    "Shelf 1d",
  ]);
  const [forms, setForms] = useState(["Solid", "Liquid"]);

  // UI Toggles
  const [showForm, setShowForm] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showExpirationFilter, setShowExpirationFilter] = useState(false);

  // Sorting for expiration (if needed)
  const [expirationSortOrder, setExpirationSortOrder] = useState("");

  // Form and details
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  // Inline edit
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});

  // Refs
  const categoryRef = useRef(null);
  const statusRef = useRef(null);
  const locationRef = useRef(null);
  const expirationRef = useRef(null);

  // Effects
  useEffect(() => {
    fetchReagents();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (e) => {
    if (categoryRef.current && !categoryRef.current.contains(e.target))
      setShowCategoryFilter(false);
    if (statusRef.current && !statusRef.current.contains(e.target))
      setShowStatusFilter(false);
    if (locationRef.current && !locationRef.current.contains(e.target))
      setShowLocationFilter(false);
    if (expirationRef.current && !expirationRef.current.contains(e.target))
      setShowExpirationFilter(false);
  };

  // Fetch data
  const fetchReagents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("Fetched data:", data);
      setReagents(data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  // Filtering
  const filteredReagents = reagents.filter((r) => {
    const matchesSearch =
      (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.location || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory.length === 0 || filterCategory.includes(r.category);
    const matchesStatus =
      filterStatus.length === 0 || filterStatus.includes(r.status);
    const matchesLocation =
      filterLocation.length === 0 || filterLocation.includes(r.location);

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const handleFilterChange = (filterType, value, checked) => {
    const update = (prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value);

    switch (filterType) {
      case "category":
        setFilterCategory(update);
        setShowCategoryFilter(false);
        break;
      case "status":
        setFilterStatus(update);
        setShowStatusFilter(false);
        break;
      case "location":
        setFilterLocation(update);
        setShowLocationFilter(false);
        break;
      default:
        break;
    }
  };

  // Color helpers
  const getStatusColor = (s) => {
    switch (s) {
      case "Opened":
        return "status-opened";
      case "Unopened":
        return "status-unopened";
      case "EXPIRED: Opened":
        return "status-expired-opened";
      case "EXPIRED: Unopened":
        return "status-expired-unopened";
      case "EXPIRED: Sealed":
        return "status-expired-sealed";
      default:
        return "";
    }
  };

  const getExpirationColor = (expirationDate) => {
    if (!expirationDate) return "N/A";
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) return "exp-overdue";
    if (diffDays <= 30) return "exp-due-soon";
    return "exp-on-track";
  };

  // Date helpers
  const formatDatePretty = (isoDateStr) => {
    if (!isoDateStr) return "N/A";
    const date = new Date(isoDateStr);
    if (isNaN(date)) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Dynamically compute status
  const computeStatus = (item) => {
    if (!item.expiration_date) return item.status;
    const expDate = new Date(item.expiration_date);
    const today = new Date();

    if (expDate < today) {
      if (item.status.includes("Opened")) return "EXPIRED: Opened";
      if (item.status.includes("Unopened")) return "EXPIRED: Unopened";
      if (item.status.includes("Sealed")) return "EXPIRED: Sealed";
      return "EXPIRED: " + item.status;
    }
    if (item.status.startsWith("EXPIRED: ")) {
      return item.status.replace("EXPIRED: ", "");
    }
    return item.status;
  };

  // Handlers
  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (reagent) => {
    setEditingItem(reagent);
    setShowForm(true);
  };

  const handleSave = async () => {
    // before saving, compute proper status
    const expDate = new Date(
      editingItem?.expiration_date || editingData?.expiration_date
    );
    const today = new Date();
    let statusToSave = editingItem?.status || editingData?.status;

    if (expDate < today) {
      if (statusToSave.includes("Opened")) statusToSave = "EXPIRED: Opened";
      else if (statusToSave.includes("Unopened"))
        statusToSave = "EXPIRED: Unopened";
      else if (statusToSave.includes("Sealed"))
        statusToSave = "EXPIRED: Sealed";
      else statusToSave = "EXPIRED: " + statusToSave;
    } else if (statusToSave?.startsWith("EXPIRED: ")) {
      statusToSave = statusToSave.replace("EXPIRED: ", "");
    }

    // include statusToSave in your payload before sending to backend
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete?")) {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchReagents();
    }
  };

  const handleInlineEdit = (r) => {
    setEditingRowId(r.chemical_id);
    setEditingData({ ...r });
  };

  const handleSaveInlineEdit = async () => {
    // compute status before saving
    let updatedStatus = editingData.status;
    if (editingData.expiration_date) {
      const expDate = new Date(editingData.expiration_date);
      const today = new Date();
      if (expDate < today) {
        if (updatedStatus.includes("Opened")) updatedStatus = "EXPIRED: Opened";
        else if (updatedStatus.includes("Unopened"))
          updatedStatus = "EXPIRED: Unopened";
        else if (updatedStatus.includes("Sealed"))
          updatedStatus = "EXPIRED: Sealed";
        else updatedStatus = "EXPIRED: " + updatedStatus;
      } else if (updatedStatus.startsWith("EXPIRED: ")) {
        updatedStatus = updatedStatus.replace("EXPIRED: ", "");
      }
    }

    const payload = { ...editingData, status: updatedStatus };
    const res = await fetch(`${API_URL}/${editingRowId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchReagents();
      setEditingRowId(null);
      setEditingData({});
    }
  };

  const handleCancelInlineEdit = () => {
    setEditingRowId(null);
    setEditingData({});
  };

  const handleInputChange = (field, value) => {
    setEditingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleViewDetails = (r) => setDetailItem(r);

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="reagents">
      <div className="content-section">
        <div className="content-card">
          <div className="section-header">
            <h1 className="font-marcellus">Chemical Reagents Inventory</h1>
          </div>

          <div className="controls-section">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search Items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <button className="btn-primary" onClick={handleAdd}>
              <Plus size={20} />
              Add Chemical Reagent
            </button>
          </div>

          {showForm ? (
            <div className="form-container">
              <div className="form-header">
                <h2>
                  {editingItem
                    ? "Edit Chemical Reagent"
                    : "Add Chemical Reagent"}
                </h2>
              </div>
              <ChemicalReagentForm
                initialData={editingItem}
                onSave={handleSave}
                onCancel={handleCancel}
                categories={categories}
                setCategories={setCategories}
                forms={forms}
                setForms={setForms}
                locations={locations}
                setLocations={setLocations}
                statuses={statuses}
                setStatuses={setStatuses}
              />
            </div>
          ) : (
            <div className="table-responsive">
            <div className="modern-table">
              <div className="table-header">
                {/* Existing Headers */}
                <div className="header-cell">
                  <span className="text-center">Chemical Name</span>
                </div>
                <div className="header-cell filter-header" ref={categoryRef}>
                  <div
                    onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                  >
                    <span className="text-center">Category</span>
                    <ChevronDown
                      size={16}
                      className={`filter-arrow ${
                        showCategoryFilter ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {showCategoryFilter && (
                    <div
                      className="filter-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {categories.map((category) => (
                        <label key={category} className="filter-option">
                          <input
                            type="checkbox"
                            checked={filterCategory.includes(category)}
                            onChange={(e) =>
                              handleFilterChange(
                                "category",
                                category,
                                e.target.checked
                              )
                            }
                          />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <div className="header-cell hide-mobile">
                  <span className="text-center">Date Opened</span>
                </div>
                {/* Expiration Date Header */}
                <div className="header-cell filter-header" ref={expirationRef}>
                  <div
                    onClick={() =>
                      setShowExpirationFilter(!showExpirationFilter)
                    }
                  >
                    <span className="text-center">Expiration Date</span>
                    <ChevronDown
                      size={16}
                      className={`filter-arrow ${
                        showExpirationFilter ? "rotated" : ""
                      }`}
                    />
                  </div>

                  {showExpirationFilter && (
                    <div
                      className="filter-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="filter-option">
                        <input
                          type="checkbox"
                          checked={expirationSortOrder === "soonest"}
                          onChange={(e) => {
                            // if already selected, unselect; otherwise select
                            setExpirationSortOrder(
                              expirationSortOrder === "soonest" ? "" : "soonest"
                            );
                            setShowExpirationFilter(false);
                          }}
                        />
                        <span>Soonest to Expire</span>
                      </label>

                      <label className="filter-option">
                        <input
                          type="checkbox"
                          checked={expirationSortOrder === "farthest"}
                          onChange={(e) => {
                            setExpirationSortOrder(
                              expirationSortOrder === "farthest"
                                ? ""
                                : "farthest"
                            );
                            setShowExpirationFilter(false);
                          }}
                        />
                        <span>Farthest to Expire</span>
                      </label>
                    </div>
                  )}
                </div>

                <div className="header-cell hide-mobile">
                  <span className="text-center">Container Size</span>
                </div>
                <div className="header-cell filter-header" ref={locationRef}>
                  <div
                    onClick={() => setShowLocationFilter(!showLocationFilter)}
                  >
                    <span className="text-center">Location</span>
                    <ChevronDown
                      size={16}
                      className={`filter-arrow ${
                        showLocationFilter ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {showLocationFilter && (
                    <div
                      className="filter-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {locations.map((location) => (
                        <label key={location} className="filter-option">
                          <input
                            type="checkbox"
                            checked={filterLocation.includes(location)}
                            onChange={(e) =>
                              handleFilterChange(
                                "location",
                                location,
                                e.target.checked
                              )
                            }
                          />
                          <span>{location}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <div className="header-cell filter-header" ref={statusRef}>
                  <div onClick={() => setShowStatusFilter(!showStatusFilter)}>
                    <span className="text-center">Status</span>
                    <ChevronDown
                      size={16}
                      className={`filter-arrow ${
                        showStatusFilter ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {showStatusFilter && (
                    <div
                      className="filter-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {statuses.map((status) => (
                        <label key={status} className="filter-option">
                          <input
                            type="checkbox"
                            checked={filterStatus.includes(status)}
                            onChange={(e) =>
                              handleFilterChange(
                                "status",
                                status,
                                e.target.checked
                              )
                            }
                          />
                          <span>{status}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <div className="header-cell">
                  <span className="text-center">Actions</span>
                </div>
              </div>
              {/* Table Body */}
              <div className="table-scroll-body">
                <div className="table-body">
                  {filteredReagents
                    .slice() // make a shallow copy before sorting
                    .sort((a, b) => {
                      if (expirationSortOrder === "soonest") {
                        return (
                          new Date(a.expiration_date || 0) -
                          new Date(b.expiration_date || 0)
                        );
                      } else if (expirationSortOrder === "farthest") {
                        return (
                          new Date(b.expiration_date || 0) -
                          new Date(a.expiration_date || 0)
                        );
                      } else {
                        // default sort (by name, or leave as-is)
                        return a.name.localeCompare(b.name);
                      }
                    })
                    .map((reagent) => (
                      <div
                        key={reagent.chemical_id}
                        className={`table-row ${
                          editingRowId === reagent.chemical_id
                            ? "editing-row"
                            : ""
                        }`}
                      >
                        {/* Chemical Name */}
                        <div className="row-cell flex-[2]">
                          <div className="item-details">
                            <button
                              className="item-name"
                              onClick={() => handleViewDetails(reagent)}
                            >
                              {reagent.name}
                            </button>
                            <div className="item-brand">{reagent.brand}</div>
                          </div>
                        </div>

                        {/* Category */}
                        <div className="row-cell flex-[1.2]" data-label="Category">
                          {editingRowId === reagent.chemical_id ? (
                            <select
                              value={editingData.category}
                              onChange={(e) =>
                                handleInputChange("category", e.target.value)
                              }
                              className="inline-edit-select"
                            >
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-left">
                              {reagent.category}
                            </span>
                          )}
                        </div>

                        {/* Date Opened */}
                        <div className="row-cell flex-[1] hide-mobile">
                          {editingRowId === reagent.chemical_id ? (
                            <input
                              type="date"
                              value={editingData.date_opened || ""}
                              onChange={(e) =>
                                handleInputChange("date_opened", e.target.value)
                              }
                              className="inline-edit-input"
                            />
                          ) : (
                            <span className="text-left">
                              {formatDatePretty(reagent.date_opened) ||
                                "Not opened"}
                            </span>
                          )}
                        </div>

                        {/* Expiration Date */}
                        <div className="row-cell flex-[1]" data-label="Exp. Date">
                          {editingRowId === reagent.chemical_id ? (
                            <input
                              type="date"
                              value={editingData.expiration_date || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "expiration_date",
                                  e.target.value
                                )
                              }
                              className="inline-edit-input"
                            />
                          ) : (
                            <span
                              className={`expiration-badge ${getExpirationColor(
                                reagent.expiration_date
                              )}`}
                            >
                              {formatDatePretty(reagent.expiration_date)}
                            </span>
                          )}
                        </div>

                        {/* Container Size */}
                        <div className="row-cell flex-[0.8] hide-mobile">
                          {editingRowId === reagent.chemical_id ? (
                            <input
                              type="text"
                              value={editingData.container_size || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "container_size",
                                  e.target.value
                                )
                              }
                              className="inline-edit-input"
                            />
                          ) : (
                            <span className="text-left">
                              {reagent.container_size}
                            </span>
                          )}
                        </div>

                        {/* Location */}
                        <div className="row-cell flex-[1]" data-label="Location">
                          {editingRowId === reagent.chemical_id ? (
                            <select
                              value={editingData.location}
                              onChange={(e) =>
                                handleInputChange("location", e.target.value)
                              }
                              className="inline-edit-select"
                            >
                              {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-left">
                              {reagent.location}
                            </span>
                          )}
                        </div>

                        {/* Status */}
                        <div className="row-cell flex-[1]" data-label="Status">
                          {editingRowId === reagent.chemical_id ? (
                            <select
                              value={editingData.status}
                              onChange={(e) =>
                                handleInputChange("status", e.target.value)
                              }
                              className="inline-edit-select"
                            >
                              {statuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span
                              className={`status-badge ${getStatusColor(
                                computeStatus(reagent)
                              )}`}
                            >
                              {computeStatus(reagent)}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="row-cell flex-[1]">
                          {editingRowId === reagent.chemical_id ? (
                            <div className="action-buttons">
                              <button
                                className="btn-icon btn-save"
                                onClick={handleSaveInlineEdit}
                                title="Save"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                className="btn-icon btn-cancel"
                                onClick={handleCancelInlineEdit}
                                title="Cancel"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="action-buttons">
                              <button
                                className="btn-icon btn-edit"
                                onClick={() => handleInlineEdit(reagent)}
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="btn-icon btn-delete"
                                onClick={() =>
                                  handleDelete(reagent.chemical_id)
                                }
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            </div>
          )}
          {detailItem && (
            <DetailPopup
              item={detailItem}
              onClose={() => setDetailItem(null)}
              title="Chemical Reagent Details"
              fields={[
                {
                  label: "Name",
                  name: "name",
                  value: detailItem.name,
                  type: "text",
                },
                {
                  label: "Item Code",
                  name: "item_code",
                  value: detailItem.item_code,
                  type: "text",
                },
                {
                  label: "Category",
                  name: "category",
                  value: detailItem.category,
                  type: "text",
                },
                {
                  label: "Brand",
                  name: "brand",
                  value: detailItem.brand,
                  type: "text",
                },
                {
                  label: "Form",
                  name: "form",
                  value: detailItem.form,
                  type: "text",
                },
                {
                  label: "Container Type",
                  name: "container_type",
                  value: detailItem.container_type,
                  type: "text",
                },
                {
                  label: "Container Size",
                  name: "container_size",
                  value: detailItem.container_size,
                  type: "text",
                },

                {
                  label: "Quantity",
                  name: "quantity",
                  value: String(detailItem.quantity || ""),
                  type: "number",
                },

                {
                  label: "Date Received",
                  name: "date_received",
                  value: detailItem.date_received?.split("T")[0] || "",
                  type: "date",
                },
                {
                  label: "Date Opened",
                  name: "date_opened",
                  value: detailItem.date_opened?.split("T")[0] || "",
                  type: "date",
                },
                {
                  label: "Expiration Date",
                  name: "expiration_date",
                  value: detailItem.expiration_date?.split("T")[0] || "",
                  type: "date",
                },

                {
                  label: "Status",
                  name: "status",
                  value: detailItem.status,
                  type: "text",
                },
                {
                  label: "Location",
                  name: "location",
                  value: detailItem.location,
                  type: "text",
                },

                {
                  label: "MSDS",
                  name: "msds_file",
                  value: detailItem.msds_file || "",
                  type: "file",
                },
                {
                  label: "Disposal Method",
                  name: "disposal_method",
                  value: detailItem.disposal_method,
                  type: "text",
                },
                {
                  label: "Remarks",
                  name: "remarks",
                  value: detailItem.remarks,
                  type: "text",
                },
              ]}
              onSave={async (formOrData) => {
                try {
                  let body, headers;

                  if (formOrData instanceof FormData) {
                    body = formOrData;
                    headers = {}; // browser sets multipart
                  } else {
                    body = JSON.stringify(formOrData);
                    headers = { "Content-Type": "application/json" };
                  }

                  const res = await fetch(
                    `${API_URL}/${detailItem.chemical_id}`,
                    {
                      method: "PUT",
                      body,
                      headers,
                    }
                  );

                  if (res.ok) {
                    await fetchReagents();
                    setDetailItem(null);
                  } else {
                    console.error("Save failed:", await res.text());
                  }
                } catch (err) {
                  console.error("Error saving:", err);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChemicalReagents;
