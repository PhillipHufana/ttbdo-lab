// src/components/ChemicalReagents.jsx

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
  const [reagents, setReagents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [filterExpirationMonth, setFilterExpirationMonth] = useState("");
  const [showExpirationFilter, setShowExpirationFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  const categoryRef = useRef(null);
  const statusRef = useRef(null);
  const locationRef = useRef(null);
  const expirationRef = useRef(null);

  const categories = [
    "Lactic Acid",
    "Lactic Acid Fermentation",
    "Polymerization",
    "Filtration and Purification",
    "Sugar Analysis",
    "Others",
  ];

  const statuses = [
    "Opened",
    "Unopened",
    "Expired Opened",
    "Expired Unopened",
    "Expired Sealed",
  ];

  const locations = ["Table 2, Cabinet 4", "Shelf 2b", "Shelf 1d"];

  useEffect(() => {
    fetchReagents();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setShowCategoryFilter(false);
    }
    if (statusRef.current && !statusRef.current.contains(event.target)) {
      setShowStatusFilter(false);
    }
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setShowLocationFilter(false);
    }
    if (expirationRef.current && !expirationRef.current.contains(event.target)) {
      setShowExpirationFilter(false);
    }
  };

  const fetchReagents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setReagents(data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleFilterChange = (type, value, checked) => {
    if (type === "category") {
      setFilterCategory((prev) =>
        checked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    } else if (type === "status") {
      setFilterStatus((prev) =>
        checked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    } else if (type === "location") {
      setFilterLocation((prev) =>
        checked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    }
  };

  const filteredReagents = reagents.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory.length === 0 || filterCategory.includes(r.category);
    const matchesStatus =
      filterStatus.length === 0 || filterStatus.includes(r.status);
    const matchesLocation =
      filterLocation.length === 0 || filterLocation.includes(r.location);
    const matchesExpiration =
      !filterExpirationMonth ||
      (r.expiration_date &&
        r.expiration_date.startsWith(filterExpirationMonth));
    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesLocation &&
      matchesExpiration
    );
  });

  const handleFilterChange = (filterType, value, checked) => {
    switch (filterType) {
      case "category":
        setFilterCategory((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        setShowCategoryFilter(false);
        break;
      case "status":
        setFilterStatus((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        setShowStatusFilter(false);
        break;
      case "location":
        setFilterLocation((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        setShowLocationFilter(false);
        break;
      default:
        break;
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (reagent) => {
    setEditingItem(reagent);
    setShowForm(true);
  };
const handleSave = async (formData) => {
  const payload = {
    ...formData,
    msds_available: formData.msds_available ? 1 : 0,
  };

  const method = editingItem ? "PUT" : "POST";
  const url = editingItem
    ? `${API_URL}/${editingItem.chemical_id}`
    : API_URL;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    await fetchReagents();
    setShowForm(false);
    setEditingItem(null);
  } else {
    console.error(await res.text());
  }
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
    const res = await fetch(`${API_URL}/${editingRowId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingData),
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
    setEditingData({ ...editingData, [field]: value });
  };

  const handleViewDetails = (r) => {
    setDetailItem(r);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const getStatusColor = (s) => {
    switch (s) {
      case "Opened":
        return "status-opened";
      case "Unopened":
        return "status-unopened";
      default:
        return "";
    }
  };

   const formatDatePretty = (isoDateStr) => {
    if (!isoDateStr) return "N/A";
    const date = new Date(isoDateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                <h2>{editingItem ? "Edit Chemical Reagent" : "Add Chemical Reagent"}</h2>
              </div>
              <ChemicalReagentForm
                initialData={editingItem}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          ) : (
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
                <div className="header-cell">
                  <span className="text-center">Date Opened</span>
                </div>
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
                      <input
                        type="month"
                        value={filterExpirationMonth}
                        onChange={(e) => {
                          setFilterExpirationMonth(e.target.value);
                          setShowExpirationFilter(false);
                        }}
                        className="month-input"
                      />
                    </div>
                  )}
                </div>

                <div className="header-cell">
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
                {filteredReagents.map((reagent) => (
                  <div
                    key={reagent.chemical_id}
                    className={`table-row ${editingRowId === reagent.chemical_id ? "editing-row" : ""}`}
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
                    <div className="row-cell flex-[1.2]">
                      {editingRowId === reagent.chemical_id ? (
                        <select
                          value={editingData.category}
                          onChange={(e) => handleInputChange("category", e.target.value)}
                          className="inline-edit-select"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-left">{reagent.category}</span>
                      )}
                    </div>

                    {/* Date Opened */}
                    <div className="row-cell flex-[1]">
                      {editingRowId === reagent.chemical_id ? (
                        <input
                          type="date"
                          value={editingData.date_opened || ""}
                          onChange={(e) => handleInputChange("date_opened", e.target.value)}
                          className="inline-edit-input"
                        />
                      ) : (
                        <span className="text-left">
                          {formatDatePretty(reagent.date_opened) || "Not opened"}
                        </span>

                      )}
                    </div>

                    {/* Expiration Date */}
                    <div className="row-cell flex-[1]">
                      {editingRowId === reagent.chemical_id ? (
                        <input
                          type="date"
                          value={editingData.expiration_date || ""}
                          onChange={(e) =>
                            handleInputChange("expiration_date", e.target.value)
                          }
                          className="inline-edit-input"
                        />
                      ) : (
                        <span className="text-left">{formatDatePretty(reagent.expiration_date)}</span>
                      )}
                    </div>

                    {/* Container Size */}
                    <div className="row-cell flex-[0.8]">
                      {editingRowId === reagent.chemical_id ? (
                        <input
                          type="text"
                          value={editingData.container_size || ""}
                          onChange={(e) =>
                            handleInputChange("container_size", e.target.value)
                          }
                          className="inline-edit-input"
                        />
                      ) : (
                        <span className="text-left">{reagent.container_size}</span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="row-cell flex-[1]">
                      {editingRowId === reagent.chemical_id ? (
                        <select
                          value={editingData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="inline-edit-select"
                        >
                          {locations.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-left">{reagent.location}</span>
                      )}
                    </div>

                    {/* Status */}
                    <div className="row-cell flex-[1]">
                      {editingRowId === reagent.chemical_id ? (
                        <select
                          value={editingData.status}
                          onChange={(e) => handleInputChange("status", e.target.value)}
                          className="inline-edit-select"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`status-badge ${getStatusColor(reagent.status)}`}>
                          {reagent.status}
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
                            onClick={() => handleDelete(reagent.chemical_id)}
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
          )}

          {detailItem && (
            <DetailPopup
              item={detailItem}
              onClose={() => setDetailItem(null)}
              title="Chemical Reagent Details"
              fields={[
                // Identification
                { label: "Item Code", value: detailItem.itemcode },
                { label: "Category", value: detailItem.category },
                { label: "Brand", value: detailItem.brand },
                { label: "Form", value: detailItem.form },
                { label: "Container Type", value: detailItem.container_type },
                { label: "Container Size", value: detailItem.container_size },
                { label: "Quantity", value: detailItem.quantity },

                // racking & Inventory
                { label: "Date Received", value: detailItem.dateReceived },
                {
                  label: "Date Opened",
                  value: formatDatePretty(detailItem.date_opened) || "Not opened",
                },
                { label: "Expiration Date", value: formatDatePretty(detailItem.expiration_date) },
                { label: "Status", value: detailItem.status },
                { label: "Location", value: detailItem.location },

                // Safety & Compliance
                {
                  label: "MSDS",
                  value: detailItem.msds_available ? "Available" : "Not Available",
                },
                { label: "Disposal Method", value: detailItem.disposal_method },

                // Notes
                { label: "Remarks", value: detailItem.remarks },
              ]}
              onSave={(updatedFields) => {
                console.log("Updated fields:", updatedFields);
                // Save logic here 
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChemicalReagents;
