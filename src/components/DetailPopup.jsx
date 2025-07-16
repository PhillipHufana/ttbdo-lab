// src/components/DetailPopup.jsx

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Pencil } from "lucide-react";

const DetailPopup = ({ item, onClose, fields, title, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState(fields);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedFields(fields);
    setErrors({});
    setIsEditing(false);
  }, [fields]);

  const validateField = (field, value) => {
    if (field.type === "number" && isNaN(Number(value))) {
      return "Must be a number";
    }
    if (field.type === "date" && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return "Invalid date format (YYYY-MM-DD)";
    }
    return "";
  };

  const handleChange = (index, newValue) => {
    const updated = [...editedFields];
    updated[index].value = newValue;
    setEditedFields(updated);

    const error = validateField(updated[index], newValue);
    setErrors((prev) => ({ ...prev, [updated[index].name]: error }));
  };

  const handleFileChange = (file, index) => {
    const updated = [...editedFields];
    updated[index].value = file;
    setEditedFields(updated);
  };

  const handleSave = () => {
    const newErrors = {};
    editedFields.forEach((field) => {
      const error = validateField(field, field.value);
      if (error) newErrors[field.name] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    editedFields.forEach((field) => {
      if (field.name === "msds_file" && field.value instanceof File) {
        formData.append(field.name, field.value);
      } else {
        formData.append(field.name, field.value?.toString().trim() || "");
      }
    });

    onSave(formData);
    alert("Saved successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedFields(fields);
    setErrors({});
    setIsEditing(false);
  };

  if (!item) return null;

  const resolvedTitle =
    item.chemicalName ||
    item.supplyItem ||
    item.name ||
    item.instrument ||
    "Item Details";

  return createPortal(
    <div className="detail-overlay-right" onClick={onClose}>
      <div className="detail-panel-right" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-title-section">
            <h2 className="detail-title">{title || resolvedTitle}</h2>
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
            <div key={field.name} className="detail-row-right">
              <span className="detail-label-right">{field.label}</span>

              {isEditing ? (
                field.name === "msds_file" ? (
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      handleFileChange(e.target.files[0], index)
                    }
                    className="detail-input-right"
                  />
                ) : field.type === "select" ? (
                  <select
                    className="detail-input-right"
                    value={field.value || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    className="detail-input-right"
                    value={field.value || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                )
              ) : field.name === "msds_file" ? (
                field.value instanceof File ? (
                  <span className="detail-value-right">
                    {field.value.name}
                  </span>
                ) : field.value ? (
                  <span
                    className="detail-value-right"
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/uploads/${field.value}`,
                        "_blank",
                        "noopener"
                      )
                    }
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {field.value.split('-').slice(1).join('-')}
                  </span>
                ) : (
                  <span className="detail-value-right">N/A</span>
                )
              ) : (
                <span className="detail-value-right">
                  {field.value || "N/A"}
                </span>
              )}

              {errors[field.name] && (
                <span className="error-text">{errors[field.name]}</span>
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
