import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'
import { generateId } from '../../utils/helpers'
import s from './AddTransactionModal.module.css'

const blank = {
  description:'', amount:'', category:'Food',
  type:'expense', date: new Date().toISOString().split('T')[0]
}

export default function AddTransactionModal({ onClose, editData }) {
  const { dispatch } = useApp()
  const [form, setForm]     = useState(blank)
  const [errors, setErrors] = useState({})
  const isEdit = !!editData

  useEffect(() => {
    if (editData) setForm({ ...editData, amount: String(editData.amount) })
  }, [editData])

  const validate = () => {
    const e = {}
    if (!form.description.trim())              e.description = 'Required'
    if (!form.amount || Number(form.amount)<=0) e.amount = 'Enter a valid amount'
    if (!form.date)                             e.date = 'Required'
    return e
  }

  const submit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    dispatch({
      type: isEdit ? 'UPDATE_TRANSACTION' : 'ADD_TRANSACTION',
      payload: { ...form, amount: Number(form.amount), id: isEdit ? editData.id : generateId() }
    })
    onClose()
  }

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: undefined })) }

  return (
    <div className={s.backdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={s.modal}>

        <div className={s.head}>
          <h2 className={s.title}>{isEdit ? 'Edit Transaction' : 'New Transaction'}</h2>
          <button className={s.closeBtn} onClick={onClose}><X size={18}/></button>
        </div>

        <div className={s.body}>
          {/* Type toggle */}
          <div className={s.toggle}>
            <button className={`${s.tBtn} ${form.type==='expense' ? s.tExp : ''}`} onClick={() => set('type','expense')}>Expense</button>
            <button className={`${s.tBtn} ${form.type==='income'  ? s.tInc : ''}`} onClick={() => set('type','income')} >Income</button>
          </div>

          <div className={s.field}>
            <label className={s.lbl}>Description</label>
            <input className={`${s.inp} ${errors.description ? s.err : ''}`} value={form.description} onChange={e => set('description',e.target.value)} placeholder="e.g. Grocery Shopping"/>
            {errors.description && <span className={s.errMsg}>{errors.description}</span>}
          </div>

          <div className={s.row2}>
            <div className={s.field}>
              <label className={s.lbl}>Amount (₹)</label>
              <input type="number" className={`${s.inp} ${errors.amount ? s.err : ''}`} value={form.amount} onChange={e => set('amount',e.target.value)} placeholder="0" min="0"/>
              {errors.amount && <span className={s.errMsg}>{errors.amount}</span>}
            </div>
            <div className={s.field}>
              <label className={s.lbl}>Date</label>
              <input type="date" className={`${s.inp} ${errors.date ? s.err : ''}`} value={form.date} onChange={e => set('date',e.target.value)}/>
              {errors.date && <span className={s.errMsg}>{errors.date}</span>}
            </div>
          </div>

          <div className={s.field}>
            <label className={s.lbl}>Category</label>
            <select className={s.inp} value={form.category} onChange={e => set('category',e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className={s.foot}>
          <button className={s.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={`${s.submitBtn} ${form.type==='income' ? s.submitInc : s.submitExp}`} onClick={submit}>
            {isEdit ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}