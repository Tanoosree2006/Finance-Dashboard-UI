import s from './Badge.module.css'

export default function Badge({ type, children }) {
  return <span className={`${s.badge} ${s[type] || ''}`}>{children}</span>
}