"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import ChemicalReagents from "./components/ChemicalReagents"
import Consumables from "./components/Consumables"
import Equipment from "./components/Equipment"
import Instruments from "./components/Instruments"

function App() {
  const [activeSection, setActiveSection] = useState("chemical-reagents")

  const renderContent = () => {
    switch (activeSection) {
      case "chemical-reagents":
        return <ChemicalReagents />
      case "consumables":
        return <Consumables />
      case "equipment":
        return <Equipment />
      case "instruments":
        return <Instruments />
      default:
        return <ChemicalReagents />
    }
  }

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="main-content">{renderContent()}</main>
    </div>
  )
}

export default App
