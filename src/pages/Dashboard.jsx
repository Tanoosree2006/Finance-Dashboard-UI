import CreditCard         from '../components/dashboard/CreditCard'
import WalletCard         from '../components/dashboard/WalletCard'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import MonthlyChart       from '../components/dashboard/MonthlyChart'
import EarningsRing       from '../components/dashboard/EarningsRing'
import PayableAccounts    from '../components/dashboard/PayableAccounts'
import { useApp }         from '../context/AppContext'
import { getSummaryStats } from '../utils/helpers'
import s from './Dashboard.module.css'

export default function Dashboard() {
  const { state } = useApp()
  const { balance } = getSummaryStats(state.transactions)

  return (
    <div className={s.page}>
      <h2 className={s.heading}>Dashboard</h2>

      <div className={s.grid}>
        {/* Column 1 */}
        <div className={s.col1}>
          <CreditCard balance={balance} />
          <RecentTransactions limit={10} />
        </div>

        {/* Column 2 */}
        <div className={s.col2}>
          <WalletCard />
          <MonthlyChart />
          <EarningsRing />
        </div>

        {/* Column 3 */}
        <div className={s.col3}>
          <PayableAccounts />
        </div>
      </div>
    </div>
  )
}