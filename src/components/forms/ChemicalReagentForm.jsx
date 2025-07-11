import { useState, useEffect } from "react";

const ChemicalReagentForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    item_code: "",
    category: "",
    brand: "",
    quantity: "",
    container_type: "",
    container_size: "",
    form: "",
    date_received: "",
    expiration_date: "",
    date_opened: "",
    location: "",
    msds_available: "",
    disposal_method: "",
    status: "Unopened",
    remarks: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

 
  const categories = [
    "Lactic Acid",
    "Lactic Acid Fermentation",
    "Polymerization",
    "Filtration and Purification",
    "Sugar Analysis",
    "Others",
  ];
  const forms = ["Solid", "Liquid"];
  const statuses = [
    "Opened",
    "Unopened",
    "Expired Opened",
    "Expired Unopened",
    "Expired Sealed",
  ];
  const locations = ["Table 2, Cabinet 4", "Shelf 2b", "Shelf 1d"];

  

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
            value={formData.name || ""}
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
            value={formData.item_code || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Category <span className="required">*</span>
          </label>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            Form <span className="required">*</span>
          </label>
          <select
            name="form"
            value={formData.form || ""}
            onChange={handleChange}
          >
            <option value="">Select Form</option>
            {forms.map((form) => (
              <option key={form} value={form}>
                {form}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            Quantity <span className="required">*</span>
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Container Type</label>
          <input
            type="text"
            name="container_type"
            value={formData.container_type || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Container Size</label>
          <input
            type="text"
            name="container_size"
            value={formData.container_size || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            Date Received <span className="required">*</span>
          </label>
          <input
            type="date"
            name="date_received"
            value={formData.date_received || ""} 
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
            name="expiration_date"
            value={formData.expiration_date || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date Opened</label>
          <input
            type="date"
            name="date_opened"
            value={formData.date_opened || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            Location <span className="required">*</span>
          </label>
          <select
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Location
            </option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>MSDS</label>
          <input
            type="text"
            name="msds_available"
            value={formData.msds_available || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Disposal Method</label>
          <input
            type="text"
            name="disposal_method"
            value={formData.disposal_method || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks || ""}
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

export default ChemicalReagentForm;
