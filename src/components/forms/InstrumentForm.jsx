"use client"

import { useState, useEffect } from "react"

const InstrumentForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    instrument: "",
    description: "",
    location: "",
    quantity: "",
    capacity: "",
    status: "Active",
    condition: "Good",
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

  const statuses = ["Active", "Inactive", "Under Calibration", "Retired"]
  const conditions = ["Excellent", "Good", "Fair", "Poor", "Needs Repair"]

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-grid">
        <div className="form-group">
          <label>Instrument *</label>
          <input type="text" name="instrument" value={formData.instrument} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} />
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
          <label>Condition</label>
          <select name="condition" value={formData.condition} onChange={handleChange}>
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
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

export default InstrumentForm
