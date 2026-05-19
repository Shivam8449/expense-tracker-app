import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { useTransactions } from '../../context/TransactionContext'
import { CATEGORIES, INCOME_CATEGORIES } from '../../data/categories'
import './AddTransaction.css'

export default function AddTransaction({ onClose, editTransaction = null }) {
  const { addTransaction, updateTransaction, deleteTransaction } = useTransactions()
  
  const [type, setType] = useState(editTransaction?.type || 'expense')
  const [amount, setAmount] = useState(editTransaction?.amount?.toString() || '')
  const [category, setCategory] = useState(editTransaction?.category || '')
  const [date, setDate] = useState(editTransaction?.date || new Date().toISOString().split('T')[0])
  const [name, setName] = useState(editTransaction?.name || '')
  const [note, setNote] = useState(editTransaction?.note || '')
  const [errors, setErrors] = useState({})

  const categories = type === 'income' ? INCOME_CATEGORIES : CATEGORIES

  useEffect(() => {
    if (!editTransaction) {
      setCategory('')
    }
  }, [type, editTransaction])

  const validateForm = () => {
    const newErrors = {}
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount'
    }
    if (!category) {
      newErrors.category = 'Please select a category'
    }
    if (!name.trim()) {
      newErrors.name = 'Please enter a name'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const transactionData = {
      type,
      amount: parseFloat(amount),
      category,
      date,
      name: name.trim(),
      note: note.trim()
    }

    if (editTransaction) {
      updateTransaction({ ...transactionData, id: editTransaction.id })
    } else {
      addTransaction(transactionData)
    }

    onClose()
  }

  const handleDelete = () => {
    if (editTransaction && window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(editTransaction.id)
      onClose()
    }
  }

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value)
    }
  }

  return (
    <div className="add-transaction">
      <div className="type-toggle">
        <button
          className={`type-button ${type === 'expense' ? 'active' : ''}`}
          onClick={() => setType('expense')}
        >
          EXPENSE
        </button>
        <button
          className={`type-button ${type === 'income' ? 'active' : ''}`}
          onClick={() => setType('income')}
        >
          INCOME
        </button>
      </div>

      <div className="amount-section">
        <div className="amount-input-wrapper">
          <span className="currency-symbol">$</span>
          <input
            type="text"
            inputMode="decimal"
            className="amount-input"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        {errors.amount && <div className="error-text">{errors.amount}</div>}
      </div>

      <div className="form-section">
        <div className="form-label">Category</div>
        <div className="category-grid">
          {categories.map(cat => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                className={`category-item ${category === cat.id ? 'selected' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                <div className="category-icon">
                  <Icon 
                    size={20} 
                    color={category === cat.id ? 'white' : cat.color} 
                  />
                </div>
                <span className="category-name">{cat.name}</span>
              </button>
            )
          })}
        </div>
        {errors.category && <div className="error-text">{errors.category}</div>}
      </div>

      <div className="form-section">
        <div className="form-label">Name</div>
        <input
          type="text"
          className="name-input"
          placeholder="Transaction name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="error-text">{errors.name}</div>}
      </div>

      <div className="form-section">
        <div className="form-label">Date</div>
        <div className="date-input-wrapper">
          <input
            type="date"
            className="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Calendar size={20} className="date-input-icon" />
        </div>
      </div>

      <div className="form-section">
        <div className="form-label">Note</div>
        <textarea
          className="note-input"
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="form-section">
        <div className="receipt-preview" />
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        {editTransaction ? 'Update Transaction' : 'Save Transaction'}
      </button>

      {editTransaction && (
        <button 
          className="submit-button" 
          onClick={handleDelete}
          style={{ 
            marginTop: '12px', 
            backgroundColor: 'transparent', 
            color: 'var(--color-expense)',
            border: '1px solid var(--color-expense)'
          }}
        >
          Delete Transaction
        </button>
      )}
    </div>
  )
}
