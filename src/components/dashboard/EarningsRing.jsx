import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import { getSummaryStats, formatCurrency } from '../../utils/helpers'
import s from './EarningsRing.module.css'

export default function EarningsRing() {
  const { state } = useApp()
  const { balance, income, expense } = getSummaryStats(state.transactions)
  const goal = income * 1.2 // hypothetical goal = 120% of income

  const data = [
    { name: 'Earnings', value: income  },
    { name: 'Goals',    value: Math.max(goal - income, 0) },
  ]

  const pct = Math.min((income / goal) * 100, 100).toFixed(0)

  return (
    <div className={s.card}>
      <h3 className={s.title}>Earnings</h3>

      <div className={s.ringWrap}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={58} outerRadius={80}
              startAngle={90} endAngle={-270}
              paddingAngle={2} dataKey="value" stroke="none"
            >
              <Cell fill="#1a1a2e" />
              <Cell fill="#e8eaf0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className={s.center}>
          <p className={s.centerVal}>{formatCurrency(income, true)}</p>
          <p className={s.centerLabel}>{pct}% of goal</p>
        </div>
      </div>

      <div className={s.legend}>
        <span className={s.legItem}>
          <span className={s.legDot} style={{ background:'#1a1a2e' }}/>Earnings
        </span>
        <span className={s.legItem}>
          <span className={s.legDot} style={{ background:'#d1d5db' }}/>Goals
        </span>
      </div>
    </div>
  )
}