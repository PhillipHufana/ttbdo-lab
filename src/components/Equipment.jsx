"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, X, Check, ChevronDown } from "lucide-react"
import EquipmentForm from "./forms/EquipmentForm"
import DetailPopup from "./DetailPopup"
import Modal from "./Modal"

const Equipment = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState([])
  const [filterLocation, setFilterLocation] = useState([])
  const [filterBrand, setFilterBrand] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [detailItem, setDetailItem] = useState(null)
  const [editingRowId, setEditingRowId] = useState(null)
  const [editingData, setEditingData] = useState({})
  const [showStatusFilter, setShowStatusFilter] = useState(false)
  const [showLocationFilter, setShowLocationFilter] = useState(false)
  const [showBrandFilter, setShowBrandFilter] = useState(false)

  const [equipment, setEquipment] = useState([
    {
      id: 1,
      equipment: "Centrifuge",
      equipmentCode: "EQ001",
      otherNames: "High-speed centrifuge",
      location: "Lab Room 1",
      brand: "Eppendorf",
      model: "CF-2000",
      serialNo: "EP2000-001",
      otherDetails: "Variable speed control, refrigerated",
      dateReceived: "2023-06-15",
      status: "Operational",
      maintenanceSchedule: "2024-06-15",
      remarks: "Regular maintenance required",
      equipmentManual: "Manual-CF2000.pdf",
      poNo: "PO-2023-015",
      purchasePrice: 15000.0,
      fundSource: "Research Grant",
      supplier: "Scientific Equipment Ltd.",
      supplierContactDetails: "contact@sciequip.com, +1-555-0123",
      calibrationDate: "2024-01-15",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      equipment: "Autoclave",
      equipmentCode: "EQ002",
      otherNames: "Steam sterilizer",
      location: "Sterilization Room",
      brand: "Tuttnauer",
      model: "AS-500",
      serialNo: "TT500-002",
      otherDetails: "Automatic cycle control",
      dateReceived: "2023-08-20",
      status: "Under Maintenance",
      maintenanceSchedule: "2024-02-20",
      remarks: "Pressure valve replacement needed",
      equipmentManual: "Manual-AS500.pdf",
      poNo: "PO-2023-020",
      purchasePrice: 8500.0,
      fundSource: "Department Budget",
      supplier: "Medical Equipment Co.",
      supplierContactDetails: "sales@medequip.com, +1-555-0456",
      calibrationDate: "2023-12-01",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      equipment: "pH Meter",
      equipmentCode: "EQ003",
      otherNames: "Digital pH analyzer",
      location: "Lab Room 2",
      brand: "Hanna Instruments",
      model: "PH-100",
      serialNo: "HI100-003",
      otherDetails: "Temperature compensation",
      dateReceived: "2024-01-10",
      status: "Operational",
      maintenanceSchedule: "2024-07-10",
      remarks: "Calibrate monthly",
      equipmentManual: "Manual-PH100.pdf",
      poNo: "PO-2024-005",
      purchasePrice: 450.0,
      fundSource: "Lab Supplies Budget",
      supplier: "Analytical Instruments Inc.",
      supplierContactDetails: "info@analytical.com, +1-555-0789",
      calibrationDate: "2024-02-01",
      image: "/placeholder.svg?height=200&width=200",
    },
  ])

  const statuses = ["Operational", "Under Maintenance", "Out of Order", "Retired"]
  const locations = ["Lab Room 1", "Lab Room 2", "Sterilization Room", "Storage", "Instrument Room"]
  const brands = ["Eppendorf", "Tuttnauer", "Hanna Instruments", "Thermo Fisher", "Bio-Rad"]

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.equipmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus.length === 0 || filterStatus.includes(item.status)
    const matchesLocation = filterLocation.length === 0 || filterLocation.includes(item.location)
    const matchesBrand = filterBrand.length === 0 || filterBrand.includes(item.brand)

    return matchesSearch && matchesStatus && matchesLocation && matchesBrand
  })

  const handleAdd = () => {
    setEditingItem(null)
    setShowForm(true)
  }

  const handleInlineEdit = (item) => {
    setEditingRowId(item.id)
    setEditingData({ ...item })
  }

  const handleSaveInlineEdit = () => {
    setEquipment((prevEquipment) =>
      prevEquipment.map((item) => (item.id === editingRowId ? { ...item, ...editingData } : item)),
    )
    setEditingRowId(null)
    setEditingData({})
  }

  const handleCancelInlineEdit = () => {
    setEditingRowId(null)
    setEditingData({})
  }

  const handleInputChange = (field, value) => {
    setEditingData((prev) => ({ ...prev, [field]: value }))
  }

  const handleViewDetails = (item) => {
    setDetailItem(item)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      setEquipment((prevEquipment) => prevEquipment.filter((item) => item.id !== id))
    }
  }

  const handleSave = (formData) => {
    setEquipment((prevEquipment) => {
      if (editingItem) {
        return prevEquipment.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item))
      } else {
        const newItem = {
          id: Date.now(),
          image: "/placeholder.svg?height=200&width=200",
          ...formData,
        }
        return [...prevEquipment, newItem]
      }
    })
    setShowForm(false)
    setEditingItem(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingItem(null)
  }

  const handleFilterChange = (filterType, value, checked) => {
    switch (filterType) {
      case "status":
        setFilterStatus((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
      case "location":
        setFilterLocation((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
      case "brand":
        setFilterBrand((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
      default:
        break
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Operational":
        return "status-available"
      case "Under Maintenance":
        return "status-in-use"
      case "Out of Order":
        return "status-expired"
      case "Retired":
        return "status-disposed"
      default:
        return ""
    }
  }

  return (
    <div className="content-section">
      <div className="content-card">
        <div className="section-header">
          <h1>Equipment</h1>
        </div>

        <div className="controls-section">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search Items......"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="btn-primary" onClick={handleAdd}>
            <Plus size={20} />
            Add Equipment
          </button>
        </div>

        <div className="modern-table">
          <div className="table-header">
            <div className="header-cell">
              <span>Equipment</span>
            </div>
            <div className="header-cell">
              <span>Equipment Code</span>
            </div>
            <div className="header-cell filter-header" onClick={() => setShowLocationFilter(!showLocationFilter)}>
              <span>Location</span>
              <ChevronDown size={16} className={`filter-arrow ${showLocationFilter ? "rotated" : ""}`} />
              {showLocationFilter && (
                <div className="filter-dropdown">
                  {locations.map((location) => (
                    <label key={location} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filterLocation.includes(location)}
                        onChange={(e) => handleFilterChange("location", location, e.target.checked)}
                      />
                      <span>{location}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="header-cell filter-header" onClick={() => setShowBrandFilter(!showBrandFilter)}>
              <span>Brand</span>
              <ChevronDown size={16} className={`filter-arrow ${showBrandFilter ? "rotated" : ""}`} />
              {showBrandFilter && (
                <div className="filter-dropdown">
                  {brands.map((brand) => (
                    <label key={brand} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filterBrand.includes(brand)}
                        onChange={(e) => handleFilterChange("brand", brand, e.target.checked)}
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="header-cell">
              <span>Date Received</span>
            </div>
            <div className="header-cell filter-header" onClick={() => setShowStatusFilter(!showStatusFilter)}>
              <span>Status</span>
              <ChevronDown size={16} className={`filter-arrow ${showStatusFilter ? "rotated" : ""}`} />
              {showStatusFilter && (
                <div className="filter-dropdown">
                  {statuses.map((status) => (
                    <label key={status} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filterStatus.includes(status)}
                        onChange={(e) => handleFilterChange("status", status, e.target.checked)}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="header-cell">
              <span>Actions</span>
            </div>
          </div>

          <div className="table-body">
            {filteredEquipment.map((item) => (
              <div key={item.id} className={`table-row ${editingRowId === item.id ? "editing-row" : ""}`}>
                <div className="row-cell">
                  <div className="item-details">
                    <button className="item-name" onClick={() => handleViewDetails(item)}>
                      {item.equipment}
                    </button>
                    <div className="item-brand">{item.brand}</div>
                  </div>
                </div>
                <div className="row-cell">{item.equipmentCode}</div>
                <div className="row-cell">
                  {editingRowId === item.id ? (
                    <select
                      value={editingData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="inline-edit-select"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.location
                  )}
                </div>
                <div className="row-cell">
                  {editingRowId === item.id ? (
                    <select
                      value={editingData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                      className="inline-edit-select"
                    >
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="category-text">{item.brand}</span>
                  )}
                </div>
                <div className="row-cell">
                  {editingRowId === item.id ? (
                    <input
                      type="date"
                      value={editingData.dateReceived}
                      onChange={(e) => handleInputChange("dateReceived", e.target.value)}
                      className="inline-edit-input"
                    />
                  ) : (
                    item.dateReceived
                  )}
                </div>
                <div className="row-cell">
                  {editingRowId === item.id ? (
                    <select
                      value={editingData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="inline-edit-select"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className={`status-badge ${getStatusColor(item.status)}`}>{item.status}</span>
                  )}
                </div>
                <div className="row-cell">
                  {editingRowId === item.id ? (
                    <div className="editing-actions">
                      <button className="btn-icon btn-save" onClick={handleSaveInlineEdit} title="Save">
                        <Check size={16} />
                      </button>
                      <button className="btn-icon btn-cancel" onClick={handleCancelInlineEdit} title="Cancel">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button className="btn-icon" onClick={() => handleInlineEdit(item)} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDelete(item.id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showForm} onClose={handleCancel} title={editingItem ? "Edit Equipment" : "Add Equipment"}>
        <EquipmentForm initialData={editingItem} onSave={handleSave} onCancel={handleCancel} />
      </Modal>

      {detailItem && (
        <DetailPopup
          item={detailItem}
          onClose={() => setDetailItem(null)}
          title="Equipment Details"
          fields={[
            { label: "Equipment", value: detailItem.equipment },
            { label: "Equipment Code", value: detailItem.equipmentCode },
            { label: "Other Names", value: detailItem.otherNames },
            { label: "Location", value: detailItem.location },
            { label: "Brand", value: detailItem.brand },
            { label: "Model", value: detailItem.model },
            { label: "Serial No.", value: detailItem.serialNo },
            { label: "Other Details", value: detailItem.otherDetails },
            { label: "Date Received", value: detailItem.dateReceived },
            { label: "Status", value: detailItem.status },
            { label: "Maintenance Schedule", value: detailItem.maintenanceSchedule },
            { label: "Remarks", value: detailItem.remarks },
            { label: "Equipment Manual", value: detailItem.equipmentManual },
            { label: "PO No.", value: detailItem.poNo },
            { label: "Purchase Price", value: `$${detailItem.purchasePrice}` },
            { label: "Fund Source", value: detailItem.fundSource },
            { label: "Supplier", value: detailItem.supplier },
            { label: "Supplier Contact", value: detailItem.supplierContactDetails },
            { label: "Calibration Date", value: detailItem.calibrationDate },
          ]}
        />
      )}
    </div>
  )
}

export default Equipment
