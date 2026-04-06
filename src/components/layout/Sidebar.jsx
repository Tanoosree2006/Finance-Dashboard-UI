import {
  LayoutDashboard, ArrowLeftRight, BarChart2,
  Settings, HelpCircle, LogOut, TrendingUp, X
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import s from './Sidebar.module.css'

const NAV_TOP = [
  { id:'dashboard',    label:'Dashboard',    Icon:LayoutDashboard },
  { id:'transactions', label:'Transactions', Icon:ArrowLeftRight  },
  { id:'insights',     label:'Insights',     Icon:BarChart2       },
]
const NAV_BOTTOM = [
  { id:'settings', label:'Settings', Icon:Settings    },
  { id:'help',     label:'Help',     Icon:HelpCircle  },
  { id:'logout',   label:'Log Out',  Icon:LogOut      },
]

export default function Sidebar({ currentPage, setCurrentPage, isOpen, onClose }) {
  const { state } = useApp()
  const isAdmin = state.role === 'admin'

  return (
    <aside className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      <button className={s.closeBtn} onClick={onClose} aria-label="Close"><X size={15}/></button>

      {/* Profile */}
      <div className={s.profile}>
        <div className={s.avatarWrap}>
          <div className={s.avatar}>{isAdmin ? 'A' : 'V'}</div>
          <span className={`${s.onlinePin} ${isAdmin ? s.pinAdmin : s.pinViewer}`} />
        </div>
        <p className={s.profileName}>{isAdmin ? 'Admin User' : 'Viewer'}</p>
        <p className={s.profileRole}>{isAdmin ? 'Administrator' : 'Read Only'}</p>
      </div>

      <div className={s.divider} />

      {/* Top Nav */}
      <nav className={s.nav}>
        {NAV_TOP.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`${s.item} ${currentPage === id ? s.active : ''}`}
            onClick={() => setCurrentPage(id)}
          >
            <span className={s.itemIcon}><Icon size={18} strokeWidth={1.8}/></span>
            <span className={s.itemLabel}>{label}</span>
          </button>
        ))}
      </nav>

      <div className={s.spacer} />

      <div className={s.divider} />

      {/* Bottom Nav */}
      <nav className={s.nav}>
        {NAV_BOTTOM.map(({ id, label, Icon }) => (
          <button key={id} className={s.item}>
            <span className={s.itemIcon}><Icon size={18} strokeWidth={1.8}/></span>
            <span className={s.itemLabel}>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}