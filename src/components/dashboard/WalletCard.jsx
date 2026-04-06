import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency } from '../../utils/helpers'
import { useApp } from '../../context/AppContext'
import { getSummaryStats, getMonthlyData } from '../../utils/helpers'
import s from './WalletCard.module.css'

export default function WalletCard() {
  const { state } = useApp()
  const { balance, income, expense } = getSummaryStats(state.transactions)
  const monthly = getMonthlyData(state.transactions)
  const curr = monthly[monthly.length - 1]

  return (
    <div className={s.card}>
      <p className={s.walletLabel}>Wallet</p>
      <p className={s.balance}>{formatCurrency(balance)}</p>

      <div className={s.row}>
        <div className={s.stat}>
          <div className={`${s.statIcon} ${s.incomeIcon}`}>
            <ArrowUpRight size={14}/>
          </div>
          <div>
            <p className={s.statVal}>{formatCurrency(curr?.income || income, true)}</p>
            <p className={s.statLabel}>Income</p>
          </div>
        </div>
        <div className={s.stat}>
          <div className={`${s.statIcon} ${s.expIcon}`}>
            <ArrowDownRight size={14}/>
          </div>
          <div>
            <p className={s.statVal}>{formatCurrency(curr?.expense || expense, true)}</p>
            <p className={s.statLabel}>Expenses</p>
          </div>
        </div>
      </div>
    </div>
  )
}