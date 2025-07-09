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
import InstrumentForm from "./forms/InstrumentForm";
import DetailPopup from "./DetailPopup";

const Instruments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterCondition, setFilterCondition] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [showFilters, setShowFilters] = useState({
    location: false,
    status: false,
    condition: false,
  });
  const [instruments, setInstruments] = useState([
    {
      id: 1,
      instrument: "1000 mL Rotary Flask",
      description: "Glassware",
      location: "Table 2, Cabinet 2",
      quantity: "1 pc",
      capacity: "1000 mL",
      status: "Broken",
      condition: "Poor",
      remarks: "For Disposal",
    },
  ]);

  const statuses = [
    "Opened",
    "Unused",
    "Sealed",
    "Tip Chipped",
    "Unopened",
    "Broken",
  ];
  const conditions = ["Good", "Poor"];
  const locations = [
    "Lab Room 1",
    "Lab Room 2",
    "Instrument Room",
    "Storage",
    "Calibration Lab",
    "Table 2, Cabinet 2",
  ];

  const filterRefs = {
    location: useRef(null),
    status: useRef(null),
    condition: useRef(null),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(filterRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowFilters((prev) => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredInstruments = instruments.filter((item) => {
    const matchesSearch =
      item.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus.length === 0 || filterStatus.includes(item.status);
    const matchesCondition =
      filterCondition.length === 0 || filterCondition.includes(item.condition);
    const matchesLocation =
      filterLocation.length === 0 || filterLocation.includes(item.location);

    return (
      matchesSearch && matchesStatus && matchesCondition && matchesLocation
    );
  });

  const handleFilterChange = (filterType, value, checked) => {
    switch (filterType) {
      case "status":
        setFilterStatus((prev) =>
          checked ? [...prev, value] : prev.filter((v) => v !== value)
        );
        break;
      case "condition":
        setFilterCondition((prev) =>
          checked ? [...prev, value] : prev.filter((v) => v !== value)
        );
        break;
      case "location":
        setFilterLocation((prev) =>
          checked ? [...prev, value] : prev.filter((v) => v !== value)
        );
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Opened":
        return "status-opened";
      case "Unused":
        return "status-expired-sealed";
      case "Sealed":
        return "status-unopened";
      case "Tip Chipped":
        return "status-expired-opened";
      case "Unopened":
        return "status-unopened";
      case "Broken":
        return "status-expired-unopened";
      default:
        return "";
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case "Good":
        return "status-opened";
      case "Poor":
        return "status-expired-unopened";
      default:
        return "";
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleInlineEdit = (item) => {
    setEditingRowId(item.id);
    setEditingData({ ...item });
  };

  const handleSaveInlineEdit = () => {
    setInstruments(
      instruments.map((item) =>
        item.id === editingRowId ? { ...editingData } : item
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

  const handleViewDetails = (item) => {
    setDetailItem(item);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this instrument?")) {
      setInstruments(instruments.filter((item) => item.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (editingItem) {
      setInstruments(
        instruments.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
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

  return (
    <div className="content-section">
      <div className="content-card">
        <div className="section-header">
          <h1 className="font-marcellus">Instruments Inventory</h1>
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
            Add Instrument
          </button>
        </div>

        {showForm ? (
          <div className="form-container">
            <div className="form-header">
              <h2>{editingItem ? "Edit Instrument" : "Add Instrument"}</h2>
            </div>
            <InstrumentForm
              initialData={editingItem}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <div className="modern-table instruments-table">
            <div className="table-header">
              <div className="header-cell">
                <span>Instrument</span>
              </div>
              <div className="header-cell">
                <span>Quantity</span>
              </div>
              <div className="header-cell">
                <span>Description</span>
              </div>
              <div
                className="header-cell filter-header"
                ref={filterRefs.location}
                onClick={() =>
                  setShowFilters((prev) => ({
                    ...prev,
                    location: !prev.location,
                  }))
                }
              >
                <span>Location</span>
                <ChevronDown
                  size={16}
                  className={`filter-arrow ${
                    showFilters.location ? "rotated" : ""
                  }`}
                />
                {showFilters.location && (
                  <div className="filter-dropdown">
                    {locations.map((loc) => (
                      <label key={loc} className="filter-option">
                        <input
                          type="checkbox"
                          checked={filterLocation.includes(loc)}
                          onChange={(e) =>
                            handleFilterChange(
                              "location",
                              loc,
                              e.target.checked
                            )
                          }
                        />
                        <span>{loc}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div
                className="header-cell filter-header"
                ref={filterRefs.status}
                onClick={() =>
                  setShowFilters((prev) => ({
                    ...prev,
                    status: !prev.status,
                  }))
                }
              >
                <span>Status</span>
                <ChevronDown
                  size={16}
                  className={`filter-arrow ${
                    showFilters.status ? "rotated" : ""
                  }`}
                />
                {showFilters.status && (
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
              <div
                className="header-cell filter-header"
                ref={filterRefs.condition}
                onClick={() =>
                  setShowFilters((prev) => ({
                    ...prev,
                    condition: !prev.condition,
                  }))
                }
              >
                <span>Condition</span>
                <ChevronDown
                  size={16}
                  className={`filter-arrow ${
                    showFilters.condition ? "rotated" : ""
                  }`}
                />
                {showFilters.condition && (
                  <div className="filter-dropdown">
                    {conditions.map((cond) => (
                      <label key={cond} className="filter-option">
                        <input
                          type="checkbox"
                          checked={filterCondition.includes(cond)}
                          onChange={(e) =>
                            handleFilterChange(
                              "condition",
                              cond,
                              e.target.checked
                            )
                          }
                        />
                        <span>{cond}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="header-cell">
                <span>Actions</span>
              </div>
            </div>

            <div className="table-body">
              {filteredInstruments.map((item) => (
                <div
                  key={item.id}
                  className={`table-row ${
                    editingRowId === item.id ? "editing-row" : ""
                  }`}
                >
                  <div className="row-cell">
                    <div className="item-details">
                      <button
                        className="item-name"
                        onClick={() => handleViewDetails(item)}
                      >
                        {item.instrument}
                      </button>
                    </div>
                  </div>
                  <div className="row-cell">
                    {editingRowId === item.id ? (
                      <input
                        type="number"
                        value={editingData.quantity}
                        onChange={(e) =>
                          handleInputChange("quantity", e.target.value)
                        }
                        className="inline-edit-input"
                      />
                    ) : (
                      item.quantity
                    )}
                  </div>
                  <div className="row-cell">{item.description}</div>
                  <div className="row-cell">
                    {editingRowId === item.id ? (
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
                      item.location
                    )}
                  </div>

                  <div className="row-cell">
                    {editingRowId === item.id ? (
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
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                  <div className="row-cell">
                    {editingRowId === item.id ? (
                      <select
                        value={editingData.condition}
                        onChange={(e) =>
                          handleInputChange("condition", e.target.value)
                        }
                        className="inline-edit-select"
                      >
                        {conditions.map((condition) => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`status-badge ${getConditionColor(
                          item.condition
                        )}`}
                      >
                        {item.condition}
                      </span>
                    )}
                  </div>
                  <div className="row-cell">
                    {editingRowId === item.id ? (
                      <div className="editing-actions">
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
                          className="btn-icon"
                          onClick={() => handleInlineEdit(item)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDelete(item.id)}
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
            title="Instrument Details"
            fields={[
              // Identification
              { label: "Description", value: detailItem.description },

              // Specifications
              { label: "Capacity", value: detailItem.capacity },
              { label: "Quantity", value: detailItem.quantity },

              // Status & Condition
              { label: "Status", value: detailItem.status },
              { label: "Condition", value: detailItem.condition },

              // Location & Notes
              { label: "Location", value: detailItem.location },
              { label: "Remarks", value: detailItem.remarks },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Instruments;
