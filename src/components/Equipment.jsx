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
import EquipmentForm from "./forms/EquipmentForm";
import DetailPopup from "./DetailPopup";

const API_URL = "http://localhost:5000/api/equipment";

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [filterLastMaintenance, setFilterLastMaintenance] = useState("");
  const [filterNextMaintenance, setFilterNextMaintenance] = useState("");
  const [filterLastCalibration, setFilterLastCalibration] = useState("");
  const [filterNextCalibration, setFilterNextCalibration] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showScheduleFilter, setShowScheduleFilter] = useState(null);

const formatDatePretty = (iso) => {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

  const locations = [
    "Left Side Table 2, Countertop",
    "Storage Room",
    "Main Laboratory",
    "Warehouse",
  ];

  const statuses = ["Working", "To be Fixed"];

  const locationRef = useRef(null);
  const statusRef = useRef(null);
  const lastMaintRef = useRef(null);
  const nextMaintRef = useRef(null);
  const lastCalibRef = useRef(null);
  const nextCalibRef = useRef(null);

  const fetchEquipment = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEquipment(data);
    } catch (err) {
      console.error("Fetch equipment error:", err);
    }
  };

  useEffect(() => {
    fetchEquipment();

    const handleClickOutside = (event) => {
      if (
        !locationRef.current?.contains(event.target) &&
        !statusRef.current?.contains(event.target) &&
        !lastMaintRef.current?.contains(event.target) &&
        !nextMaintRef.current?.contains(event.target) &&
        !lastCalibRef.current?.contains(event.target) &&
        !nextCalibRef.current?.contains(event.target)
      ) {
        setShowLocationFilter(false);
        setShowStatusFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.equipment_code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.model || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus.length === 0 || filterStatus.includes(item.status);
    const matchesLocation =
      filterLocation.length === 0 || filterLocation.includes(item.location);

    const dateFilter = (filter, date) =>
      !filter || (date && date.startsWith(filter));

    return (
      matchesSearch &&
      matchesStatus &&
      matchesLocation &&
      dateFilter(filterLastMaintenance, item.last_updated) &&
      dateFilter(filterNextMaintenance, item.maintenance_schedule) &&
      dateFilter(filterLastCalibration, item.last_calibration_date) &&
      dateFilter(filterNextCalibration, item.next_calibration_date)
    );
  });


  const handleFilterChange = (type, value, checked) => {
    const updater = (prev) =>
      checked ? [...prev, value] : prev.filter((i) => i !== value);
    if (type === "status") setFilterStatus(updater);
    if (type === "location") setFilterLocation(updater);
  };

  const getStatusColor = (status) => {
    return status === "Working"
      ? "status-working"
      : status === "To be Fixed"
      ? "status-tobefixed"
      : "";
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleInlineEdit = (item) => {
    setEditingRowId(item.equipment_id);
    setEditingData({ ...item });
  };

  const handleSaveInlineEdit = async () => {
    const payload = {
      ...editingData,
      manual_available: editingData.manual_available ? 1 : 0,
    };

    const res = await fetch(`${API_URL}/${editingRowId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchEquipment();
      setEditingRowId(null);
      setEditingData({});
    } else {
      console.error("Update failed", await res.text());
    }
  };

  const handleCancelInlineEdit = () => {
    setEditingRowId(null);
    setEditingData({});
  };

  const handleInputChange = (field, value) => {
    setEditingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleViewDetails = (item) => {
    setDetailItem(item);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchEquipment();
      else console.error(await res.text());
    }
  };

  const handleSave = async (formData) => {
    const payload = {
      ...formData,
      manual_available: formData.manual_available ? 1 : 0,
    };

    const method = editingItem ? "PUT" : "POST";
    const url = editingItem
      ? `${API_URL}/${editingItem.equipment_id}`
      : API_URL;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchEquipment();
      setShowForm(false);
      setEditingItem(null);
    } else {
      console.error("Save failed", await res.text());
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="equipment-page">
      <div className="content-section">
        <div className="content-card">
          <div className="section-header">
            <h1 className="font-marcellus">Equipment Inventory</h1>
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
              Add Equipment
            </button>
          </div>

          {showForm ? (
            <div className="form-container">
              <div className="form-header">
                <h2>{editingItem ? "Edit Equipment" : "Add Equipment"}</h2>
              </div>
              <EquipmentForm
                initialData={editingItem}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          ) : (
            <div className="modern-table">
              <div className="table-header">
                <div className="header-cell">
                  <span>Equipment</span>
                </div>
                <div className="header-cell">
                  <span>Code</span>
                </div>
                <div className="header-cell">
                  <span>Model</span>
                </div>
                <div className="header-cell filter-header" ref={locationRef}>
                  <div
                    onClick={() => {
                      setShowStatusFilter(false);
                      setShowScheduleFilter(null);
                      setShowLocationFilter((prev) => !prev);
                    }}
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
                            onChange={(e) => {
                              handleFilterChange(
                                "location",
                                location,
                                e.target.checked
                              );
                              closeAllFilters();
                            }}
                          />
                          <span>{location}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="header-cell filter-header" ref={lastMaintRef}>
                  <div
                    onClick={() =>
                      setShowScheduleFilter(
                        showScheduleFilter === "Last Maint."
                          ? null
                          : "Last Maint."
                      )
                    }
                  >
                    <span>Last Maint.</span>
                    <ChevronDown
                      size={16}
                      className={`filter-arrow ${
                        showScheduleFilter === "Last Maint." ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {showScheduleFilter === "Last Maint." && (
                    <div
                      className="filter-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="month"
                        value={filterLastMaintenance}
                        onChange={(e) => {
                          setFilterLastMaintenance(e.target.value);
                          setShowScheduleFilter(null);
                        }}
                        className="month-input"
                      />
                    </div>
                  )}
                </div>

                <div className="header-cell filter-header" ref={nextMaintRef}>
                  <div
                    onClick={() =>
                      setShowScheduleFilter(
                        showScheduleFilter === "Next Maint."
                          ? null
                          : "Next Maint."
                      )
                    }
                  >
                    <span>Next Maint.</span>
                    <ChevronDown
                      size={16}
                      className={`filter-arrow ${
                        showScheduleFilter === "Next Maint." ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {showScheduleFilter === "Next Maint." && (
                    <div
                      className="filter-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="month"
                        value={filterNextMaintenance}
                        onChange={(e) => {
                          setFilterNextMaintenance(e.target.value);
                          setShowScheduleFilter(null);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="header-cell filter-header" ref={lastCalibRef}>
                  <div
                    onClick={() =>
                      setShowScheduleFilter(
                        showScheduleFilter === "Last Calib."
                          ? null
                          : "Last Calib."
                      )
                    }
                  >
                    <span>Last Calib.</span>
                    <ChevronDown
                      size={16}
                      className={`filter-arrow ${
                        showScheduleFilter === "Last Calib." ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {showScheduleFilter === "Last Calib." && (
                    <div
                      className="filter-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="month"
                        value={filterLastCalibration}
                        onChange={(e) => {
                          setFilterLastCalibration(e.target.value);
                          setShowScheduleFilter(null);
                        }}
                        className="month-input"
                      />
                    </div>
                  )}
                </div>

                <div className="header-cell filter-header" ref={nextCalibRef}>
                  <div
                    onClick={() =>
                      setShowScheduleFilter(
                        showScheduleFilter === "Next Calib."
                          ? null
                          : "Next Calib."
                      )
                    }
                  >
                    <span>Next Calib.</span>
                    <ChevronDown
                      size={16}
                      className={`filter-arrow ${
                        showScheduleFilter === "Next Calib." ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {showScheduleFilter === "Next Calib." && (
                    <div
                      className="filter-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="month"
                        value={filterNextCalibration}
                        onChange={(e) => {
                          setFilterNextCalibration(e.target.value);
                          setShowScheduleFilter(null);
                        }}
                        className="month-input"
                      />
                    </div>
                  )}
                </div>

                <div
                  className="header-cell filter-header"
                  ref={statusRef}
                  onClick={() => {
                    setShowStatusFilter((prev) => !prev);
                    setShowLocationFilter(false);
                    setShowScheduleFilter(null);
                  }}
                >
                  <span>Status</span>
                  <ChevronDown
                    size={16}
                    className={`filter-arrow ${
                      showStatusFilter ? "rotated" : ""
                    }`}
                  />
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
                            onChange={(e) => {
                              handleFilterChange(
                                "status",
                                status,
                                e.target.checked
                              );
                              closeAllFilters();
                            }}
                          />
                          <span>{status}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="header-cell">
                  <span>Actions</span>
                </div>
              </div>
              <div className="table-scroll-body">
              <div className="table-body">
              {filteredEquipment.map((item) => (
                <div
                  key={item.equipment_id}
                  className={`table-row ${
                    editingRowId === item.equipment_id ? "editing-row" : ""
                  }`}
                >
                  {/* Equipment Name */}
                  <div className="row-cell">
                    <div className="item-details">
                      <button
                        className="item-name"
                        onClick={() => handleViewDetails(item)}
                      >
                        {item.name}
                      </button>
                    </div>
                  </div>

                  {/* Code */}
                  <div className="row-cell">{item.equipment_code}</div>

                  {/* Model */}
                  <div className="row-cell">
                    {editingRowId === item.equipment_id ? (
                      <input
                        type="text"
                        value={editingData.model}
                        onChange={(e) =>
                          handleInputChange("model", e.target.value)
                        }
                        className="inline-edit-input"
                      />
                    ) : (
                      item.model
                    )}
                  </div>

                  {/* Location */}
                  <div className="row-cell">
                    {editingRowId === item.equipment_id ? (
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

                  {/* Last Maintenance */}
                  <div className="row-cell">
                    {editingRowId === item.equipment_id ? (
                      <input
                        type="date"
                        value={editingData.last_updated || ""}
                        onChange={(e) =>
                          handleInputChange("last_updated", e.target.value)
                        }
                        className="inline-edit-input"
                      />
                    ) : (
                      formatDatePretty(item.last_updated)
                    )}
                  </div>

                  {/* Next Maintenance */}
                  <div className="row-cell">
                    {editingRowId === item.equipment_id ? (
                      <input
                        type="date"
                        value={editingData.maintenance_schedule || ""}
                        onChange={(e) =>
                          handleInputChange("maintenance_schedule", e.target.value)
                        }
                        className="inline-edit-input"
                      />
                    ) : (
                      formatDatePretty(item.maintenance_schedule)
                    )}
                  </div>

                  {/* Last Calibration */}
                  <div className="row-cell">
                    {editingRowId === item.equipment_id ? (
                      <input
                        type="date"
                        value={editingData.last_calibration_date || ""}
                        onChange={(e) =>
                          handleInputChange("last_calibration_date", e.target.value)
                        }
                        className="inline-edit-input"
                      />
                    ) : (
                      formatDatePretty(item.last_calibration_date)
                    )}
                  </div>

                  {/* Next Calibration */}
                  <div className="row-cell">
                    {editingRowId === item.equipment_id ? (
                      <input
                        type="date"
                        value={editingData.next_calibration_date || ""}
                        onChange={(e) =>
                          handleInputChange("next_calibration_date", e.target.value)
                        }
                        className="inline-edit-input"
                      />
                    ) : (
                      formatDatePretty(item.next_calibration_date)
                    )}
                  </div>

                  {/* Status */}
                  <div className="row-cell">
                    {editingRowId === item.equipment_id ? (
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
                      <span className={`status-badge ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="row-cell">
                    {editingRowId === item.equipment_id ? (
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
                          onClick={() => handleDelete(item.equipment_id)}
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
            title="Equipment Details"
            fields={[
              // Identification
              { label: "Equipment Code", value: detailItem.equipment_code },
              { label: "Name", value: detailItem.name },
              { label: "Other Name", value: detailItem.other_name },
              { label: "Brand", value: detailItem.brand },
              { label: "Model", value: detailItem.model },
              { label: "Serial No.", value: detailItem.serial_no },

              // Classification
              { label: "Other Details", value: detailItem.other_details },
              { label: "Status", value: detailItem.status },
              { label: "Remarks", value: detailItem.remarks },

              // Location & Tracking
              { label: "Location", value: detailItem.location },
              {
                label: "Date Received",
                value: formatDatePretty(detailItem.date_received),
              },

              // Maintenance & Calibration
              {
                label: "Last Maintenance",
                value: formatDatePretty(detailItem.last_updated),
              },
              {
                label: "Next Maintenance",
                value: formatDatePretty(detailItem.maintenance_schedule),
              },
              {
                label: "Last Calibration",
                value: formatDatePretty(detailItem.last_calibration_date),
              },
              {
                label: "Next Calibration",
                value: formatDatePretty(detailItem.next_calibration_date),
              },

              // Procurement
              { label: "PO No.", value: detailItem.po_no },
              {
                label: "Purchase Price",
                value: `₱${Number(detailItem.purchase_price || 0).toFixed(2)}`,
              },
              { label: "Fund Source", value: detailItem.fund_source },
              { label: "Supplier", value: detailItem.supplier },
              {
                label: "Supplier Contact",
                value: detailItem.supplier_contact,
              },

              // Attachment
              {
                label: "Manual Available",
                value: detailItem.manual_available ? "Yes" : "No",
              },
            ]}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default Equipment;