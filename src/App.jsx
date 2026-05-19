import { useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { TransactionProvider } from './context/TransactionContext'
import Header from './components/Header/Header'
import BottomNavigation from './components/BottomNavigation/BottomNavigation'
import Dashboard from './pages/Dashboard/Dashboard'
import Transactions from './pages/Transactions/Transactions'
import AddTransaction from './pages/AddTransaction/AddTransaction'
import Analytics from './pages/Analytics/Analytics'
import './styles/App.css'

function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editTransaction, setEditTransaction] = useState(null)

  const getActiveTab = () => {
    switch (location.pathname) {
      case '/transactions':
        return 'transactions'
      case '/history':
        return 'history'
      case '/analytics':
        return 'analytics'
      default:
        return 'dashboard'
    }
  }

  const activeTab = getActiveTab()

  const handleAddClick = () => {
    setEditTransaction(null)
    setShowAddModal(true)
  }

  const handleTransactionClick = (transaction) => {
    setEditTransaction(transaction)
    setShowAddModal(true)
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setEditTransaction(null)
  }

  const handleTabChange = (tab) => {
    const routes = {
      dashboard: '/',
      transactions: '/transactions',
      history: '/history',
      analytics: '/analytics'
    }

    navigate(routes[tab] || '/')
  }

  return (
    <div className="app">
      <Header title="Financial Serenity" />
      
      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={(
              <Dashboard 
                onViewAll={() => navigate('/transactions')}
                onTransactionClick={handleTransactionClick}
              />
            )}
          />
          <Route
            path="/transactions"
            element={<Transactions onTransactionClick={handleTransactionClick} />}
          />
          <Route
            path="/history"
            element={<Transactions onTransactionClick={handleTransactionClick} />}
          />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAddClick={handleAddClick}
      />

      {showAddModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">
                {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
              </span>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <AddTransaction 
                onClose={handleCloseModal}
                editTransaction={editTransaction}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <TransactionProvider>
      <AppContent />
    </TransactionProvider>
  )
}
