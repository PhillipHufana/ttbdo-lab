import { useState, useEffect } from "react"

const ChemicalReagentForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    chemicalName: "",
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
    hazardLevel: "",
    disposalMethod: "",
    status: "Available",
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

  const categories = ["Salt", "Acid", "Base", "Solvent", "Indicator", "Buffer"]
  const containerTypes = ["Bottle", "Vial", "Flask", "Jar", "Tube"]
  const forms = ["Solid", "Liquid", "Gas", "Powder", "Crystal"]
  const hazardLevels = ["Low", "Medium", "High", "Extreme"]
  const statuses = ["Available", "In Use", "Low Stock", "Expired", "Disposed"]

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-grid">
        <div className="form-group">
          <label>Chemical Name *</label>
          <input type="text" name="chemicalName" value={formData.chemicalName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
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
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Container Type</label>
          <select name="containerType" value={formData.containerType} onChange={handleChange}>
            <option value="">Select Type</option>
            {containerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Container Size</label>
          <input type="text" name="containerSize" value={formData.containerSize} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Form</label>
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
          <label>Date Received *</label>
          <input type="date" name="dateReceived" value={formData.dateReceived} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Expiration Date</label>
          <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Date Opened</label>
          <input type="date" name="dateOpened" value={formData.dateOpened} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>MSDS</label>
          <input type="text" name="msds" value={formData.msds} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Hazard Level</label>
          <select name="hazardLevel" value={formData.hazardLevel} onChange={handleChange}>
            <option value="">Select Level</option>
            {hazardLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Disposal Method</label>
          <input type="text" name="disposalMethod" value={formData.disposalMethod} onChange={handleChange} />
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

export default ChemicalReagentForm
