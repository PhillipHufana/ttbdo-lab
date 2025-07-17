import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import ConsumableForm from "./forms/ConsumableForm";
import DetailPopup from "./DetailPopup";

const API_URL = "http://localhost:5000/api/consumable";

const formatDateInput = (dateStr) =>
  typeof dateStr === "string" ? dateStr.slice(0, 10) : "";

const formatDateReadable = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.slice(0, 10).split("-");
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Consumables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState([]);
  const [showExpirationFilter, setShowExpirationFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [expirationSortOrder, setExpirationSortOrder] = useState("");
  const [locations, setLocations] = useState([]);
  const [consumables, setConsumables] = useState([]);
  

  const fetchConsumables = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const formatted = data.map((item) => ({
        id: item.supply_id,
        supplyItem: item.name,
        category: item.category,
        brand: item.brand,
        description: item.description,
        remainingQuantity: item.remaining_qty,
        unit: item.unit,
        dateReceived: item.date_received,
        dateOpened: item.date_opened,
        expirationDate: item.expiration_date,
        receivedBy: item.received_by,
        poNo: item.po_no,
        price: item.unit_price,
        quantity: item.quantity,
        totalPrice: item.total_price,
        supplier: item.supplier,
        location: item.location,
      }));
      setConsumables(formatted);
      setLocations([...new Set(formatted.map((item) => item.location))]); // <-- update locations
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchConsumables();
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationFilter(false);
      }
      if (
        expirationRef.current &&
        !expirationRef.current.contains(event.target)
      ) {
        setShowExpirationFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const filteredConsumables = consumables.filter((item) => {
    const matchesSearch =
      item.supplyItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      filterLocation.length === 0 || filterLocation.includes(item.location);

    return matchesSearch && matchesLocation;
  });

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    const method = editingItem ? "PUT" : "POST";
    const url = editingItem ? `${API_URL}/${editingItem.id}` : API_URL;
    const payload = {
      name: formData.supplyItem,
      category: formData.category || "Consumable",
      brand: formData.brand,
      description: formData.description,
      remaining_qty: formData.remainingQuantity,
      unit: formData.unit || "pcs",
      date_received: formatDateInput(formData.dateReceived),
      date_opened: formatDateInput(formData.dateOpened),
      expiration_date: formatDateInput(formData.expirationDate),
      received_by: formData.receivedBy,
      po_no: formData.poNo,
      unit_price: formData.price,
      quantity: parseInt(formData.quantity),
      total_price: formData.totalPrice,
      supplier: formData.supplier,
      location: formData.location,
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchConsumables();
      setShowForm(false);
      setEditingItem(null);
    } else {
      console.error("Save failed", await res.text());
    }
  };

  const handleInlineEdit = (item) => {
    setEditingRowId(item.id);
    setEditingData({
      ...item,
      dateOpened: formatDateInput(item.dateOpened),
      expirationDate: formatDateInput(item.expirationDate),
      dateReceived: formatDateInput(item.dateReceived),
    });
  };

  const handleSaveInlineEdit = async () => {
    const payload = {
      name: editingData.supplyItem,
      brand: editingData.brand,
      description: editingData.description,
      remaining_qty: editingData.remainingQuantity,
      quantity: parseInt(editingData.quantity),
      expiration_date: formatDateInput(editingData.expirationDate),
      date_opened: formatDateInput(editingData.dateOpened),
      location: editingData.location,
    };
    const res = await fetch(`${API_URL}/${editingRowId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      await fetchConsumables();
      setEditingRowId(null);
      setEditingData({});
    }
  };

  const handleCancelInlineEdit = () => {
    setEditingRowId(null);
    setEditingData({});
  };

  const handleInputChange = (field, value) => {
    setEditingData({ ...editingData, [field]: value });
  };

  const handleViewDetails = (item) => {
    setDetailItem(item);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this consumable?")) {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchConsumables();
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFilterChange = (filterType, value, checked) => {
    if (filterType === "location") {
      setFilterLocation((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    }
  };

  const locationRef = useRef(null);
  const expirationRef = useRef(null);

  return (
    <div className="content-section">
      <div className="content-card">
        <div className="section-header">
          <h1 className="font-marcellus">Consumable Inventory</h1>
        </div>

        <div className="controls-section">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search Items"
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

        {showForm ? (
          <div className="form-container">
            <div className="form-header">
              <h2>{editingItem ? "Edit Consumable" : "Add Consumable"}</h2>
            </div>
            <ConsumableForm
              initialData={editingItem}
              onSave={handleSave}
              onCancel={handleCancel}
              onAddLocation={(newLoc) => {
                setLocations((prev) => [...new Set([...prev, newLoc])]);
              }}
            />
          </div>
        ) : (
          <div className="modern-table">
            <div className="table-header">
              <div className="header-cell">
                <span>Supply Item</span>
              </div>
              <div className="header-cell">
                <span>Remaining Quantity</span>
              </div>
              <div className="header-cell">
                <span>Total Quantity</span>
              </div>
              <div className="header-cell">
                <span>Date Opened</span>
              </div>
              <div className="header-cell filter-header" ref={expirationRef}>
                <div
                  onClick={() => setShowExpirationFilter(!showExpirationFilter)}
                >
                  <span className="text-center">Expiration Date</span>
                  <ChevronDown
                    size={16}
                    className={`filter-arrow ${
                      showExpirationFilter ? "rotated" : ""
                    }`}
                  />
                </div>
                {showExpirationFilter && (
                  <div
                    className="filter-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label className="filter-option">
                      <input
                        type="checkbox"
                        checked={expirationSortOrder === "soonest"}
                        onChange={() => {
                          setExpirationSortOrder(
                            expirationSortOrder === "soonest" ? "" : "soonest"
                          );
                          setShowExpirationFilter(false);
                        }}
                      />
                      <span>Soonest to Expire</span>
                    </label>

                    <label className="filter-option">
                      <input
                        type="checkbox"
                        checked={expirationSortOrder === "farthest"}
                        onChange={() => {
                          setExpirationSortOrder(
                            expirationSortOrder === "farthest" ? "" : "farthest"
                          );
                          setShowExpirationFilter(false);
                        }}
                      />
                      <span>Farthest to Expire</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="header-cell filter-header" ref={locationRef}>
                <div onClick={() => setShowLocationFilter(!showLocationFilter)}>
                  <span className="text-center">Location</span>
                  <ChevronDown
                    size={16}
                    className={`filter-arrow ${
                      showLocationFilter ? "rotated" : ""
                    }`}
                  />
                </div>
                {showLocationFilter && (
                  <div
                    className="filter-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {locations.map((location) => (
                      <label key={location} className="filter-option">
                        <input
                          type="checkbox"
                          checked={filterLocation.includes(location)}
                          onChange={(e) => {
                            handleFilterChange(
                              "location",
                              location,
                              e.target.checked
                            );
                            setShowLocationFilter(false);
                          }}
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
            <div className="table-scroll-body">
              <div className="table-body">
                {[...filteredConsumables]
                  .sort((a, b) => {
                    if (expirationSortOrder === "soonest") {
                      return (
                        new Date(a.expirationDate || 0) -
                        new Date(b.expirationDate || 0)
                      );
                    } else if (expirationSortOrder === "farthest") {
                      return (
                        new Date(b.expirationDate || 0) -
                        new Date(a.expirationDate || 0)
                      );
                    } else {
                      // default alphabetical
                      return a.supplyItem.localeCompare(b.supplyItem);
                    }
                  })

                  .map((item) => (
                    <div
                      key={item.id}
                      className={`table-row ${
                        editingRowId === item.id ? "editing-row" : ""
                      }`}
                    >
                      <div className="row-cell">
                        <div className="item-details">
                          <button
                            className="item-name"
                            onClick={() => handleViewDetails(item)}
                          >
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
                            onChange={(e) =>
                              handleInputChange(
                                "remainingQuantity",
                                e.target.value
                              )
                            }
                            className="inline-edit-input"
                          />
                        ) : (
                          item.remainingQuantity
                        )}
                      </div>
                      <div className="row-cell">
                        {editingRowId === item.id ? (
                          <input
                            type="number"
                            value={editingData.quantity}
                            onChange={(e) =>
                              handleInputChange("quantity", e.target.value)
                            }
                            className="inline-edit-input"
                          />
                        ) : (
                          item.quantity
                        )}
                      </div>
                      <div className="row-cell">
                        {editingRowId === item.id ? (
                          <input
                            type="date"
                            value={formatDateInput(editingData.dateOpened)}
                            onChange={(e) =>
                              handleInputChange("dateOpened", e.target.value)
                            }
                            className="inline-edit-input"
                          />
                        ) : (
                          <span>
                            {formatDateReadable(item.dateOpened) ||
                              "Not opened"}
                          </span>
                        )}
                      </div>

                      <div className="row-cell">
                        {editingRowId === item.id ? (
                          <input
                            type="date"
                            value={formatDateInput(editingData.expirationDate)}
                            onChange={(e) =>
                              handleInputChange(
                                "expirationDate",
                                e.target.value
                              )
                            }
                            className="inline-edit-input"
                          />
                        ) : (
                          <span className="text-left">
                            {formatDateReadable(item.expirationDate)}
                          </span>
                        )}
                      </div>

                      <div className="row-cell">
                        {editingRowId === item.id ? (
                          <select
                            value={editingData.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                            className="inline-edit-select"
                          >
                            {locations.map((loc) => (
                              <option key={loc} value={loc}>
                                {loc}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-left">{item.location}</span>
                        )}
                      </div>
                      <div className="row-cell">
                        {editingRowId === item.id ? (
                          <div className="action-buttons">
                            <button
                              className="btn-icon btn-save"
                              onClick={handleSaveInlineEdit}
                              title="Save"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              className="btn-icon btn-cancel"
                              onClick={handleCancelInlineEdit}
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="action-buttons">
                            <button
                              className="btn-icon btn-edit"
                              onClick={() => handleInlineEdit(item)}
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="btn-icon btn-delete"
                              onClick={() => handleDelete(item.id)}
                              title="Delete"
                            >
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
        )}
        {detailItem && (
          <DetailPopup
            item={detailItem}
            onClose={() => setDetailItem(null)}
            title="Consumable Details"
            fields={[
              {
                name: "supplyItem",
                label: "Name",
                value: detailItem.supplyItem,
              },
              { name: "brand", label: "Brand", value: detailItem.brand },
              {
                name: "description",
                label: "Description",
                value: detailItem.description,
              },
              {
                name: "quantity",
                label: "Quantity",
                value: detailItem.quantity,
              },
              {
                name: "remainingQuantity",
                label: "Remaining Quantity",
                value: detailItem.remainingQuantity,
              },
              {
                name: "dateReceived",
                label: "Date Received",
                value: detailItem.dateReceived,
              },
              {
                name: "dateOpened",
                label: "Date Opened",
                value: detailItem.dateOpened,
              },
              {
                name: "expirationDate",
                label: "Expiration Date",
                value: detailItem.expirationDate,
              },
              { name: "poNo", label: "PO No.", value: detailItem.poNo },
              { name: "price", label: "Price", value: detailItem.price },
              {
                name: "totalPrice",
                label: "Total Price",
                value: detailItem.totalPrice,
              },
              {
                name: "receivedBy",
                label: "Received By",
                value: detailItem.receivedBy,
              },
              {
                name: "supplier",
                label: "Supplier",
                value: detailItem.supplier,
              },
              {
                name: "location",
                label: "Location",
                value: detailItem.location,
              },
            ]}
            onSave={async (updatedFields) => {
              const payload = {
                name: updatedFields.supplyItem, // ✅ now using the updated value
                category: detailItem.category || "Consumable",
                brand: updatedFields.brand,
                description: updatedFields.description,
                quantity: Number(updatedFields.quantity),
                remaining_qty: Number(updatedFields.remainingQuantity),
                date_received: formatDateInput(updatedFields.dateReceived),
                date_opened: formatDateInput(updatedFields.dateOpened),
                expiration_date: formatDateInput(updatedFields.expirationDate),
                po_no: updatedFields.poNo,
                unit_price: parseFloat(updatedFields.price),
                total_price: parseFloat(updatedFields.totalPrice),
                received_by: updatedFields.receivedBy,
                supplier: updatedFields.supplier,
                location: updatedFields.location,
                unit: detailItem.unit,
              };

              const res = await fetch(`${API_URL}/${detailItem.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });

              if (res.ok) {
                await fetchConsumables();
                setDetailItem(null);
              } else {
                console.error("Detail save failed:", await res.text());
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Consumables;
