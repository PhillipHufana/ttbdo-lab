import { useState } from "react";
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
      chemicalName: "Sodium Chloride",
      category: "Salt",
      brand: "Sigma-Aldrich",
      quantity: "500g",
      containerType: "Bottle",
      containerSize: "500ml",
      form: "Solid",
      dateReceived: "2024-01-15",
      expirationDate: "2025-01-15",
      dateOpened: "2024-02-01",
      location: "Cabinet A1",
      msds: "MSDS-001",
      hazardLevel: "Low",
      disposalMethod: "Standard waste",
      status: "In Use",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      chemicalName: "Hydrochloric Acid",
      category: "Acid",
      brand: "Fisher Scientific",
      quantity: "1L",
      containerType: "Bottle",
      containerSize: "1L",
      form: "Liquid",
      dateReceived: "2024-01-10",
      expirationDate: "2024-12-10",
      dateOpened: null,
      location: "Fume Hood B",
      msds: "MSDS-002",
      hazardLevel: "High",
      disposalMethod: "Acid neutralization",
      status: "Available",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      chemicalName: "Ethanol",
      category: "Solvent",
      brand: "Merck",
      quantity: "2.5L",
      containerType: "Bottle",
      containerSize: "2.5L",
      form: "Liquid",
      dateReceived: "2024-02-01",
      expirationDate: "2025-02-01",
      dateOpened: "2024-02-15",
      location: "Cabinet C2",
      msds: "MSDS-003",
      hazardLevel: "Medium",
      disposalMethod: "Solvent recovery",
      status: "Low Stock",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]);

  const categories = ["Salt", "Acid", "Base", "Solvent", "Indicator", "Buffer"];
  const statuses = ["Available", "In Use", "Low Stock", "Expired", "Disposed"];
  const locations = [
    "Cabinet A1",
    "Cabinet A2",
    "Cabinet B1",
    "Cabinet B2",
    "Cabinet C1",
    "Cabinet C2",
    "Fume Hood A",
    "Fume Hood B",
  ];

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

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

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
    } else {
      const newReagent = {
        id: Date.now(),
        image: "/placeholder.svg?height=200&width=200",
        ...formData,
      };
      setReagents([...reagents, newReagent]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFilterChange = (filterType, value, checked) => {
    switch (filterType) {
      case "category":
        setFilterCategory((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        break;
      case "status":
        setFilterStatus((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        break;
      case "location":
        setFilterLocation((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "status-available";
      case "In Use":
        return "status-in-use";
      case "Low Stock":
        return "status-low-stock";
      case "Expired":
        return "status-expired";
      case "Disposed":
        return "status-disposed";
      default:
        return "";
    }
  };

  return (
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
                {editingItem ? "Edit Chemical Reagent" : "Add Chemical Reagent"}
              </h2>
            </div>
            <ChemicalReagentForm
              initialData={editingItem}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          // ✅ FULL CODE (with new columns added)

          <div className="modern-table">
            <div className="table-header">
              {/* Existing Headers */}
              <div className="header-cell">
                <span className="text-center">Chemical Name</span>
              </div>
              <div
                className="header-cell filter-header"
                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              >
                <span className="text-center">Category</span>
                <ChevronDown
                  size={16}
                  className={`filter-arrow ${
                    showCategoryFilter ? "rotated" : ""
                  }`}
                />
                {showCategoryFilter && (
                  <div className="filter-dropdown">
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
              <div className="header-cell">
                <span className="text-center">Expiration Date</span>
              </div>
              <div className="header-cell">
                <span className="text-center">Container Size</span>
              </div>
              <div
                className="header-cell filter-header"
                onClick={() => setShowLocationFilter(!showLocationFilter)}
              >
                <span className="text-center">Location</span>
                <ChevronDown
                  size={16}
                  className={`filter-arrow ${
                    showLocationFilter ? "rotated" : ""
                  }`}
                />
                {showLocationFilter && (
                  <div className="filter-dropdown">
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
              <div
                className="header-cell filter-header"
                onClick={() => setShowStatusFilter(!showStatusFilter)}
              >
                <span className="text-center">Status</span>
                <ChevronDown
                  size={16}
                  className={`filter-arrow ${
                    showStatusFilter ? "rotated" : ""
                  }`}
                />
                {showStatusFilter && (
                  <div className="filter-dropdown">
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
                      <span className="text-left">{reagent.containerSize}</span>
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
              { label: "Chemical Name", value: detailItem.chemicalName },
              { label: "Category", value: detailItem.category },
              { label: "Brand", value: detailItem.brand },
              { label: "Quantity", value: detailItem.quantity },
              { label: "Container Type", value: detailItem.containerType },
              { label: "Container Size", value: detailItem.containerSize },
              { label: "Form", value: detailItem.form },
              { label: "Date Received", value: detailItem.dateReceived },
              { label: "Expiration Date", value: detailItem.expirationDate },
              {
                label: "Date Opened",
                value: detailItem.dateOpened || "Not opened",
              },
              { label: "Location", value: detailItem.location },
              { label: "MSDS", value: detailItem.msds },
              { label: "Hazard Level", value: detailItem.hazardLevel },
              { label: "Disposal Method", value: detailItem.disposalMethod },
              { label: "Status", value: detailItem.status },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default ChemicalReagents;
