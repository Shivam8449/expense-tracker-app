import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, PieChart as PieChartIcon } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { useTransactions } from '../../context/TransactionContext'
import { getCategoryById } from '../../data/categories'
import { formatCurrency, getMonthName } from '../../utils/helpers'
import './Analytics.css'

const COLORS = ['#1a1a1a', '#3b82f6', '#8b5cf6', '#22c55e', '#f97316', '#ec4899', '#06b6d4', '#eab308']

export default function Analytics() {
  const { getCategoryBreakdown, getMonthlyTrend, getTransactionsByMonth } = useTransactions()
  
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const monthTransactions = useMemo(() => {
    return getTransactionsByMonth(year, month)
  }, [getTransactionsByMonth, year, month])

  const expenseBreakdown = useMemo(() => {
    return getCategoryBreakdown(year, month, 'expense')
  }, [getCategoryBreakdown, year, month])

  const incomeBreakdown = useMemo(() => {
    return getCategoryBreakdown(year, month, 'income')
  }, [getCategoryBreakdown, year, month])
  
  const monthlyTrend = useMemo(() => {
    return getMonthlyTrend()
  }, [getMonthlyTrend])
  
  const totalExpenses = useMemo(() => {
    return monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)
  }, [monthTransactions])

  const totalIncome = useMemo(() => {
    return monthTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)
  }, [monthTransactions])

  const netTotal = totalIncome - totalExpenses

  const previousMonth = new Date(year, month - 1, 1)
  const previousMonthBalance = useMemo(() => {
    return getTransactionsByMonth(previousMonth.getFullYear(), previousMonth.getMonth())
      .reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0)
  }, [getTransactionsByMonth, previousMonth])

  const percentChange = previousMonthBalance !== 0
    ? ((netTotal - previousMonthBalance) / Math.abs(previousMonthBalance) * 100).toFixed(1)
    : 0

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const visibleBreakdown = expenseBreakdown.length > 0 ? expenseBreakdown : incomeBreakdown
  const visibleBreakdownType = expenseBreakdown.length > 0 ? 'expense' : 'income'
  const hasTransactions = monthTransactions.length > 0

  const pieData = visibleBreakdown.map((item, index) => ({
    name: getCategoryById(item.category, visibleBreakdownType).name,
    value: item.amount,
    color: COLORS[index % COLORS.length]
  }))

  const topCategory = visibleBreakdown[0]

  return (
    <div className="analytics-page">
      <div className="month-navigation slide-up">
        <button className="month-nav-button" onClick={() => navigateMonth(-1)}>
          <ChevronLeft size={24} />
        </button>
        <div className="current-period">
          <div className="period-label">Current Period</div>
          <div className="period-value">{getMonthName(currentDate)}</div>
        </div>
        <button className="month-nav-button" onClick={() => navigateMonth(1)}>
          <ChevronRight size={24} />
        </button>
      </div>

      {hasTransactions ? (
        <>
          <div className="total-card slide-up">
            <div className="total-label">Net Flow</div>
            <div className={`total-amount ${netTotal >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(netTotal)}
            </div>
            <div className={`total-comparison ${Number(percentChange) >= 0 ? 'positive' : 'negative'}`}>
              {Number(percentChange) >= 0 ? '↑' : '↓'} {Math.abs(percentChange)}% than {previousMonth.toLocaleString('default', { month: 'long' })}
            </div>
          </div>

          <div className="monthly-summary slide-up">
            <div className="summary-pill">
              <span>Income</span>
              <strong>{formatCurrency(totalIncome)}</strong>
            </div>
            <div className="summary-pill">
              <span>Expenses</span>
              <strong>{formatCurrency(totalExpenses)}</strong>
            </div>
          </div>

          <div className="chart-section slide-up">
            <div className="donut-chart-container">
              {visibleBreakdown.length > 0 ? (
                <>
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="donut-center">
                    <div className="donut-percentage">{topCategory?.percentage || 0}%</div>
                    <div className="donut-label">
                      {topCategory ? getCategoryById(topCategory.category, visibleBreakdownType).name : ''}
                    </div>
                  </div>
                </>
              ) : (
                <div className="chart-empty-text">No category data</div>
              )}
            </div>

            <div className="category-breakdown">
              <div className="breakdown-title">
                {visibleBreakdownType === 'expense' ? 'Spending Breakdown' : 'Income Breakdown'}
              </div>
              <div className="breakdown-list">
                {visibleBreakdown.slice(0, 5).map((item, index) => (
                  <div key={item.category} className="breakdown-item">
                    <div 
                      className="breakdown-color" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="breakdown-name">
                      {getCategoryById(item.category, visibleBreakdownType).name}
                    </span>
                    <span className="breakdown-amount">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="breakdown-percent">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="view-report-button">
            VIEW DETAILED REPORT
          </button>

          <div className="trend-section slide-up">
            <div className="trend-title">6-Month Trend</div>
            <div className="trend-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend} barSize={24}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#666' }}
                  />
                  <YAxis hide />
                  <Bar 
                    dataKey="income" 
                    fill="#22c55e" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="expenses" 
                    fill="#ef4444" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-analytics">
          <div className="empty-analytics-icon">
            <PieChartIcon size={32} color="var(--color-secondary)" />
          </div>
          <h3>No data for this period</h3>
          <p>Add some transactions to see your analytics</p>
        </div>
      )}
    </div>
  )
}
