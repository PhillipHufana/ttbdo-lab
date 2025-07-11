import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Pencil } from "lucide-react";

const DetailPopup = ({ item, onClose, fields, title, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState(fields);

  const handleChange = (index, newValue) => {
    const updated = [...editedFields];
    updated[index].value = newValue;
    setEditedFields(updated);
  };

  const handleSave = () => {
    onSave(editedFields);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedFields(fields); // Reset to original
    setIsEditing(false);
  };

  if (!item) return null;

  return createPortal(
    <div className="detail-overlay-right" onClick={onClose}>
      <div className="detail-panel-right" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-title-section">
            <h2 className="detail-title">
              {item.chemicalName ||
                item.supplyItem ||
                item.equipment ||
                item.instrument ||
                "Item Details"}
            </h2>
            {!isEditing && (
              <button
                className="detail-edit-button"
                onClick={() => setIsEditing(true)}
              >
                <Pencil size={16} />
              </button>
            )}
          </div>
          <button className="detail-close-right" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="detail-content-right">
          <div className="detail-info-right">
            {editedFields.map((field, index) => (
              <div key={index} className="detail-row-right">
                <span className="detail-label-right">{field.label}</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="detail-input-right"
                    value={field.value || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                ) : (
                  <span className="detail-value-right">
                    {field.value || "N/A"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="detail-button-group">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DetailPopup;
