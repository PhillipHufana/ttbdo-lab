import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const ConsumableForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    supplyItem: "",
    brand: "",
    description: "",
    quantity: "",
    dateReceived: "",
    dateOpened: "",
    expirationDate: "",
    receivedBy: "",
    poNo: "",
    price: "",
    totalPrice: "",
    supplier: "",
    location: "",
    remainingQuantity: "",
  });

  // List of location options for dropdown
  const [locationList, setLocationList] = useState([
    "Lab Room 1",
    "Lab Room 2",
    "Instrument Room",
    "Shelf 2b",
    "Calibration Lab",
    "Table 3, Drawer 4",
  ]);

  // Dropdown and custom add field visibility states
  const [showDropdown, setShowDropdown] = useState({ location: false });
  const [addingField, setAddingField] = useState({ location: false });
  const [newValue, setNewValue] = useState({ location: "" });

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle selection from dropdown or switch to 'add new' input
  const handleSelect = (field, value) => {
    if (value === "__add__") {
      setAddingField((prev) => ({ ...prev, [field]: true }));
      setFormData((prev) => ({ ...prev, [field]: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setShowDropdown((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Add a new option to the dropdown list
  const handleAddOption = (field) => {
    const val = newValue[field].trim();
    if (!val) return;
    if (!locationList.includes(val)) {
      setLocationList([...locationList, val]);
      setFormData((prev) => ({ ...prev, [field]: val }));
    }
    setAddingField((prev) => ({ ...prev, [field]: false }));
    setNewValue((prev) => ({ ...prev, [field]: "" }));
  };

  // Reusable dropdown field with 'add new' support
  const renderDropdown = (label, field, options) => (
    <div
      className="form-group"
      ref={(el) => (dropdownRefs.current[field] = el)}
    >
      <label>
        {label} <span className="required">*</span>
      </label>
      {!addingField[field] ? (
        // Dropdown display
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
        // Input field to add a new option
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

  // Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("New Consumable saved successfully!");
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-grid">
        <div className="form-group">
          <label>
            Supply Item <span className="required">*</span>
          </label>
          <input
            type="text"
            name="supplyItem"
            value={formData.supplyItem}
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

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>
            Quantity <span className="required">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Remaining Quantity</label>
          <input
            type="number"
            name="remainingQuantity"
            value={formData.remainingQuantity}
            onChange={handleChange}
          />
        </div>

        {/* Dates */}
        <div className="form-group">
          <label>
            Date Received <span className="required">*</span>
          </label>
          <input
            type="date"
            name="dateReceived"
            value={formData.dateReceived}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Date Opened <span className="required">*</span>
          </label>
          <input
            type="date"
            name="dateOpened"
            value={formData.dateOpened}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Expiration Date <span className="required">*</span>
          </label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Supplier & PO */}
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
          <label>PO No.</label>
          <input
            type="text"
            name="poNo"
            value={formData.poNo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Received By</label>
          <input
            type="text"
            name="receivedBy"
            value={formData.receivedBy}
            onChange={handleChange}
          />
        </div>

        {/* Pricing */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Total Price</label>
          <input
            type="number"
            step="0.01"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
          />
        </div>

        {/* Custom location dropdown */}
        {renderDropdown("Location", "location", locationList)}
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

export default ConsumableForm;
