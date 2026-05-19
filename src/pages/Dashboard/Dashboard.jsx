import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { useTransactions } from '../../context/TransactionContext'
import TransactionCard from '../../components/TransactionCard/TransactionCard'
import { formatCurrency } from '../../utils/helpers'
import './Dashboard.css'

export default function Dashboard({ onViewAll, onTransactionClick }) {
  const { transactions, getBalance, getTotalIncome, getTotalExpenses } = useTransactions()

  const balance = getBalance()
  const income = getTotalIncome()
  const expenses = getTotalExpenses()
  const recentTransactions = transactions.slice(0, 4)

  const previousMonthBalance = balance * 0.976
  const percentChange = previousMonthBalance !== 0 
    ? ((balance - previousMonthBalance) / Math.abs(previousMonthBalance) * 100).toFixed(1)
    : 0

  return (
    <div className="dashboard">
      <div className="balance-section slide-up">
        <div className="balance-label">Total Balance</div>
        <div className="balance-amount">{formatCurrency(balance)}</div>
        <div className={`balance-change ${Number(percentChange) >= 0 ? 'positive' : ''}`}>
          {Number(percentChange) >= 0 ? '↑' : '↓'} {Math.abs(percentChange)}% this month
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card income slide-up">
          <div className="summary-card-icon">
            <TrendingUp color="#22c55e" />
            <span className="summary-label">INCOME</span>
          </div>
          <div className="summary-amount">{formatCurrency(income)}</div>
        </div>
        <div className="summary-card expense slide-up">
          <div className="summary-card-icon">
            <TrendingDown color="#ef4444" />
            <span className="summary-label">EXPENSES</span>
          </div>
          <div className="summary-amount">{formatCurrency(expenses)}</div>
        </div>
      </div>

      <div className="analytics-banner slide-up">
        <div className="analytics-banner-title">Spend Analytics</div>
        <div className="analytics-banner-text">
          You spent 12% less on dining this week.
        </div>
      </div>

      <div className="recent-activity">
        <div className="section-header">
          <h2 className="section-title">Recent Activity</h2>
          <button className="view-all" onClick={onViewAll}>VIEW ALL</button>
        </div>
        
        {recentTransactions.length > 0 ? (
          <div className="transactions-list">
            {recentTransactions.map((transaction, index) => (
              <div key={transaction.id} className="slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <TransactionCard 
                  transaction={transaction}
                  onClick={onTransactionClick}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Wallet size={28} color="var(--color-secondary)" />
            </div>
            <div className="empty-state-title">No transactions yet</div>
            <div className="empty-state-text">
              Add your first transaction to get started
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
