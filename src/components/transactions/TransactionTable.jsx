import { useState } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { getFilteredTransactions, formatCurrency, formatDate } from '../../utils/helpers'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../data/mockData'
import s from './TransactionTable.module.css'

const PAGE_SIZE = 12

export default function TransactionTable({ onEdit }) {
  const { state, dispatch } = useApp()
  const [page, setPage] = useState(1)

  const filtered = getFilteredTransactions(state.transactions, state.filters)
  const pages    = Math.ceil(filtered.length / PAGE_SIZE)
  const shown    = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const del = id => { if (window.confirm('Delete this transaction?')) dispatch({ type:'DELETE_TRANSACTION', payload:id }) }

  return (
    <div className={s.wrap}>
      <div className={s.meta}>
        <span className={s.count}>{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {!shown.length
        ? (
          <div className={s.empty}>
            <p className={s.emptyIco}>📭</p>
            <p className={s.emptyMsg}>No transactions match your filters</p>
          </div>
        )
        : (
          <>
            <div className={s.scroll}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th className={s.right}>Amount</th>
                    {state.role === 'admin' && <th className={s.center}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {shown.map((tx, i) => (
                    <tr key={tx.id} className={s.row} style={{ animationDelay:`${i*.02}s` }}>
                      <td>
                        <div className={s.descCell}>
                          <span className={s.catEmoji}>{CATEGORY_ICONS[tx.category] || '💳'}</span>
                          <span className={s.desc}>{tx.description}</span>
                        </div>
                      </td>
                      <td>
                        <span className={s.catBadge} style={{ background: CATEGORY_COLORS[tx.category] + '18', color: CATEGORY_COLORS[tx.category] }}>
                          {tx.category}
                        </span>
                      </td>
                      <td className={s.date}>{formatDate(tx.date)}</td>
                      <td>
                        <span className={`${s.typeBadge} ${tx.type === 'income' ? s.income : s.expense}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className={`${s.amount} ${tx.type === 'income' ? s.amtInc : s.amtExp}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                      {state.role === 'admin' && (
                        <td className={s.actions}>
                          <button className={`${s.actBtn} ${s.edit}`} onClick={() => onEdit(tx)}><Pencil size={13}/></button>
                          <button className={`${s.actBtn} ${s.del}`}  onClick={() => del(tx.id)}><Trash2  size={13}/></button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pages > 1 && (
              <div className={s.paging}>
                <button className={s.pgBtn} disabled={page===1}     onClick={() => setPage(p=>p-1)}><ChevronLeft  size={14}/></button>
                <span className={s.pgInfo}>Page {page} of {pages}</span>
                <button className={s.pgBtn} disabled={page===pages} onClick={() => setPage(p=>p+1)}><ChevronRight size={14}/></button>
              </div>
            )}
          </>
        )
      }
    </div>
  )
}