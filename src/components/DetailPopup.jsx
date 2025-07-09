import { createPortal } from "react-dom";
import { X } from "lucide-react";

const DetailPopup = ({ item, onClose, fields, title }) => {
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
          </div>
          <button className="detail-close-right" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="detail-content-right">
          <div className="detail-info-right">
            {fields.map((field, index) => (
              <div key={index} className="detail-row-right">
                <span className="detail-label-right">{field.label}</span>
                <span className="detail-value-right">
                  {field.value || "N/A"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DetailPopup;
