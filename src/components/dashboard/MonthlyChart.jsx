import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useApp } from '../../context/AppContext'
import { getMonthlyData, formatCurrency } from '../../utils/helpers'
import s from './MonthlyChart.module.css'

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className={s.tip}>
      <p className={s.tipLabel}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} className={s.tipRow}>
          <span className={s.tipDot} style={{ background: p.color }}/>
          <span className={s.tipName}>{p.name}</span>
          <span className={s.tipVal}>{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyChart() {
  const { state } = useApp()
  const data   = getMonthlyData(state.transactions)
  const isDark = state.theme === 'dark'

  const green = isDark ? '#3fb950' : '#16a34a'
  const red   = isDark ? '#f85149' : '#ef4444'
  const grid  = isDark ? '#21262d' : '#e8eaf0'
  const axis  = isDark ? '#6e7681' : '#9ca3af'

  return (
    <div className={s.card}>
      <div className={s.head}>
        <div>
          <h3 className={s.title}>Monthly Earnings</h3>
          <p className={s.sub}>Income trend</p>
        </div>
        <div className={s.pills}>
          <span className={s.pill} style={{ background: isDark ? 'rgba(63,185,80,.12)' : '#f0fdf4', color: green, border:`1px solid ${isDark ? 'rgba(63,185,80,.25)' : 'rgba(22,163,74,.18)'}` }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:green, display:'inline-block' }}/>
            Income
          </span>
          <span className={s.pill} style={{ background: isDark ? 'rgba(248,81,73,.1)' : '#fef2f2', color: red, border:`1px solid ${isDark ? 'rgba(248,81,73,.25)' : 'rgba(220,38,38,.18)'}` }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:red, display:'inline-block' }}/>
            Expense
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top:6, right:4, left:0, bottom:0 }}>
          <defs>
            <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={green} stopOpacity={isDark?.28:.12}/>
              <stop offset="100%" stopColor={green} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={red}   stopOpacity={isDark?.22:.08}/>
              <stop offset="100%" stopColor={red}   stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke={grid} strokeDasharray="4 4" vertical={false}/>
          <XAxis dataKey="month" tick={{ fontSize:11, fill:axis, fontFamily:'Inter' }} axisLine={false} tickLine={false} dy={5}/>
          <YAxis tick={{ fontSize:10, fill:axis }} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}k`} width={42}/>
          <Tooltip content={<Tip/>}/>
          <Area type="monotone" dataKey="income"  name="Income"  stroke={green} strokeWidth={2.5} fill="url(#gI)" dot={false} activeDot={{ r:4, fill:green, strokeWidth:0 }}/>
          <Area type="monotone" dataKey="expense" name="Expense" stroke={red}   strokeWidth={2}   fill="url(#gE)" dot={false} activeDot={{ r:4, fill:red,   strokeWidth:0 }}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}