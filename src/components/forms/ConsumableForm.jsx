import { useState, useEffect } from "react";

const ConsumableForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    supplyItem: "",
    brand: "",
    description: "",
    quantity: "",
    dateReceived: "",
    dateOpened: "",
    expirationDate: "",
    receivedBy: "",
    poNo: "",
    price: "",
    totalPrice: "",
    supplier: "",
    location: "",
    remainingQuantity: "",
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

  const locations = [
    "Lab Room 1",
    "Lab Room 2",
    "Instrument Room",
    "Shelf 2b",
    "Calibration Lab",
    "Table 3, Drawer 4",
  ];

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-grid">
        <div className="form-group">
          <label>
            Supply Item <span className="required">*</span>
          </label>
          <input
            type="text"
            name="supplyItem"
            value={formData.supplyItem}
            onChange={handleChange}
            required
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
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>
            Quantity <span className="required">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Remaining Quantity</label>
          <input
            type="number"
            name="remainingQuantity"
            value={formData.remainingQuantity}
            onChange={handleChange}
          />
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
          <label>
            Date Opened <span className="required">*</span>
          </label>
          <input
            type="date"
            name="dateOpened"
            value={formData.dateOpened}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Expiration Date <span className="required">*</span>
          </label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            required
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
          <label>PO No.</label>
          <input
            type="text"
            name="poNo"
            value={formData.poNo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Received By</label>
          <input
            type="text"
            name="receivedBy"
            value={formData.receivedBy}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Total Price</label>
          <input
            type="number"
            step="0.01"
            name="totalPrice"
            value={formData.totalPrice}
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

export default ConsumableForm;
