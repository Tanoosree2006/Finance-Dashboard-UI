import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts'
import { useApp }             from '../context/AppContext'
import { getInsights, formatCurrency } from '../utils/helpers'
import { CATEGORY_COLORS }    from '../data/mockData'
import s from './Insights.module.css'

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className={s.tip}>
      <p className={s.tipLabel}>{label}</p>
      {payload.map((p,i) => (
        <div key={i} className={s.tipRow}>
          <span className={s.tipDot} style={{ background: p.fill }}/>
          <span className={s.tipName}>{p.name}</span>
          <span className={s.tipVal}>{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  )
}

export default function Insights() {
  const { state } = useApp()
  const {
    balance, income, expense,
    monthly, categories, current, previous,
    savingsRate, expChange, topCategory
  } = getInsights(state.transactions)

  const isDark = state.theme === 'dark'
  const grid   = isDark ? '#21262d' : '#e8eaf0'
  const axis   = isDark ? '#6e7681' : '#9ca3af'

  const kpis = [
    { label:'Savings Rate',  value:`${savingsRate}%`, sub:'of income this month', cls: parseFloat(savingsRate)>0 ? 'green' : 'red'   },
    { label:'Top Category',  value: topCategory?.name || '—', sub: topCategory ? formatCurrency(topCategory.value, true)+' spent' : 'No data', cls:'amber'  },
    { label:'This Month In', value: formatCurrency(current?.income||0, true), sub: previous ? `vs ${formatCurrency(previous.income,true)} prev` : 'No prev', cls:'blue'   },
    { label:'Expense Change',value:`${expChange > 0 ? '+' : ''}${expChange}%`, sub:'vs last month', cls: parseFloat(expChange)>0 ? 'red' : 'green' },
  ]

  const smartInsight = (() => {
    if (!current) return 'Add more transactions to unlock insights.'
    if (parseFloat(savingsRate) > 30) return `Excellent! You saved ${savingsRate}% of income this month. Your top category is ${topCategory?.name || 'unknown'}.`
    if (parseFloat(savingsRate) < 0)  return `You spent more than earned this month. Biggest category: ${topCategory?.name}. Consider reducing ${topCategory?.name} spending.`
    return `Your biggest expense is ${topCategory?.name} at ${formatCurrency(topCategory?.value||0,true)}. You saved ${savingsRate}% this month.`
  })()

  return (
    <div className={s.page}>
      <h2 className={s.heading}>Insights</h2>

      {/* KPI cards */}
      <div className={s.kpiGrid}>
        {kpis.map((k, i) => (
          <div key={i} className={`${s.kpi} ${s[k.cls]}`} style={{ animationDelay:`${i*.07}s` }}>
            <p className={s.kpiLabel}>{k.label}</p>
            <p className={s.kpiValue}>{k.value}</p>
            <p className={s.kpiSub}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Smart Insight */}
      {smartInsight && (
        <div className={s.insightBanner}>
          <span className={s.insightIcon}>💡</span>
          <div>
            <p className={s.insightTitle}>Smart Insight</p>
            <p className={s.insightText}>{smartInsight}</p>
          </div>
        </div>
      )}

      {/* Monthly bar chart */}
      <div className={s.chartCard}>
        <h3 className={s.chartTitle}>Monthly Overview</h3>
        <p className={s.chartSub}>Income vs Expense by month</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthly} margin={{ top:6, right:6, left:0, bottom:0 }}>
            <CartesianGrid stroke={grid} strokeDasharray="4 4" vertical={false}/>
            <XAxis dataKey="month" tick={{ fontSize:12, fill:axis }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize:11, fill:axis }} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}k`} width={42}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="income"  name="Income"  fill={isDark?'#3fb950':'#22c55e'} radius={[4,4,0,0]} maxBarSize={36}/>
            <Bar dataKey="expense" name="Expense" fill={isDark?'#f85149':'#ef4444'} radius={[4,4,0,0]} maxBarSize={36}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category breakdown */}
      <div className={s.chartCard}>
        <h3 className={s.chartTitle}>Category Breakdown</h3>
        <p className={s.chartSub}>Total expense per category</p>
        <div className={s.bars}>
          {categories.map(item => (
            <div key={item.name} className={s.barRow}>
              <span className={s.barName}>{item.name}</span>
              <div className={s.track}>
                <div className={s.fill} style={{
                  width:`${(item.value/categories[0].value)*100}%`,
                  background: CATEGORY_COLORS[item.name]||'#94a3b8'
                }}/>
              </div>
              <span className={s.barVal}>{formatCurrency(item.value, true)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}