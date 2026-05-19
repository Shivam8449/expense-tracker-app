import { LayoutGrid, FileText, Clock, BarChart3, Plus } from 'lucide-react'
import './BottomNavigation.css'

export default function BottomNavigation({ activeTab, onTabChange, onAddClick }) {
  const tabs = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'transactions', icon: FileText, label: 'Transactions' },
    { id: 'add', icon: Plus, label: 'Add' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' }
  ]

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        if (tab.id === 'add') {
          return (
            <button
              key={tab.id}
              className="add-button"
              onClick={onAddClick}
              aria-label="Add transaction"
            >
              <Plus size={28} />
            </button>
          )
        }
        
        return (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
          >
            <span className="nav-item-icon">
              <tab.icon size={24} />
            </span>
          </button>
        )
      })}
    </nav>
  )
}
