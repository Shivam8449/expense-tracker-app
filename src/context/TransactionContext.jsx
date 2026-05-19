import { createContext, useContext, useReducer, useEffect } from 'react'
import { sampleTransactions } from '../data/sampleData'

const TransactionContext = createContext()

const initialState = {
  transactions: [],
  loading: true
}

function transactionReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false }
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        )
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      }
    default:
      return state
  }
}

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState)

  useEffect(() => {
    const stored = localStorage.getItem('transactions')
    if (stored) {
      const parsed = JSON.parse(stored)
      // If localStorage has data, use it; otherwise load sample data
      if (parsed.length > 0) {
        dispatch({ type: 'SET_TRANSACTIONS', payload: parsed })
      } else {
        dispatch({ type: 'SET_TRANSACTIONS', payload: sampleTransactions })
      }
    } else {
      // First time visitor - load sample data
      dispatch({ type: 'SET_TRANSACTIONS', payload: sampleTransactions })
    }
  }, [])

  useEffect(() => {
    if (!state.loading) {
      localStorage.setItem('transactions', JSON.stringify(state.transactions))
    }
  }, [state.transactions, state.loading])

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction })
  }

  const updateTransaction = (transaction) => {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction })
  }

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }

  const getBalance = () => {
    return state.transactions.reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc - t.amount
    }, 0)
  }

  const getTotalIncome = () => {
    return state.transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)
  }

  const getTotalExpenses = () => {
    return state.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)
  }

  const getTransactionsByMonth = (year, month) => {
    return state.transactions.filter(t => {
      const date = new Date(t.date)
      return date.getFullYear() === year && date.getMonth() === month
    })
  }

  const getCategoryBreakdown = (year, month, type = 'expense') => {
    const monthTransactions = getTransactionsByMonth(year, month)
      .filter(t => t.type === type)
    
    const total = monthTransactions.reduce((acc, t) => acc + t.amount, 0)
    
    const breakdown = monthTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

    return Object.entries(breakdown).map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0
    })).sort((a, b) => b.amount - a.amount)
  }

  const getMonthlyTrend = () => {
    const now = new Date()
    const months = []
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthTransactions = getTransactionsByMonth(date.getFullYear(), date.getMonth())
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0)
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0)
      
      months.push({
        month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
        income,
        expenses,
        balance: income - expenses
      })
    }
    
    return months
  }

  return (
    <TransactionContext.Provider value={{
      transactions: state.transactions,
      loading: state.loading,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getBalance,
      getTotalIncome,
      getTotalExpenses,
      getTransactionsByMonth,
      getCategoryBreakdown,
      getMonthlyTrend
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider')
  }
  return context
}
