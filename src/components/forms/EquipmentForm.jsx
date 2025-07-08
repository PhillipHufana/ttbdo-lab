"use client"

import { useState, useEffect } from "react"

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
    maintenanceSchedule: "",
    remarks: "",
    equipmentManual: "",
    poNo: "",
    purchasePrice: "",
    fundSource: "",
    supplier: "",
    supplierContactDetails: "",
    calibrationDate: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const statuses = ["Operational", "Under Maintenance", "Out of Order", "Retired"]

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-grid">
        <div className="form-group">
          <label>Equipment *</label>
          <input type="text" name="equipment" value={formData.equipment} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Equipment Code *</label>
          <input type="text" name="equipmentCode" value={formData.equipmentCode} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Other Names</label>
          <input type="text" name="otherNames" value={formData.otherNames} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Model</label>
          <input type="text" name="model" value={formData.model} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Serial No.</label>
          <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Other Details</label>
          <textarea name="otherDetails" value={formData.otherDetails} onChange={handleChange} rows="3" />
        </div>

        <div className="form-group">
          <label>Date Received</label>
          <input type="date" name="dateReceived" value={formData.dateReceived} onChange={handleChange} />
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
          <label>Maintenance Schedule</label>
          <input type="date" name="maintenanceSchedule" value={formData.maintenanceSchedule} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Remarks</label>
          <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" />
        </div>

        <div className="form-group">
          <label>Equipment Manual</label>
          <input type="text" name="equipmentManual" value={formData.equipmentManual} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>PO No.</label>
          <input type="text" name="poNo" value={formData.poNo} onChange={handleChange} />
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
          <input type="text" name="fundSource" value={formData.fundSource} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Supplier</label>
          <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} />
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
          <label>Calibration Date</label>
          <input type="date" name="calibrationDate" value={formData.calibrationDate} onChange={handleChange} />
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
  )
}

export default EquipmentForm
