import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const InstrumentForm = ({
  initialData,
  onSave,
  onCancel,
  locationList,
  setLocationList,
  statusList,
  setStatusList,
  conditionList,
  setConditionList,
}) => {
  const [formData, setFormData] = useState({
    instrument: "",
    brand: "",
    description: "",
    location: "",
    quantity: "",
    capacity: "",
    status: "",
    condition: "",
    remarks: "",
  });

  // State to control dropdown visibility per field
  const [showDropdown, setShowDropdown] = useState({
    location: false,
    status: false,
    condition: false,
  });

  // State to control if a new option is being added per dropdown
  const [addingField, setAddingField] = useState({
    location: false,
    status: false,
    condition: false,
  });

  // Holds the value being typed into the custom add field
  const [newValue, setNewValue] = useState({
    location: "",
    status: "",
    condition: "",
  });

  const dropdownRefs = useRef({});

  // If initialData is provided, pre-fill the form
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

  // Generic handler for input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle selecting an option from a dropdown or opening the add-new field
  const handleSelect = (field, value) => {
    if (value === "__add__") {
      setAddingField((prev) => ({ ...prev, [field]: true }));
      setFormData((prev) => ({ ...prev, [field]: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setShowDropdown((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Handle adding a new custom dropdown option
  const handleAddOption = (field) => {
    const val = newValue[field].trim();
    if (!val) return;

    // Determine which list and setter to use
    const listMap = {
      location: [locationList, setLocationList],
      status: [statusList, setStatusList],
      condition: [conditionList, setConditionList],
    };
    const [list, setList] = listMap[field];

    // Add new option if it doesn't already exist
    if (!list.includes(val)) {
      setList([...list, val]);
      setFormData((prev) => ({ ...prev, [field]: val }));
    }

    setAddingField((prev) => ({ ...prev, [field]: false }));
    setNewValue((prev) => ({ ...prev, [field]: "" }));
  };

  // Render dropdown with support for "Add new" entry
  const renderDropdown = (label, field, options) => (
    <div
      className="form-group"
      ref={(el) => (dropdownRefs.current[field] = el)}
    >
      <label>
        {label} {field === "location" && <span className="required">*</span>}
      </label>

      {!addingField[field] ? (
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("New Instrument saved successfully!");
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-grid">
        {/* Instrument Name */}
        <div className="form-group">
          <label>
            Instrument <span className="required">*</span>
          </label>
          <input
            type="text"
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            required
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

        {/* Quantity */}
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        {/* Capacity */}
        <div className="form-group">
          <label>Capacity</label>
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>

        {/* Location, Status, and Condition dropdowns */}
        {renderDropdown("Location", "location", locationList)}
        {renderDropdown("Status", "status", statusList)}
        {renderDropdown("Condition", "condition", conditionList)}

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        {/* Remarks */}
        <div className="form-group">
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
          />
        </div>
      </div>

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

export default InstrumentForm;
