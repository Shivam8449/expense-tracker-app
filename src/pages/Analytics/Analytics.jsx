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
  
  const breakdown = useMemo(() => {
    return getCategoryBreakdown(year, month)
  }, [getCategoryBreakdown, year, month])
  
  const monthlyTrend = useMemo(() => {
    return getMonthlyTrend()
  }, [getMonthlyTrend])
  
  const totalExpenses = useMemo(() => {
    return getTransactionsByMonth(year, month)
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)
  }, [getTransactionsByMonth, year, month])

  const previousMonth = new Date(year, month - 1, 1)
  const previousMonthExpenses = useMemo(() => {
    return getTransactionsByMonth(previousMonth.getFullYear(), previousMonth.getMonth())
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)
  }, [getTransactionsByMonth, previousMonth])

  const percentChange = previousMonthExpenses > 0
    ? ((totalExpenses - previousMonthExpenses) / previousMonthExpenses * 100).toFixed(1)
    : 0

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const pieData = breakdown.map((item, index) => ({
    name: getCategoryById(item.category).name,
    value: item.amount,
    color: COLORS[index % COLORS.length]
  }))

  const topCategory = breakdown[0]

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

      {breakdown.length > 0 ? (
        <>
          <div className="total-card slide-up">
            <div className="total-label">Total Expenditure</div>
            <div className="total-amount">{formatCurrency(totalExpenses)}</div>
            <div className={`total-comparison ${Number(percentChange) <= 0 ? 'positive' : 'negative'}`}>
              {Number(percentChange) <= 0 ? '↓' : '↑'} {Math.abs(percentChange)}% {Number(percentChange) <= 0 ? 'less' : 'more'} than {previousMonth.toLocaleString('default', { month: 'long' })}
            </div>
          </div>

          <div className="chart-section slide-up">
            <div className="donut-chart-container">
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
                <div className="donut-label">{topCategory ? getCategoryById(topCategory.category).name : ''}</div>
              </div>
            </div>

            <div className="category-breakdown">
              <div className="breakdown-title">Spending Breakdown</div>
              <div className="breakdown-list">
                {breakdown.slice(0, 5).map((item, index) => (
                  <div key={item.category} className="breakdown-item">
                    <div 
                      className="breakdown-color" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="breakdown-name">
                      {getCategoryById(item.category).name}
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
                    dataKey="total" 
                    fill="#e5e5e5" 
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
