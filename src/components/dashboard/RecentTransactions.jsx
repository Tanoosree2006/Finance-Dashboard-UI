import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatCurrency, formatDate } from '../../utils/helpers'
import { CATEGORY_ICONS } from '../../data/mockData'
import s from './RecentTransactions.module.css'

export default function RecentTransactions({ limit = 8 }) {
  const { state } = useApp()
  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)

  return (
    <div className={s.card}>
      <div className={s.head}>
        <h3 className={s.title}>Transactions</h3>
      </div>

      <div className={s.list}>
        {recent.map((tx, i) => (
          <div key={tx.id} className={s.row} style={{ animationDelay:`${i * .03}s` }}>
            <div className={s.rowLeft}>
              <div className={`${s.icon} ${tx.type === 'income' ? s.incIcon : s.expIcon}`}>
                {tx.type === 'income'
                  ? <ArrowUpRight size={14}/>
                  : <ArrowDownRight size={14}/>
                }
              </div>
              <div className={s.info}>
                <p className={s.desc}>{tx.description}</p>
                <p className={s.meta}>{tx.category} · {new Date(tx.date).toLocaleDateString('en-IN', { day:'2-digit', month:'short' })}</p>
              </div>
            </div>
            <p className={`${s.amount} ${tx.type === 'income' ? s.inc : s.exp}`}>
              {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount, true)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}