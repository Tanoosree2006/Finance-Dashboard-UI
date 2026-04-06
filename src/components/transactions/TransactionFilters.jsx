import { Search, X, Download } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'
import { exportToCSV } from '../../utils/helpers'
import s from './TransactionFilters.module.css'

export default function TransactionFilters() {
  const { state, dispatch } = useApp()
  const { filters, transactions } = state
  const set = u => dispatch({ type:'SET_FILTER', payload:u })
  const dirty = filters.search || filters.category !== 'all' || filters.type !== 'all' || filters.sortBy !== 'date-desc'

  return (
    <div className={s.wrap}>
      <div className={s.searchBox}>
        <Search size={14} className={s.ico}/>
        <input
          className={s.input}
          placeholder="Search transactions..."
          value={filters.search}
          onChange={e => set({ search: e.target.value })}
        />
        {filters.search && (
          <button className={s.clear} onClick={() => set({ search:'' })}><X size={12}/></button>
        )}
      </div>

      <div className={s.selects}>
        <select className={s.sel} value={filters.category} onChange={e => set({ category: e.target.value })}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select className={s.sel} value={filters.type} onChange={e => set({ type: e.target.value })}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select className={s.sel} value={filters.sortBy} onChange={e => set({ sortBy: e.target.value })}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>

        {dirty && (
          <button className={s.resetBtn} onClick={() => dispatch({ type:'RESET_FILTERS' })}>
            <X size={12}/> Reset
          </button>
        )}
      </div>

      <button className={s.exportBtn} onClick={() => exportToCSV(transactions)}>
        <Download size={14}/> Export
      </button>
    </div>
  )
}