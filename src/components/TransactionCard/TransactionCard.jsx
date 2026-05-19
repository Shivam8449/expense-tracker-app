import { getCategoryById } from '../../data/categories'
import { formatCurrency } from '../../utils/helpers'
import './TransactionCard.css'

export default function TransactionCard({ transaction, onClick }) {
  const category = getCategoryById(transaction.category, transaction.type)
  const Icon = category.icon

  return (
    <div className="transaction-card" onClick={() => onClick?.(transaction)}>
      <div className="transaction-icon" style={{ backgroundColor: `${category.color}15` }}>
        <Icon size={22} color={category.color} />
      </div>
      <div className="transaction-info">
        <div className="transaction-name">{transaction.name}</div>
        <div className="transaction-category">{category.name}</div>
      </div>
      <div className="transaction-amount-wrapper">
        <div className={`transaction-amount ${transaction.type}`}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
      </div>
    </div>
  )
}
