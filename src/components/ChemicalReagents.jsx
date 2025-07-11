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

const ChemicalReagents = () => {
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
  const [reagents, setReagents] = useState([
    {
      id: 1,
      chemicalName: "Lactic Acid 88% AR",
      itemcode: "LA-2025-001",
      category: "Lactic Acid",
      brand: "Loba Chemie Pvt.Ltd",
      quantity: "1",
      containerType: "Plastic Jar",
      containerSize: "500mL",
      form: "Liquid",
      dateReceived: "2024-02-23",
      dateOpened: "n.d.",
      expirationDate: "2028-12",
      location: "Table 2, Cabinet 4",
      status: "Unopened",
      remarks: "",
      msds: "",
      disposalMethod: "",
    },
  ]);

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

  const filteredReagents = reagents.filter((reagent) => {
    const matchesSearch =
      reagent.chemicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reagent.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reagent.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory.length === 0 || filterCategory.includes(reagent.category);
    const matchesStatus =
      filterStatus.length === 0 || filterStatus.includes(reagent.status);
    const matchesLocation =
      filterLocation.length === 0 || filterLocation.includes(reagent.location);

    const matchesExpiration =
      !filterExpirationMonth ||
      (reagent.expirationDate &&
        reagent.expirationDate.startsWith(filterExpirationMonth));

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

  const handleInlineEdit = (reagent) => {
    setEditingRowId(reagent.id);
    setEditingData({ ...reagent });
  };

  const handleSaveInlineEdit = () => {
    setReagents(
      reagents.map((reagent) =>
        reagent.id === editingRowId ? { ...editingData } : reagent
      )
    );
    setEditingRowId(null);
    setEditingData({});
  };

  const handleCancelInlineEdit = () => {
    setEditingRowId(null);
    setEditingData({});
  };

  const handleInputChange = (field, value) => {
    setEditingData({ ...editingData, [field]: value });
  };

  const handleViewDetails = (reagent) => {
    setDetailItem(reagent);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this chemical reagent?")
    ) {
      setReagents(reagents.filter((reagent) => reagent.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (editingItem) {
      setReagents(
        reagents.map((reagent) =>
          reagent.id === editingItem.id ? { ...reagent, ...formData } : reagent
        )
      );
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Opened":
        return "status-opened";
      case "Unopened":
        return "status-unopened";
      case "Expired Opened":
        return "status-expired-opened";
      case "Expired Unopened":
        return "status-expired-unopened";
      case "Expired Sealed":
        return "status-expired-sealed";
      default:
        return "";
    }
  };

  const categoryRef = useRef(null);
  const statusRef = useRef(null);
  const locationRef = useRef(null);
  const expirationRef = useRef(null);

  useEffect(() => {
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
      if (
        expirationRef.current &&
        !expirationRef.current.contains(event.target)
      ) {
        setShowExpirationFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <div className="table-body">
                {filteredReagents.map((reagent) => (
                  <div
                    key={reagent.id}
                    className={`table-row ${
                      editingRowId === reagent.id ? "editing-row" : ""
                    }`}
                  >
                    {/* Chemical Name */}
                    <div className="row-cell flex-[2]">
                      <div className="item-details">
                        <button
                          className="item-name"
                          onClick={() => handleViewDetails(reagent)}
                        >
                          {reagent.chemicalName}
                        </button>
                        <div className="item-brand">{reagent.brand}</div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="row-cell flex-[1.2]">
                      {editingRowId === reagent.id ? (
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
                        <span className="text-left">{reagent.category}</span>
                      )}
                    </div>

                    {/* Date Opened */}
                    <div className="row-cell flex-[1]">
                      {editingRowId === reagent.id ? (
                        <input
                          type="date"
                          value={editingData.dateOpened || ""}
                          onChange={(e) =>
                            handleInputChange("dateOpened", e.target.value)
                          }
                          className="inline-edit-input"
                        />
                      ) : (
                        <span className="text-left">
                          {reagent.dateOpened || "Not opened"}
                        </span>
                      )}
                    </div>

                    {/* Expiration Date */}
                    <div className="row-cell flex-[1]">
                      {editingRowId === reagent.id ? (
                        <input
                          type="date"
                          value={editingData.expirationDate}
                          onChange={(e) =>
                            handleInputChange("expirationDate", e.target.value)
                          }
                          className="inline-edit-input"
                        />
                      ) : (
                        <span className="text-left">
                          {reagent.expirationDate}
                        </span>
                      )}
                    </div>

                    {/* Container Size */}
                    <div className="row-cell flex-[0.8]">
                      {editingRowId === reagent.id ? (
                        <input
                          type="text"
                          value={editingData.containerSize}
                          onChange={(e) =>
                            handleInputChange("containerSize", e.target.value)
                          }
                          className="inline-edit-input"
                        />
                      ) : (
                        <span className="text-left">
                          {reagent.containerSize}
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="row-cell flex-[1]">
                      {editingRowId === reagent.id ? (
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
                        <span className="text-left">{reagent.location}</span>
                      )}
                    </div>

                    {/* Status */}
                    <div className="row-cell flex-[1]">
                      {editingRowId === reagent.id ? (
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
                            reagent.status
                          )}`}
                        >
                          {reagent.status}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="row-cell flex-[1]">
                      {editingRowId === reagent.id ? (
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
                            onClick={() => handleDelete(reagent.id)}
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
          )}

          {detailItem && (
            <DetailPopup
              item={detailItem}
              onClose={() => setDetailItem(null)}
              title="Chemical Reagent Details"
              fields={[
                { label: "Item Code", value: detailItem.itemcode },
                { label: "Category", value: detailItem.category },
                { label: "Brand", value: detailItem.brand },
                { label: "Form", value: detailItem.form },
                { label: "Container Type", value: detailItem.containerType },
                { label: "Container Size", value: detailItem.containerSize },
                { label: "Quantity", value: detailItem.quantity },
                { label: "Date Received", value: detailItem.dateReceived },
                {
                  label: "Date Opened",
                  value: detailItem.dateOpened || "Not opened",
                },
                { label: "Expiration Date", value: detailItem.expirationDate },
                { label: "Status", value: detailItem.status },
                { label: "Location", value: detailItem.location },
                { label: "MSDS", value: detailItem.msds },
                { label: "Disposal Method", value: detailItem.disposalMethod },
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
