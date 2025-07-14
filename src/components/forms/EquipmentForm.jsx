import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const EquipmentForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    equipment_code: "",
    other_name: "",
    location: "",
    brand: "",
    model: "",
    serial_no: "",
    other_details: "",
    date_received: "",
    status: "",
    last_updated: "",
    maintenance_schedule: "",
    last_calibration_date: "",
    next_calibration_date: "",
    remarks: "",
    manual_available: false,
    po_no: "",
    purchase_price: "",
    fund_source: "",
    supplier: "",
    supplier_contact: "",
  });

  // Options for dropdowns
  const [statusList, setStatusList] = useState(["Working", "To be Fixed"]);
  const [locationList, setLocationList] = useState([
    "Left Side Table 2, Countertop",
    "Storage Room",
    "Main Laboratory",
    "Warehouse",
  ]);

  // Control visibility of dropdowns and new field input
  const [showDropdown, setShowDropdown] = useState({
    location: false,
    status: false,
  });
  const [addingField, setAddingField] = useState({
    location: false,
    status: false,
  });
  const [newValue, setNewValue] = useState({ location: "", status: "" });

  // Refs for detecting outside clicks on dropdowns
  const dropdownRefs = useRef({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach((field) => {
        if (
          dropdownRefs.current[field] &&
          !dropdownRefs.current[field].contains(event.target)
        ) {
          setShowDropdown((prev) => ({ ...prev, [field]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle option selection in dropdown or trigger add-new input
  const handleSelect = (field, value) => {
    if (value === "__add__") {
      setAddingField((prev) => ({ ...prev, [field]: true }));
      setFormData((prev) => ({ ...prev, [field]: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setShowDropdown((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Add new value to dropdown list
  const handleAddOption = (field) => {
    const val = newValue[field].trim();
    if (!val) return;

    const setList = field === "location" ? setLocationList : setStatusList;
    const list = field === "location" ? locationList : statusList;

    if (!list.includes(val)) {
      setList([...list, val]);
      setFormData((prev) => ({ ...prev, [field]: val }));
    }

    setAddingField((prev) => ({ ...prev, [field]: false }));
    setNewValue((prev) => ({ ...prev, [field]: "" }));
  };

  // Reusable dropdown renderer with custom "Add new" option
  const renderDropdown = (label, field, options) => (
    <div
      className="form-group"
      ref={(el) => (dropdownRefs.current[field] = el)}
    >
      <label>
        {label} {field === "location" && <span className="required">*</span>}
      </label>

      {!addingField[field] ? (
        // Normal dropdown display
        <div className="custom-dropdown-wrapper">
          <div
            className="custom-dropdown-selected"
            onClick={() =>
              setShowDropdown((prev) => ({ ...prev, [field]: !prev[field] }))
            }
          >
            <span>{formData[field] || `Select ${label}`}</span>
            <ChevronDown
              className={`dropdown-chevron ${
                showDropdown[field] ? "rotated" : ""
              }`}
              size={18}
            />
          </div>
          {showDropdown[field] && (
            <div className="custom-dropdown-menu">
              {options.map((opt) => (
                <div
                  key={opt}
                  className="custom-dropdown-option"
                  onClick={() => handleSelect(field, opt)}
                >
                  {opt}
                </div>
              ))}
              <div
                className="custom-dropdown-option add-new"
                onClick={() => handleSelect(field, "__add__")}
              >
                + Add new {label.toLowerCase()}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Input for adding a new option
        <div className="custom-add-field">
          <input
            type="text"
            placeholder={`Enter new ${label.toLowerCase()}`}
            value={newValue[field] || ""}
            onChange={(e) =>
              setNewValue((prev) => ({ ...prev, [field]: e.target.value }))
            }
            onBlur={() => handleAddOption(field)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddOption(field);
              }
            }}
            autoFocus
          />
          <button
            type="button"
            onClick={() =>
              setAddingField((prev) => ({ ...prev, [field]: false }))
            }
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("New Equipment saved successfully!");
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-grid">
        <div className="form-group">
          <label>Equipment Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Equipment Code *</label>
          <input
            type="text"
            name="equipment_code"
            value={formData.equipment_code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Other Names</label>
          <input
            type="text"
            name="other_name"
            value={formData.other_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Serial No. *</label>
          <input
            type="text"
            name="serial_no"
            value={formData.serial_no}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Equipment Manual Available</label>
          <input
            type="checkbox"
            name="manual_available"
            checked={!!formData.manual_available}
            onChange={handleChange}
          />
        </div>

        {/* Dropdowns for location and status */}
        {renderDropdown("Location", "location", locationList)}
        {renderDropdown("Status", "status", statusList)}

        <div className="form-group">
          <label>Date Received *</label>
          <input
            type="date"
            name="date_received"
            value={formData.date_received || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>PO No.</label>
          <input
            type="text"
            name="po_no"
            value={formData.po_no}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Purchase Price</label>
          <input
            type="number"
            step="0.01"
            name="purchase_price"
            value={formData.purchase_price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fund Source</label>
          <input
            type="text"
            name="fund_source"
            value={formData.fund_source}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Supplier Contact</label>
          <textarea
            name="supplier_contact"
            value={formData.supplier_contact}
            onChange={handleChange}
            rows="2"
          />
        </div>

        <div className="form-group">
          <label>Other Details</label>
          <textarea
            name="other_details"
            value={formData.other_details}
            onChange={handleChange}
            rows="2"
          />
        </div>

        <div className="form-group">
          <label>Last Maintenance *</label>
          <input
            type="date"
            name="last_updated"
            value={formData.last_updated || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Next Maintenance</label>
          <input
            type="date"
            name="maintenance_schedule"
            value={formData.maintenance_schedule || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Calibration *</label>
          <input
            type="date"
            name="last_calibration_date"
            value={formData.last_calibration_date || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Next Calibration</label>
          <input
            type="date"
            name="next_calibration_date"
            value={formData.next_calibration_date || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="2"
          />
        </div>
      </div>

      {/* Form action buttons */}
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
