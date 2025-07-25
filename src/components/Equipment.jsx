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

  // Filters
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [filterLastMaintenance, setFilterLastMaintenance] = useState("");
  const [filterLastCalibration, setFilterLastCalibration] = useState("");
  const [filterNextMaintenanceStatus, setFilterNextMaintenanceStatus] =
    useState("");
  const [filterNextCalibrationStatus, setFilterNextCalibrationStatus] =
    useState("");

  // UI toggles
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showScheduleFilter, setShowScheduleFilter] = useState(null);

  // Lists for filter options
  const [statusList, setStatusList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const locationRef = useRef(null);
  const statusRef = useRef(null);
  const lastMaintRef = useRef(null);
  const nextMaintRef = useRef(null);
  const lastCalibRef = useRef(null);
  const nextCalibRef = useRef(null);

  const normalize = (val) => (val || "").toLowerCase().trim();

  // Helpers
  const formatDatePretty = (iso) => {
    if (!iso) return "N/A";
    const date = new Date(iso);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const matchesUpcomingCategory = (dateValue, category) => {
    if (!category) return true;
    if (!dateValue) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(dateValue);
    if (isNaN(target.getTime())) return false;
    target.setHours(0, 0, 0, 0);

    const diffDays = (target - today) / (1000 * 60 * 60 * 24);

    if (category === "Overdue") return target < today;
    if (category === "Due Soon") return diffDays > 0 && diffDays <= 30;
    if (category === "On Track") return diffDays > 30;

    return true; // Fallback
  };

  const getStatusColor = (status) => {
    return status === "Working"
      ? "status-working"
      : status === "To be fixed"
      ? "status-tobefixed"
      : "";
  };

  // Extra helpers
  const isOverdue = (dateStr) => {
    if (!dateStr) return false;
    const target = new Date(dateStr);
    if (isNaN(target.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize
    return target < today;
  };

  const isDueSoon = (dateStr) => {
    if (!dateStr) return false;
    const target = new Date(dateStr);
    if (isNaN(target.getTime())) return false;
    const today = new Date();
    const diffDays = (target - today) / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 30;
  };

  // Fetch Data
  const fetchEquipment = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEquipment(data);

      const statusMap = {};
      data.forEach((item) => {
        if (item.status) {
          const key = item.status.trim().toLowerCase();
          if (!statusMap[key]) {
            statusMap[key] = item.status.trim();
          }
        }
      });
      setStatusList(Object.values(statusMap));

      const locationMap = {};
      data.forEach((item) => {
        if (item.location) {
          const key = item.location.trim().toLowerCase();
          if (!locationMap[key]) {
            locationMap[key] = item.location.trim();
          }
        }
      });
      setLocationList(Object.values(locationMap));
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
        closeAllFilters();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllFilters = () => {
    setShowLocationFilter(false);
    setShowStatusFilter(false);
    setShowScheduleFilter(null);
  };

  // Filtering
  const filteredEquipment = equipment.filter((item) => {
    const name = normalize(item.name);
    const code = normalize(item.equipment_code);
    const location = normalize(item.location);
    const model = normalize(item.model);
    const status = normalize(item.status);
    const search = normalize(searchTerm);

    const matchesSearch =
      name.includes(search) ||
      code.includes(search) ||
      location.includes(search) ||
      model.includes(search);

    const matchesStatus =
      filterStatus.length === 0 ||
      filterStatus.some((f) => normalize(f) === status);

    const matchesLocation =
      filterLocation.length === 0 ||
      filterLocation.some((f) => normalize(f) === location);

    const dateFilter = (filter, date) =>
      !filter || (date && normalize(date).startsWith(normalize(filter)));

    return (
      matchesSearch &&
      matchesStatus &&
      matchesLocation &&
      dateFilter(filterLastMaintenance, item.last_updated) &&
      dateFilter(filterLastCalibration, item.last_calibration_date) &&
      matchesUpcomingCategory(
        item.maintenance_schedule,
        filterNextMaintenanceStatus
      ) &&
      matchesUpcomingCategory(
        item.next_calibration_date,
        filterNextCalibrationStatus
      )
    );
  });

  const toTitleCase = (str) =>
    (str || "").replace(
      /\w\S*/g,
      (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase()
    );

  // Handlers
  const handleFilterChange = (type, value, checked) => {
    const updater = (prev) =>
      checked ? [...prev, value] : prev.filter((i) => i !== value);
    if (type === "status") setFilterStatus(updater);
    if (type === "location") setFilterLocation(updater);
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
    const payload = { ...editingData };
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

  const handleViewDetails = (item) => setDetailItem(item);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchEquipment();
      else console.error(await res.text());
    }
  };

  const handleSave = (saved) => {
    console.log("Parent got:", saved);
    setEquipment((prev) => [...prev, saved]);
    setShowForm(false);
    setEditingItem(null);
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
                statusList={statusList}
                setStatusList={setStatusList}
                locationList={locationList}
                setLocationList={setLocationList}
              />
            </div>
          ) : (
            <div className="table-responsive">
              <div className="modern-table">
                <div className="table-header">
                  <div className="header-cell">
                    <span>Equipment</span>
                  </div>
                  <div className="header-cell hide-mobile">
                    <span>Code</span>
                  </div>
                  <div className="header-cell hide-mobile">
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
                        {locationList.map((loc, i) => (
                          <label
                            key={`filter-location-${loc}-${i}`}
                            className="filter-option"
                          >
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
                            {toTitleCase(loc.trim())}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="header-cell filter-header hide-mobile"
                    ref={lastMaintRef}
                  >
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
                        {["Overdue", "Due Soon", "On Track"].map((option) => (
                          <label key={option} className="filter-option">
                            <input
                              type="checkbox"
                              checked={filterNextMaintenanceStatus === option}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilterNextMaintenanceStatus(option);
                                } else {
                                  // unchecking clears
                                  setFilterNextMaintenanceStatus("");
                                }
                                setShowScheduleFilter(null);
                              }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="header-cell filter-header hide-mobile"
                    ref={lastCalibRef}
                  >
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
                        {["Overdue", "Due Soon", "On Track"].map((option) => (
                          <label key={option} className="filter-option">
                            <input
                              type="checkbox"
                              checked={filterNextCalibrationStatus === option}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilterNextCalibrationStatus(option);
                                } else {
                                  // unchecking clears
                                  setFilterNextCalibrationStatus("");
                                }
                                setShowScheduleFilter(null);
                              }}
                            />
                            {option}
                          </label>
                        ))}
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
                        {statusList.map((status, i) => (
                          <label
                            key={`filter-status-${status}-${i}`}
                            className="filter-option"
                          >
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
                            {toTitleCase(status.trim())}
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
                    {filteredEquipment
                      .sort((a, b) => {
                        const aName = a.name?.trim() || "";
                        const bName = b.name?.trim() || "";
                        if (!aName && !bName) return 0;
                        if (!aName) return 1;
                        if (!bName) return -1;
                        return aName.localeCompare(bName);
                      })
                      .map((item) => (
                        <div
                          key={item.equipment_id}
                          className={`table-row ${
                            editingRowId === item.equipment_id
                              ? "editing-row"
                              : ""
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
                              <div className="item-brand">{item.brand}</div>
                            </div>
                          </div>

                          {/* Code */}
                          <div className="row-cell hide-mobile">
                            {item.equipment_code}
                          </div>

                          {/* Model */}
                          <div className="row-cell hide-mobile">
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
                          <div className="row-cell" data-label="Location">
                            {editingRowId === item.equipment_id ? (
                              <select
                                value={editingData.location}
                                onChange={(e) =>
                                  handleInputChange("location", e.target.value)
                                }
                                className="inline-edit-select"
                              >
                                {[...new Set(locationList)]
                                  .filter(Boolean)
                                  .map((loc, i) => (
                                    <option
                                      key={`option-location-${loc}-${i}`}
                                      value={loc}
                                    >
                                      {loc}
                                    </option>
                                  ))}
                              </select>
                            ) : (
                              item.location
                            )}
                          </div>

                          {/* Last Maintenance */}
                          <div className="row-cell hide-mobile">
                            {editingRowId === item.equipment_id ? (
                              <input
                                type="date"
                                value={editingData.last_updated || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "last_updated",
                                    e.target.value
                                  )
                                }
                                className="inline-edit-input"
                              />
                            ) : (
                              formatDatePretty(item.last_updated)
                            )}
                          </div>

                          {/* Next Maintenance */}
                          <div className="row-cell" data-label="Next Maint.">
                            {editingRowId === item.equipment_id ? (
                              <input
                                type="date"
                                value={editingData.maintenance_schedule || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "maintenance_schedule",
                                    e.target.value
                                  )
                                }
                                className="inline-edit-input"
                              />
                            ) : (
                              <span
                                className={`expiration-badge ${
                                  isOverdue(item.maintenance_schedule)
                                    ? "exp-overdue"
                                    : isDueSoon(item.maintenance_schedule)
                                    ? "exp-due-soon"
                                    : "exp-on-track"
                                }`}
                              >
                                {formatDatePretty(item.maintenance_schedule) ||
                                  "—"}
                              </span>
                            )}
                          </div>

                          {/* Last Calibration */}
                          <div className="row-cell hide-mobile">
                            {editingRowId === item.equipment_id ? (
                              <input
                                type="date"
                                value={editingData.last_calibration_date || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "last_calibration_date",
                                    e.target.value
                                  )
                                }
                                className="inline-edit-input"
                              />
                            ) : (
                              formatDatePretty(item.last_calibration_date)
                            )}
                          </div>

                          {/* Next Calibration */}
                          <div className="row-cell" data-label="Next Calib.">
                            {editingRowId === item.equipment_id ? (
                              <input
                                type="date"
                                value={editingData.next_calibration_date || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "next_calibration_date",
                                    e.target.value
                                  )
                                }
                                className="inline-edit-input"
                              />
                            ) : (
                              <span
                                className={`expiration-badge ${
                                  isOverdue(item.next_calibration_date)
                                    ? "exp-overdue"
                                    : isDueSoon(item.next_calibration_date)
                                    ? "exp-due-soon"
                                    : "exp-on-track"
                                }`}
                              >
                                {formatDatePretty(item.next_calibration_date) ||
                                  "—"}
                              </span>
                            )}
                          </div>

                          {/* Status */}
                          <div className="row-cell" data-label="Status">
                            {editingRowId === item.equipment_id ? (
                              <select
                                value={editingData.status}
                                onChange={(e) =>
                                  handleInputChange("status", e.target.value)
                                }
                                className="inline-edit-select"
                              >
                                {[...new Set(statusList)]
                                  .filter(Boolean)
                                  .map((status, i) => (
                                    <option
                                      key={`option-status-${status}-${i}`}
                                      value={status}
                                    >
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
                                  onClick={() =>
                                    handleDelete(item.equipment_id)
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
              title="Equipment Details"
              onSave={async (formData) => {
                try {
                  const res = await fetch(
                    `${API_URL}/${detailItem.equipment_id}`,
                    {
                      method: "PUT",
                      body: formData, // contains file + other fields
                    }
                  );

                  if (res.ok) {
                    await fetchEquipment();
                    setDetailItem(null);
                  } else {
                    console.error("Save failed", await res.text());
                  }
                } catch (err) {
                  console.error("Detail save error:", err);
                }
              }}
              fields={[
                {
                  label: "Name",
                  value: detailItem.name,
                  name: "name",
                  type: "text",
                },
                {
                  label: "Equipment Code",
                  value: detailItem.equipment_code,
                  name: "equipment_code",
                  type: "text",
                },
                {
                  label: "Other Name",
                  value: detailItem.other_name,
                  name: "other_name",
                  type: "text",
                },
                {
                  label: "Brand",
                  value: detailItem.brand,
                  name: "brand",
                  type: "text",
                },
                {
                  label: "Model",
                  value: detailItem.model,
                  name: "model",
                  type: "text",
                },
                {
                  label: "Serial No.",
                  value: detailItem.serial_no,
                  name: "serial_no",
                  type: "text",
                },
                {
                  label: "Other Details",
                  value: detailItem.other_details,
                  name: "other_details",
                  type: "text",
                },
                {
                  label: "Status",
                  value: detailItem.status,
                  name: "status",
                  type: "text",
                },
                {
                  label: "Remarks",
                  value: detailItem.remarks,
                  name: "remarks",
                  type: "text",
                },
                {
                  label: "Location",
                  value: detailItem.location,
                  name: "location",
                  type: "text",
                },
                {
                  label: "Date Received",
                  value: detailItem.date_received,
                  name: "date_received",
                  type: "date",
                },
                {
                  label: "Last Maintenance",
                  value: detailItem.last_updated,
                  name: "last_updated",
                  type: "date",
                },
                {
                  label: "Next Maintenance",
                  value: detailItem.maintenance_schedule,
                  name: "maintenance_schedule",
                  type: "date",
                },
                {
                  label: "Last Calibration",
                  value: detailItem.last_calibration_date,
                  name: "last_calibration_date",
                  type: "date",
                },
                {
                  label: "Next Calibration",
                  value: detailItem.next_calibration_date,
                  name: "next_calibration_date",
                  type: "date",
                },
                {
                  label: "PO No.",
                  value: detailItem.po_no,
                  name: "po_no",
                  type: "text",
                },
                {
                  label: "Purchase Price",
                  value: String(detailItem.purchase_price || ""),
                  name: "purchase_price",
                  type: "number",
                },
                {
                  label: "Fund Source",
                  value: detailItem.fund_source,
                  name: "fund_source",
                  type: "text",
                },
                {
                  label: "Supplier",
                  value: detailItem.supplier,
                  name: "supplier",
                  type: "text",
                },
                {
                  label: "Supplier Contact",
                  value: detailItem.supplier_contact,
                  name: "supplier_contact",
                  type: "text",
                },
                {
                  label: "Manual File (PDF)",
                  value: detailItem.manual_file || "",
                  name: "manual_file",
                  type: "file",
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
