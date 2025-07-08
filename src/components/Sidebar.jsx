"use client"

import { FlaskConical, Package, Wrench, Microscope, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      id: "chemical-reagents",
      label: "Chemical Reagents",
      icon: FlaskConical,
    },
    {
      id: "consumables",
      label: "Consumables",
      icon: Package,
    },
    {
      id: "equipment",
      label: "Equipment",
      icon: Wrench,
    },
    {
      id: "instruments",
      label: "Instruments",
      icon: Microscope,
    },
  ]

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h2>Lactic Acid Lab</h2>}
        <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
              title={isCollapsed ? item.label : ""}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
