import { useState, useEffect } from "react";

const ChemicalReagentForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    chemicalName: "",
    itemCode: "",
    category: "",
    brand: "",
    quantity: "",
    containerType: "",
    containerSize: "",
    form: "",
    dateReceived: "",
    expirationDate: "",
    dateOpened: "",
    location: "",
    msds: "",
    disposalMethod: "",
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
            name="chemicalName"
            value={formData.chemicalName}
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
            name="itemCode"
            value={formData.itemCode}
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
            value={formData.category}
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
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            Form <span className="required">*</span>
          </label>
          <select name="form" value={formData.form} onChange={handleChange}>
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
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Container Type</label>
          <input
            type="text"
            name="containerType"
            value={formData.containerType}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Container Size</label>
          <input
            type="text"
            name="containerSize"
            value={formData.containerSize}
            onChange={handleChange}
          />
        </div>

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

        <div className="form-group">
          <label>Date Opened</label>
          <input
            type="date"
            name="dateOpened"
            value={formData.dateOpened}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            Location <span className="required">*</span>
          </label>
          <select
            name="location"
            value={formData.location}
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
            name="msds"
            value={formData.msds}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Disposal Method</label>
          <input
            type="text"
            name="disposalMethod"
            value={formData.disposalMethod}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
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

export default ChemicalReagentForm;
