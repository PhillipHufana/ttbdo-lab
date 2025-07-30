import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const ChemicalReagentForm = ({
  initialData,
  onSave,
  onCancel,
  categories,
  setCategories,
  forms,
  setForms,
  locations,
  setLocations,
  statuses,
  setStatuses,
}) => {
  // ✅ Hooks are now inside the component
  const [formData, setFormData] = useState({
    name: "",
    item_code: "",
    category: "",
    brand: "",
    form: "",
    quantity: "",
    container_type: "",
    container_size: "",
    date_received: "",
    expiration_date: "",
    date_opened: "",
    location: "",
    msds_file: "",
    disposal_method: "",
    status: "",
    remarks: "",
  });

  const [msdsFile, setMsdsFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addingField, setAddingField] = useState({});
  const [newValue, setNewValue] = useState({});
  const [showDropdown, setShowDropdown] = useState({});
  const dropdownRefs = useRef({});

  useEffect(() => {
    if (initialData) setFormData({ ...initialData });
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOption = (field) => {
    const val = newValue[field]?.trim();
    if (!val) return;

    const update = (setter, list) => {
      if (!list.includes(val)) {
        setter([...list, val]);
        setFormData((prev) => ({ ...prev, [field]: val }));
      }
    };

    if (field === "category") update(setCategories, categories);
    if (field === "form") update(setForms, forms);
    if (field === "location") update(setLocations, locations);
    if (field === "status") update(setStatuses, statuses);

    setAddingField((prev) => ({ ...prev, [field]: false }));
    setNewValue((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSelect = (field, value) => {
    if (value === "__add__") {
      setAddingField((prev) => ({ ...prev, [field]: true }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    setShowDropdown((prev) => ({ ...prev, [field]: false }));
  };

  const renderDropdown = (label, field, options, setter) => (
    <div
      className="form-group"
      ref={(el) => (dropdownRefs.current[field] = el)}
    >
      <label>
        {label} <span className="required">*</span>
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
                key="__add__"
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

  const handleSubmit = async (e) => {
    console.log("Submitting...");
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (msdsFile) data.append("msds_file", msdsFile);

    try {
      const res = await fetch("http://localhost:5000/api/chemical", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        let errorMessage = "Failed to submit";
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch (_) {}
        throw new Error(errorMessage);
      }

      await res.json();
      alert("New Chemical Reagent saved successfully!");
      await onSave();
      setIsSubmitting(false);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error saving chemical: " + err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-grid">
        <div className="form-group">
          <label>
            Chemical Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Item Code <span className="required">*</span>
          </label>
          <input
            type="text"
            name="item_code"
            value={formData.item_code}
            onChange={handleChange}
            required
          />
        </div>

        {renderDropdown("Category", "category", categories, setCategories)}

        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        {renderDropdown("Form", "form", forms, setForms)}

        {/* Quantity and container */}
        <div className="form-group">
          <label>
            Quantity <span className="required">*</span>
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Container Type</label>
          <input
            type="text"
            name="container_type"
            value={formData.container_type}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Container Size</label>
          <input
            type="text"
            name="container_size"
            value={formData.container_size}
            onChange={handleChange}
          />
        </div>

        {/* Dates */}
        <div className="form-group">
          <label>
            Date Received 
          </label>
          <input
            type="date"
            name="date_received"
            value={formData.date_received}
            onChange={handleChange}
            // required
          />
        </div>

        <div className="form-group">
          <label>
            Expiration Date
          </label>
          <input
            type="date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            // required
          />
        </div>

        <div className="form-group">
          <label>Date Opened</label>
          <input
            type="date"
            name="date_opened"
            value={formData.date_opened}
            onChange={handleChange}
          />
        </div>

        {renderDropdown("Location", "location", locations, setLocations)}

        {/* Misc */}
        <div className="form-group">
          <label>MSDS File (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setMsdsFile(e.target.files[0])}
          />
          {formData.msds_file && (
            <div style={{ marginTop: "8px" }}>
              <a
                href={`/uploads/${formData.msds_file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Existing MSDS
              </a>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Disposal Method</label>
          <input
            type="text"
            name="disposal_method"
            value={formData.disposal_method}
            onChange={handleChange}
          />
        </div>

        {renderDropdown("Status", "status", statuses, setStatuses)}

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

      {/* Form buttons */}
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ChemicalReagentForm;
