import { useState } from 'react'
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
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editTransaction, setEditTransaction] = useState(null)

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

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'transactions':
        return 'Financial Serenity'
      case 'analytics':
        return 'Financial Serenity'
      default:
        return 'Financial Serenity'
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            onViewAll={() => setActiveTab('transactions')}
            onTransactionClick={handleTransactionClick}
          />
        )
      case 'transactions':
        return <Transactions onTransactionClick={handleTransactionClick} />
      case 'analytics':
        return <Analytics />
      case 'history':
        return <Transactions onTransactionClick={handleTransactionClick} />
      default:
        return <Dashboard onViewAll={() => setActiveTab('transactions')} />
    }
  }

  return (
    <div className="app">
      <Header title={getHeaderTitle()} />
      
      <main className="app-content">
        {renderContent()}
      </main>

      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
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
