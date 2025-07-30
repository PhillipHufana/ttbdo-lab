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
import InstrumentForm from "./forms/InstrumentForm";
import DetailPopup from "./DetailPopup";

const API_URL = "http://localhost:5000/api/instrument";

const Instruments = () => {
  // State
  const [instruments, setInstruments] = useState([]);

  // Filter values
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterCondition, setFilterCondition] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);

  // Filter options
  const [statusList, setStatusList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  // UI Toggles
  const [showFilters, setShowFilters] = useState({
    location: false,
    status: false,
    condition: false,
  });

  // Form and details
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  // Inline edit
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingData, setEditingData] = useState({});

  // Refs
  const filterRefs = {
    location: useRef(null),
    status: useRef(null),
    condition: useRef(null),
  };

  const normalize = (val) => (val || "").toLowerCase().trim();

  const toTitleCase = (str) =>
    (str || "").replace(
      /\w\S*/g,
      (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase()
    );

  // Fetch Data
  const fetchInstruments = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const formatted = data.map((item) => ({
        id: item.instrument_id,
        instrument: item.name,
        brand: item.brand,
        description: item.description,
        location: item.location,
        quantity: item.quantity,
        unit: item.unit,
        capacity: item.capacity,
        status: item.status,
        condition: item.condition,
        remarks: item.remarks,
      }));

      setInstruments(formatted);

      const locationMap = {};
      const statusMap = {};
      const conditionMap = {};

      data.forEach((r) => {
        const loc = (r.location || "").trim();
        locationMap[loc.toLowerCase()] = loc;

        const status = (r.status || "").trim();
        statusMap[status.toLowerCase()] = status;

        const cond = (r.condition || "").trim();
        conditionMap[cond.toLowerCase()] = cond;
      });

      setLocationList(Object.values(locationMap).sort((a, b) => a.localeCompare(b)));
      setStatusList(Object.values(statusMap).sort((a, b) => a.localeCompare(b)));
      setConditionList(Object.values(conditionMap).sort((a, b) => a.localeCompare(b)));

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };


  useEffect(() => {
    fetchInstruments();

    const handleClickOutside = (event) => {
      Object.entries(filterRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowFilters((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtering
  const filteredInstruments = instruments.filter((item) => {
    const instrument = normalize(item.instrument);
    const brand = normalize(item.brand);
    const desc = normalize(item.description);
    const location = normalize(item.location);
    const status = normalize(item.status);
    const condition = normalize(item.condition);
    const search = normalize(searchTerm);

    const matchesSearch =
      instrument.includes(search) ||
      brand.includes(search) ||
      desc.includes(search) ||
      location.includes(search);

    const matchesStatus =
      filterStatus.length === 0 ||
      filterStatus.some((s) => normalize(s) === status);

    const matchesCondition =
      filterCondition.length === 0 ||
      filterCondition.some((c) => normalize(c) === condition);

    const matchesLocation =
      filterLocation.length === 0 ||
      filterLocation.some((l) => normalize(l) === location);

    return (
      matchesSearch && matchesStatus && matchesCondition && matchesLocation
    );
  });

  // Color helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "Opened":
        return "status-opened";
      case "Unused":
        return "status-unused";
      case "Used":
        return "status-used";
      case "Opened, unused":
        return "status-opened-unused";
      case "Sealed":
        return "status-unopened";
      case "Tip Chipped":
        return "status-tip-chipped";
      case "Unopened":
        return "status-unopened";
      case "Broken":
        return "status-broken";
      default:
        return "";
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case "Good":
        return "status-opened";
      case "Poor":
        return "status-expired-unopened";
      default:
        return "";
    }
  };

  // Handlers
  const handleFilterChange = (filterType, value, checked) => {
    const update = (prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value);

    if (filterType === "status") setFilterStatus(update);
    if (filterType === "condition") setFilterCondition(update);
    if (filterType === "location") setFilterLocation(update);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    const method = editingItem ? "PUT" : "POST";
    const url = editingItem ? `${API_URL}/${editingItem.id}` : API_URL;

    const payload = {
      name: formData.instrument,
      brand: formData.brand,
      description: formData.description,
      location: formData.location,
      quantity: parseInt(formData.quantity),
      unit: formData.unit || "pcs",
      capacity: formData.capacity,
      status: formData.status,
      condition: formData.condition,
      remarks: formData.remarks,
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchInstruments();
      setShowForm(false);
      setEditingItem(null);
    } else {
      console.error("Save failed", await res.text());
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this instrument?")) {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchInstruments();
    }
  };

  const handleInlineEdit = (item) => {
    setEditingRowId(item.id);
    setEditingData({ ...item });
  };

  const handleSaveInlineEdit = async () => {
    const payload = {
      name: editingData.instrument,
      brand: editingData.brand,
      description: editingData.description,
      location: editingData.location,
      quantity: parseInt(editingData.quantity),
      unit: editingData.unit || "pcs",
      capacity: editingData.capacity,
      status: editingData.status,
      condition: editingData.condition,
      remarks: editingData.remarks,
    };

    const res = await fetch(`${API_URL}/${editingRowId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchInstruments();
      setEditingRowId(null);
      setEditingData({});
    } else {
      console.error("Update failed", await res.text());
    }
  };

  const handleCancelInlineEdit = () => {
    setEditingRowId(null);
    setEditingData({});
  };

  const handleInputChange = (field, value) => {
    setEditingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleViewDetails = (item) => setDetailItem(item);

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="content-section">
      <div className="content-card">
        <div className="section-header">
          <h1 className="font-marcellus">Instruments Inventory</h1>
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
            <Plus size={20} /> Add Instrument
          </button>
        </div>

        {showForm ? (
          <div className="form-container">
            <div className="form-header">
              <h2>{editingItem ? "Edit Instrument" : "Add Instrument"}</h2>
            </div>
            <InstrumentForm
              initialData={editingItem}
              onSave={handleSave}
              onCancel={handleCancel}
              locationList={locationList}
              setLocationList={setLocationList}
              statusList={statusList}
              setStatusList={setStatusList}
              conditionList={conditionList}
              setConditionList={setConditionList}
            />
          </div>
        ) : (
          <div className="table-responsive">
            <div className="modern-table instruments-table">
              <div className="table-header">
                <div className="header-cell">
                  <span>Instrument</span>
                </div>
                <div className="header-cell hide-mobile">
                  <span>Quantity</span>
                </div>
                <div className="header-cell hide-mobile">
                  <span>Description</span>
                </div>
                <div
                  className="header-cell filter-header"
                  ref={filterRefs.location}
                  onClick={() =>
                    setShowFilters((prev) => ({
                      ...prev,
                      location: !prev.location,
                    }))
                  }
                >
                  <span>Location</span>
                  <ChevronDown
                    size={16}
                    className={`filter-arrow ${
                      showFilters.location ? "rotated" : ""
                    }`}
                  />
                  {showFilters.location && (
                    <div ref={filterRefs.location} className="filter-dropdown">
                      {locationList.map((loc) => (
                       <label key={loc || "__blank__"}className="filter-option" >
                          <input
                            type="checkbox"
                            checked={filterLocation.includes(loc)}
                            onChange={(e) =>
                              handleFilterChange("location", loc, e.target.checked)
                            }
                          />
                          <span>{toTitleCase(loc.trim())}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className="header-cell filter-header"
                  ref={filterRefs.status}
                  onClick={() =>
                    setShowFilters((prev) => ({
                      ...prev,
                      status: !prev.status,
                    }))
                  }
                >
                  <span>Status</span>
                  <ChevronDown
                    size={16}
                    className={`filter-arrow ${
                      showFilters.status ? "rotated" : ""
                    }`}
                  />
                  {showFilters.status && (
                    <div className="filter-dropdown">
                      {statusList.map((status) => (
                        <label key={status} className="filter-option">
                          <input
                            type="checkbox"
                            checked={filterStatus.includes(status)}
                            onChange={(e) =>
                              handleFilterChange(
                                "status",
                                status,
                                e.target.checked
                              )
                            }
                          />
                          <span>{toTitleCase(status.trim())}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className="header-cell filter-header"
                  ref={filterRefs.condition}
                  onClick={() =>
                    setShowFilters((prev) => ({
                      ...prev,
                      condition: !prev.condition,
                    }))
                  }
                >
                  <span>Condition</span>
                  <ChevronDown
                    size={16}
                    className={`filter-arrow ${
                      showFilters.condition ? "rotated" : ""
                    }`}
                  />
                  {showFilters.condition && (
                    <div className="filter-dropdown">
                      {conditionList.map((cond) => (
                        <label key={cond} className="filter-option">
                          <input
                            type="checkbox"
                            checked={filterCondition.includes(cond)}
                            onChange={(e) =>
                              handleFilterChange(
                                "condition",
                                cond,
                                e.target.checked
                              )
                            }
                          />
                          <span>{toTitleCase(cond.trim())}</span>
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
                  {filteredInstruments.length === 0 ? (
                    <div className="no-data-message">No data to display.</div>
                  ) : (
                    filteredInstruments
                      .sort((a, b) => {
                        const aName = a.instrument?.trim() || "";
                        const bName = b.instrument?.trim() || "";
                        if (!aName && !bName) return 0;
                        if (!aName) return 1;
                        if (!bName) return -1;
                        return aName.localeCompare(bName);
                      })

                      .map((item) => (
                        <div
                          key={item.id}
                          className={`table-row ${
                            editingRowId === item.id ? "editing-row" : ""
                          }`}
                        >
                          <div className="row-cell name-column">
                            <div className="item-details">
                              <button
                                className="item-name"
                                onClick={() => handleViewDetails(item)}
                              >
                                {item.instrument}
                              </button>
                              <div className="item-brand">{item.brand}</div>
                            </div>
                          </div>
                          <div className="row-cell  hide-mobile">
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
                          <div className="row-cell hide-mobile">
                            {editingRowId === item.id ? (
                              <input
                                type="text"
                                value={editingData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                className="inline-edit-input"
                              />
                            ) : (
                              item.description
                            )}
                          </div>
                          <div className="row-cell" data-label="Location">
                            {editingRowId === item.id ? (
                              <select
                                value={editingData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                className="inline-edit-select"
                              >
                                {locationList.map((loc) => (
                                  <option key={loc || "__blank__"} value={loc}>
                                    {loc || " "}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              item.location
                            )}
                          </div>

                          <div className="row-cell" data-label="Status">
                            {editingRowId === item.id ? (
                              <select
                                value={editingData.status}
                                onChange={(e) =>
                                  handleInputChange("status", e.target.value)
                                }
                                className="inline-edit-select"
                              >
                                {statusList.map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span
                                className={`status-badge ${getStatusColor(
                                  item.status
                                )}`}
                              >
                                {item.status}
                              </span>
                            )}
                          </div>
                          <div className="row-cell" data-label="Condition">
                            {editingRowId === item.id ? (
                              <select
                                value={editingData.condition}
                                onChange={(e) =>
                                  handleInputChange("condition", e.target.value)
                                }
                                className="inline-edit-select"
                              >
                                {conditionList.map((condition) => (
                                  <option key={condition} value={condition}>
                                    {condition}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span
                                className={`status-badge ${getConditionColor(
                                  item.condition
                                )}`}
                              >
                                {item.condition}
                              </span>
                            )}
                          </div>
                          <div className="row-cell">
                            {editingRowId === item.id ? (
                              <div className="editing-actions">
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
                                  className="btn-icon"
                                  onClick={() => handleInlineEdit(item)}
                                  title="Edit"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  className="btn-icon delete"
                                  onClick={() => handleDelete(item.id)}
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {detailItem && (
          <DetailPopup
            item={detailItem}
            onClose={() => setDetailItem(null)}
            title="Instrument Details"
            fields={[
              {
                label: "Name",
                name: "instrument",
                value: detailItem.instrument,
                type: "text",
              },
              { name: "brand", label: "Brand", value: detailItem.brand },
              {
                label: "Description",
                name: "description",
                value: detailItem.description,
                type: "text",
              },
              {
                label: "Capacity",
                name: "capacity",
                value: detailItem.capacity,
                type: "text",
              },
              {
                label: "Quantity",
                name: "quantity",
                value: String(detailItem.quantity || ""),
                type: "number",
              },
              {
                label: "Status",
                name: "status",
                value: detailItem.status,
                type: "text",
              },
              {
                label: "Condition",
                name: "condition",
                value: detailItem.condition,
                type: "text",
              },
              {
                label: "Location",
                name: "location",
                value: detailItem.location,
                type: "text",
              },
              {
                label: "Remarks",
                name: "remarks",
                value: detailItem.remarks,
                type: "text",
              },
            ]}
            onSave={async (formData) => {
              const raw = Object.fromEntries(formData.entries());

              const payload = {
                name: raw.instrument,
                brand: raw.brand,
                description: raw.description,
                location: raw.location,
                quantity: parseInt(raw.quantity),
                unit: detailItem.unit || "pcs",
                capacity: raw.capacity,
                status: raw.status,
                condition: raw.condition,
                remarks: raw.remarks,
              };

              const res = await fetch(`${API_URL}/${detailItem.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });

              if (res.ok) {
                await fetchInstruments();
                setDetailItem(null);
              } else {
                console.error("Detail save failed", await res.text());
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Instruments;
