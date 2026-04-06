import { SearchX } from 'lucide-react'
import s from './EmptyState.module.css'

export default function EmptyState({ message = 'No data found', Icon = SearchX }) {
  return (
    <div className={s.wrap}>
      <div className={s.icon}><Icon size={24} strokeWidth={1.5} /></div>
      <p className={s.msg}>{message}</p>
    </div>
  )
}