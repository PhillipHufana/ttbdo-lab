"use client"

import { X } from "lucide-react"

const DetailPopup = ({ item, onClose, fields, title }) => {
  return (
    <div className="detail-overlay-right" onClick={onClose}>
      <div className="detail-panel-right" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-title-section">
            <h2 className="detail-title">#{item.id || "Details"}</h2>
            <p className="detail-subtitle">{title}</p>
          </div>
          <button className="detail-close-right" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="detail-content-right">
          <div className="detail-image-section">
            <img
              src={item.image || "/placeholder.svg?height=120&width=120"}
              alt={item.chemicalName || item.supplyItem || item.equipment || item.instrument}
              className="detail-image-right"
            />
          </div>

          <div className="detail-info-right">
            {fields.map((field, index) => (
              <div key={index} className="detail-row-right">
                <span className="detail-label-right">{field.label}</span>
                <span className="detail-value-right">{field.value || "N/A"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPopup
