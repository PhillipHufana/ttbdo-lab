import { useState, useEffect } from "react";

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
    status: "Working",
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

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const statuses = ["Working", "To be Fixed"];

  const locations = [
    "Left Side Table 2, Countertop",
    "Storage Room",
    "Main Laboratory",
    "Warehouse",
  ];

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

        <div className="form-group">
          <label>Location *</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

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

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">Save</button>
      </div>
    </form>
  );
};

export default EquipmentForm;
