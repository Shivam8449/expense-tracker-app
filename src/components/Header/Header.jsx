import { Menu, X, ChevronLeft } from 'lucide-react'
import './Header.css'

export default function Header({ 
  title = 'Financial Serenity', 
  showBack = false, 
  showClose = false,
  onBack,
  onClose 
}) {
  return (
    <header className="header">
      <div className="header-left">
        {showBack ? (
          <button className="back-button" onClick={onBack} aria-label="Go back">
            <ChevronLeft size={24} />
          </button>
        ) : showClose ? (
          <button className="close-button" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        ) : (
          <button className="menu-button" aria-label="Menu">
            <Menu size={24} />
          </button>
        )}
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="avatar">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User avatar" 
          />
        </div>
      </div>
    </header>
  )
}
