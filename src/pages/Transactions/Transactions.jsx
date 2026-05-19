import { useState, useMemo } from 'react'
import { Search, FileText } from 'lucide-react'
import { useTransactions } from '../../context/TransactionContext'
import TransactionCard from '../../components/TransactionCard/TransactionCard'
import { ALL_FILTER_CATEGORIES } from '../../data/categories'
import { groupTransactionsByDate } from '../../utils/helpers'
import './Transactions.css'

export default function Transactions({ onTransactionClick }) {
  const { transactions } = useTransactions()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = activeFilter === 'all' || t.category === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [transactions, searchQuery, activeFilter])

  const groupedTransactions = useMemo(() => {
    return groupTransactionsByDate(filteredTransactions)
  }, [filteredTransactions])

  return (
    <div className="transactions-page">
      <div className="search-container">
        <div className="search-bar">
          <Search size={20} color="var(--color-secondary)" />
          <input
            type="text"
            placeholder="Search transactions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-chips">
        {ALL_FILTER_CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`filter-chip ${activeFilter === category.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="transactions-content">
        {Object.keys(groupedTransactions).length > 0 ? (
          Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date} className="date-group slide-up">
              <div className="date-label">{date}</div>
              <div className="date-transactions">
                {transactions.map(transaction => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onClick={onTransactionClick}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-transactions">
            <div className="empty-transactions-icon">
              <FileText size={32} color="var(--color-secondary)" />
            </div>
            <h3>No transactions found</h3>
            <p>
              {searchQuery || activeFilter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Add your first transaction to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
