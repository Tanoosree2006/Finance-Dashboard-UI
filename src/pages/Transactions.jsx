import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import TransactionFilters  from '../components/transactions/TransactionFilters'
import TransactionTable    from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'
import s from './Transactions.module.css'

export default function Transactions() {
  const { state } = useApp()
  const [modal, setModal]   = useState(false)
  const [editTx, setEditTx] = useState(null)

  const openEdit   = tx => { setEditTx(tx); setModal(true) }
  const closeModal = ()  => { setModal(false); setEditTx(null) }

  return (
    <div className={s.page}>
      <div className={s.bar}>
        <div>
          <h2 className={s.heading}>Transactions</h2>
          <p className={s.sub}>{state.transactions.length} total entries</p>
        </div>
        <div className={s.actions}>
          {state.role === 'admin' && (
            <button className={s.addBtn} onClick={() => setModal(true)}>
              <Plus size={15}/> Add Transaction
            </button>
          )}
        </div>
      </div>

      {state.role === 'viewer' && (
        <div className={s.viewerBanner}>
          👁️ You are in <strong>Viewer mode</strong> — read only. Switch to Admin in the header to manage transactions.
        </div>
      )}

      <TransactionFilters />
      <TransactionTable onEdit={openEdit} />

      {modal && <AddTransactionModal onClose={closeModal} editData={editTx} />}
    </div>
  )
}