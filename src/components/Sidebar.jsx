import {
  FlaskConical,
  Package,
  Wrench,
  Microscope,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "chemical-reagents", label: "Chemical Reagents", icon: FlaskConical },
    { id: "consumables", label: "Consumables", icon: Package },
    { id: "equipment", label: "Equipment", icon: Wrench },
    { id: "instruments", label: "Instruments", icon: Microscope },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!isCollapsed && <h2 className="font-poppins">Lactic Acid Lab.</h2>}
          <button
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${
                  activeSection === item.id ? "active" : ""
                } font-poppins`}
                onClick={() => setActiveSection(item.id)}
                title={isCollapsed ? item.label : ""}
              >
                <Icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="mobile-sidebar-header">
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="mobile-title font-poppins">Lactic Acid Lab.</h2>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-sidebar-drawer ${isMobileOpen ? "open" : ""}`}>
        <button
          className="mobile-close-btn"
          onClick={() => setIsMobileOpen(false)}
        >
          <X size={20} />
        </button>

        <nav className="mobile-sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${
                  activeSection === item.id ? "active" : ""
                } font-poppins`}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileOpen(false);
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
