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

const Equipment = () => {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !locationRef.current?.contains(event.target) &&
        !statusRef.current?.contains(event.target) &&
        !lastMaintRef.current?.contains(event.target) &&
        !nextMaintRef.current?.contains(event.target) &&
        !lastCalibRef.current?.contains(event.target) &&
        !nextCalibRef.current?.contains(event.target)
      ) {
        setShowScheduleFilter(null);
        setShowLocationFilter(false);
        setShowStatusFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [equipment, setEquipment] = useState([
    {
      id: 1,
      equipment: "Convection Oven",
      equipmentCode: "LA-MNC-UP-014",
      otherNames: "Mechanical convection oven",
      location: "Left Side Table 2, Countertop",
      brand: "Memmert",
      model: "UN55",
      serialNo: "B219.0896",
      dateReceived: "2019-10-08",
      otherDetails: "",
      poNo: "4900044032",
      equipmentManual: "LA-MNC-UP-014 - Memmert Oven.pdf",
      status: "Working",
      remarks: "",
      purchasePrice: 86800.0,
      fundSource: "Monde Nissin Corporation",
      supplier: "Yana Chemodities Inc.",
      supplierContactDetails: "",
      lastMaintenanceDate: "2025-06-13",
      nextMaintenanceDate: "2025-12-13",
      lastCalibrationDate: "2019-07-27",
      nextCalibrationDate: "2025-07-27",
    },
  ]);

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.equipmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase());

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
      dateFilter(filterLastMaintenance, item.lastMaintenanceDate) &&
      dateFilter(filterNextMaintenance, item.nextMaintenanceDate) &&
      dateFilter(filterLastCalibration, item.lastCalibrationDate) &&
      dateFilter(filterNextCalibration, item.nextCalibrationDate)
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
    setEditingRowId(item.id);
    setEditingData({ ...item });
  };

  const handleSaveInlineEdit = () => {
    setEquipment((prevEquipment) =>
      prevEquipment.map((item) =>
        item.id === editingRowId ? { ...item, ...editingData } : item
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
    setEditingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleViewDetails = (item) => {
    setDetailItem(item);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      setEquipment((prevEquipment) =>
        prevEquipment.filter((item) => item.id !== id)
      );
    }
  };

  const handleSave = (formData) => {
    setEquipment((prevEquipment) => {
      if (editingItem) {
        return prevEquipment.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        );
      }
    });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const closeAllFilters = () => {
    setShowStatusFilter(false);
    setShowLocationFilter(false);
    setShowScheduleFilter(null);
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
                          {item.equipment}
                        </button>
                      </div>
                    </div>
                    <div className="row-cell">{item.equipmentCode}</div>
                    <div className="row-cell">
                      {editingRowId === item.id ? (
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
                        <input
                          type="date"
                          value={editingData.lastMaintenanceDate}
                          onChange={(e) =>
                            handleInputChange(
                              "lastMaintenanceDate",
                              e.target.value
                            )
                          }
                          className="inline-edit-input"
                        />
                      ) : (
                        item.lastMaintenanceDate
                      )}
                    </div>
                    <div className="row-cell">
                      {editingRowId === item.id ? (
                        <input
                          type="date"
                          value={editingData.nextMaintenanceDate}
                          onChange={(e) =>
                            handleInputChange("nextMaintenance", e.target.value)
                          }
                          className="inline-edit-input"
                        />
                      ) : (
                        item.nextMaintenanceDate
                      )}
                    </div>
                    <div className="row-cell">
                      {editingRowId === item.id ? (
                        <input
                          type="date"
                          value={editingData.lastCalibrationDate}
                          onChange={(e) =>
                            handleInputChange("lastCalibration", e.target.value)
                          }
                          className="inline-edit-input"
                        />
                      ) : (
                        item.lastCalibrationDate
                      )}
                    </div>
                    <div className="row-cell">
                      {editingRowId === item.id ? (
                        <input
                          type="date"
                          value={editingData.nextCalibrationDate}
                          onChange={(e) =>
                            handleInputChange("nextCalibration", e.target.value)
                          }
                          className="inline-edit-input"
                        />
                      ) : (
                        item.nextCalibrationDate
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
            </div>
          )}

          {detailItem && (
            <DetailPopup
              item={detailItem}
              onClose={() => setDetailItem(null)}
              title="Equipment Details"
              fields={[
                // Basic Identification
                { label: "Equipment Code", value: detailItem.equipmentCode },
                { label: "Other Names", value: detailItem.otherNames },
                { label: "Brand", value: detailItem.brand },
                { label: "Model", value: detailItem.model },
                { label: "Serial No.", value: detailItem.serialNo },

                // Classification / Description
                { label: "Other Details", value: detailItem.otherDetails },
                { label: "Status", value: detailItem.status },
                { label: "Remarks", value: detailItem.remarks },

                // Location & Tracking
                { label: "Location", value: detailItem.location },
                { label: "Date Received", value: detailItem.dateReceived },

                // Maintenance & Calibration
                {
                  label: "Last Maintenance",
                  value: detailItem.lastMaintenanceDate,
                },
                {
                  label: "Next Maintenance",
                  value: detailItem.nextMaintenanceDate,
                },
                {
                  label: "Last Calibration",
                  value: detailItem.lastCalibrationDate,
                },
                {
                  label: "Next Calibration",
                  value: detailItem.nextCalibrationDate,
                },

                // Procurement Info
                { label: "PO No.", value: detailItem.poNo },
                {
                  label: "Purchase Price",
                  value: `₱${Number(detailItem.purchasePrice || 0).toFixed(2)}`,
                },
                { label: "Fund Source", value: detailItem.fundSource },
                { label: "Supplier", value: detailItem.supplier },
                {
                  label: "Supplier Contact",
                  value: detailItem.supplierContactDetails,
                },

                // Attachments / References
                {
                  label: "Equipment Manual",
                  value: detailItem.equipmentManual,
                },
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

export default Equipment;