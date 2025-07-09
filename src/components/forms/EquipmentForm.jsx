import { useState, useEffect } from "react";

const EquipmentForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    equipment: "",
    equipmentCode: "",
    otherNames: "",
    location: "",
    brand: "",
    model: "",
    serialNo: "",
    otherDetails: "",
    dateReceived: "",
    status: "Operational",
    lastMaintenance: "",
    nextMaintenance: "",
    lastCalib: "",
    nextCalib: "",
    remarks: "",
    equipmentManual: "",
    poNo: "",
    purchasePrice: "",
    fundSource: "",
    supplier: "",
    supplierContactDetails: "",
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
          <label>
            Equipment <span className="required">*</span>
          </label>
          <input
            type="text"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Equipment Code <span className="required">*</span>
          </label>
          <input
            type="text"
            name="equipmentCode"
            value={formData.equipmentCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Other Names</label>
          <input
            type="text"
            name="otherNames"
            value={formData.otherNames}
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
          <label>
            Serial No. <span className="required">*</span>
          </label>
          <input
            type="text"
            name="serialNo"
            value={formData.serialNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Equipment Manual</label>
          <input
            type="text"
            name="equipmentManual"
            value={formData.equipmentManual}
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
          <label>PO No.</label>
          <input
            type="text"
            name="poNo"
            value={formData.poNo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Purchase Price</label>
          <input
            type="number"
            step="0.01"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fund Source</label>
          <input
            type="text"
            name="fundSource"
            value={formData.fundSource}
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
          <label>Supplier Contact Details</label>
          <textarea
            name="supplierContactDetails"
            value={formData.supplierContactDetails}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Other Details</label>
          <textarea
            name="otherDetails"
            value={formData.otherDetails}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>
            Last Maintenance Schedule <span className="required">*</span>
          </label>
          <input
            type="date"
            name="lastMaintenance"
            value={formData.lastMaintenance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Next Maintenance Schedule</label>
          <input
            type="date"
            name="nextMaintenance"
            value={formData.nextMaintenance}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            Last Calibration Schedule <span className="required">*</span>
          </label>
          <input
            type="date"
            name="lastCalib"
            value={formData.lastCalib}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Next Calibration Schedule</label>
          <input
            type="date"
            name="nextCalib"
            value={formData.nextCalib}
            onChange={handleChange}
          />
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

export default EquipmentForm;
