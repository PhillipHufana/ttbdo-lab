"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, X, Check, ChevronDown } from "lucide-react"
import ConsumableForm from "./forms/ConsumableForm"
import DetailPopup from "./DetailPopup"
import Modal from "./Modal"

const Consumables = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSupplier, setFilterSupplier] = useState([])
  const [filterLocation, setFilterLocation] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [detailItem, setDetailItem] = useState(null)
  const [editingRowId, setEditingRowId] = useState(null)
  const [editingData, setEditingData] = useState({})
  const [showSupplierFilter, setShowSupplierFilter] = useState(false)
  const [showLocationFilter, setShowLocationFilter] = useState(false)

  const [consumables, setConsumables] = useState([
    {
      id: 1,
      supplyItem: "Pipette Tips 1000μL",
      brand: "Eppendorf",
      description: "High-quality pipette tips for precision work",
      quantity: 500,
      remainingQuantity: 450,
      dateReceived: "2024-01-20",
      expirationDate: "2025-01-20",
      receivedBy: "Dr. Smith",
      poNo: "PO-2024-001",
      price: 45.99,
      totalPrice: 45.99,
      supplier: "Lab Supply Co.",
      location: "Storage Room A",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      supplyItem: "Petri Dishes",
      brand: "Corning",
      description: "Sterile plastic petri dishes",
      quantity: 250,
      remainingQuantity: 200,
      dateReceived: "2024-02-01",
      expirationDate: "2026-02-01",
      receivedBy: "Lab Tech",
      poNo: "PO-2024-002",
      price: 89.5,
      totalPrice: 89.5,
      supplier: "Scientific Supplies",
      location: "Cabinet B3",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      supplyItem: "Latex Gloves",
      brand: "Ansell",
      description: "Powder-free latex examination gloves",
      quantity: 100,
      remainingQuantity: 50,
      dateReceived: "2024-01-15",
      expirationDate: "2025-06-15",
      receivedBy: "Dr. Johnson",
      poNo: "PO-2024-003",
      price: 25.75,
      totalPrice: 25.75,
      supplier: "Medical Supplies Inc.",
      location: "Supply Closet",
      image: "/placeholder.svg?height=200&width=200",
    },
  ])

  const suppliers = ["Lab Supply Co.", "Scientific Supplies", "Medical Supplies Inc.", "Bio-Rad", "Thermo Fisher"]
  const locations = ["Storage Room A", "Storage Room B", "Cabinet B3", "Supply Closet", "Refrigerator"]

  const filteredConsumables = consumables.filter((item) => {
    const matchesSearch =
      item.supplyItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSupplier = filterSupplier.length === 0 || filterSupplier.includes(item.supplier)
    const matchesLocation = filterLocation.length === 0 || filterLocation.includes(item.location)

    return matchesSearch && matchesSupplier && matchesLocation
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
    setConsumables(consumables.map((item) => (item.id === editingRowId ? { ...editingData } : item)))
    setEditingRowId(null)
    setEditingData({})
  }

  const handleCancelInlineEdit = () => {
    setEditingRowId(null)
    setEditingData({})
  }

  const handleInputChange = (field, value) => {
    setEditingData({ ...editingData, [field]: value })
  }

  const handleViewDetails = (item) => {
    setDetailItem(item)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this consumable?")) {
      setConsumables(consumables.filter((item) => item.id !== id))
    }
  }

  const handleSave = (formData) => {
    if (editingItem) {
      setConsumables(consumables.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
    } else {
      const newItem = {
        id: Date.now(),
        image: "/placeholder.svg?height=200&width=200",
        ...formData,
      }
      setConsumables([...consumables, newItem])
    }
    setShowForm(false)
    setEditingItem(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingItem(null)
  }

  const handleFilterChange = (filterType, value, checked) => {
    switch (filterType) {
      case "supplier":
        setFilterSupplier((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
      case "location":
        setFilterLocation((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
    }
  }

  return (
    <div className="content-section">
      <div className="content-card">
        <div className="section-header">
          <h1>Consumables</h1>
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
            Add Consumable
          </button>
        </div>

        <div className="modern-table">
          <div className="table-header">
            <div className="header-cell">
              <span>Supply Item</span>
            </div>
            <div className="header-cell">
              <span>Remaining Quantity</span>
            </div>
            <div className="header-cell">
              <span>Date Received</span>
            </div>
            <div className="header-cell">
              <span>Expiration Date</span>
            </div>
            <div className="header-cell filter-header" onClick={() => setShowSupplierFilter(!showSupplierFilter)}>
              <span>Supplier</span>
              <ChevronDown size={16} className={`filter-arrow ${showSupplierFilter ? "rotated" : ""}`} />
              {showSupplierFilter && (
                <div className="filter-dropdown">
                  {suppliers.map((supplier) => (
                    <label key={supplier} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filterSupplier.includes(supplier)}
                        onChange={(e) => handleFilterChange("supplier", supplier, e.target.checked)}
                      />
                      <span>{supplier}</span>
                    </label>
                  ))}
                </div>
              )}
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
            <div className="header-cell">
              <span>Actions</span>
            </div>
          </div>

          <div className="table-body">
            {filteredConsumables.map((item) => (
              <div key={item.id} className={`table-row ${editingRowId === item.id ? "editing-row" : ""}`}>
                <div className="row-cell">
                  <div className="item-details">
                    <button className="item-name" onClick={() => handleViewDetails(item)}>
                      {item.supplyItem}
                    </button>
                    <div className="item-brand">{item.brand}</div>
                  </div>
                </div>
                <div className="row-cell">
                  {editingRowId === item.id ? (
                    <input
                      type="number"
                      value={editingData.remainingQuantity}
                      onChange={(e) => handleInputChange("remainingQuantity", e.target.value)}
                      className="inline-edit-input"
                    />
                  ) : (
                    item.remainingQuantity
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
                    <input
                      type="date"
                      value={editingData.expirationDate}
                      onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                      className="inline-edit-input"
                    />
                  ) : (
                    item.expirationDate
                  )}
                </div>
                <div className="row-cell">
                  {editingRowId === item.id ? (
                    <select
                      value={editingData.supplier}
                      onChange={(e) => handleInputChange("supplier", e.target.value)}
                      className="inline-edit-select"
                    >
                      {suppliers.map((supplier) => (
                        <option key={supplier} value={supplier}>
                          {supplier}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="category-text">{item.supplier}</span>
                  )}
                </div>
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
                    <div className="action-buttons">
                      <button className="btn-icon btn-save" onClick={handleSaveInlineEdit} title="Save">
                        <Check size={16} />
                      </button>
                      <button className="btn-icon btn-cancel" onClick={handleCancelInlineEdit} title="Cancel">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button className="btn-icon btn-edit" onClick={() => handleInlineEdit(item)} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(item.id)} title="Delete">
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

      <Modal isOpen={showForm} onClose={handleCancel} title={editingItem ? "Edit Consumable" : "Add Consumable"}>
        <ConsumableForm initialData={editingItem} onSave={handleSave} onCancel={handleCancel} />
      </Modal>

      {detailItem && (
        <DetailPopup
          item={detailItem}
          onClose={() => setDetailItem(null)}
          title="Consumable Details"
          fields={[
            { label: "Supply Item", value: detailItem.supplyItem },
            { label: "Brand", value: detailItem.brand },
            { label: "Description", value: detailItem.description },
            { label: "Quantity", value: detailItem.quantity },
            { label: "Remaining Quantity", value: detailItem.remainingQuantity },
            { label: "Date Received", value: detailItem.dateReceived },
            { label: "Expiration Date", value: detailItem.expirationDate },
            { label: "Received By", value: detailItem.receivedBy },
            { label: "PO No.", value: detailItem.poNo },
            { label: "Price", value: `$${detailItem.price}` },
            { label: "Total Price", value: `$${detailItem.totalPrice}` },
            { label: "Supplier", value: detailItem.supplier },
            { label: "Location", value: detailItem.location },
          ]}
        />
      )}
    </div>
  )
}

export default Consumables
