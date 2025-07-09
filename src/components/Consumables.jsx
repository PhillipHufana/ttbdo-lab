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

const Consumables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState([]);
  const [filterExpirationMonth, setFilterExpirationMonth] = useState("");
  const [showExpirationFilter, setShowExpirationFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  const [consumables, setConsumables] = useState([
    {
      id: 1,
      supplyItem: "Sterilized Membrane Filters",
      brand: "Pall",
      description: "Diameter: 47mm, FR: 0.45 micrometer, 200 per box",
      quantity: 500,
      remainingQuantity: "1 (box)",
      dateReceived: "2023-09-26",
      dateOpened: "",
      expirationDate: "2025-02",
      receivedBy: "",
      poNo: "",
      price: "",
      totalPrice: "",
      supplier: "",
      location: "Table 3, Drawer 4",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]);

  const locations = ["Table 3, Drawer 4", "Shelf 2b", "Shelf 1d"];

  const filteredConsumables = consumables.filter((item) => {
    const matchesSearch =
      item.supplyItem.toLowerCase() ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      filterLocation.length === 0 || filterLocation.includes(item.location);

    const matchesExpiration =
      !filterExpirationMonth ||
      (item.expirationDate &&
        item.expirationDate.startsWith(filterExpirationMonth));

    return matchesSearch && matchesLocation && matchesExpiration;
  });

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleInlineEdit = (item) => {
    setEditingRowId(item.id);
    setEditingData({ ...item });
  };

  const handleSaveInlineEdit = () => {
    setConsumables(
      consumables.map((item) =>
        item.id === editingRowId ? { ...editingData } : item
      )
    );
    setEditingRowId(null);
    setEditingData({});
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this consumable?")) {
      setConsumables(consumables.filter((item) => item.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (editingItem) {
      setConsumables(
        consumables.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newItem = {
        id: Date.now(),
        image: "/placeholder.svg?height=200&width=200",
        ...formData,
      };
      setConsumables([...consumables, newItem]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFilterChange = (filterType, value, checked) => {
    switch (filterType) {
      case "location":
        setFilterLocation((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        break;
    }
  };

  const locationRef = useRef(null);
  const expirationRef = useRef(null);

  useEffect(() => {
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
                    <input
                      type="month"
                      value={filterExpirationMonth}
                      onChange={(e) => {
                        setFilterExpirationMonth(e.target.value);
                        setShowExpirationFilter(false); // Auto-close after picking month
                      }}
                      className="month-input"
                    />
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

            <div className="table-body">
              {filteredConsumables.map((item) => (
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
                          handleInputChange("remainingQuantity", e.target.value)
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
                        value={editingData.dateOpened || ""}
                        onChange={(e) =>
                          handleInputChange("dateOpened", e.target.value)
                        }
                        className="inline-edit-input"
                      />
                    ) : (
                      item.dateOpened || "Not opened"
                    )}
                  </div>
                  <div className="row-cell">
                    {editingRowId === item.id ? (
                      <input
                        type="date"
                        value={editingData.expirationDate}
                        onChange={(e) =>
                          handleInputChange("expirationDate", e.target.value)
                        }
                        className="inline-edit-input"
                      />
                    ) : (
                      <span className="text-left">{item.expirationDate}</span>
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
        )}

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
              {
                label: "Remaining Quantity",
                value: detailItem.remainingQuantity,
              },
              { label: "Date Received", value: detailItem.dateReceived },
              { label: "Date Opened", value: detailItem.dateOpened },
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
    </div>
  );
};

export default Consumables;
