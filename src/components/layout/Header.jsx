import { Menu, Sun, Moon, Search, Bell, Shield, Eye, ChevronDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import s from './Header.module.css'

export default function Header({ currentPage, onMenu }) {
  const { state, dispatch } = useApp()
  const isDark  = state.theme === 'dark'
  const isAdmin = state.role  === 'admin'

  return (
    <header className={s.header}>
      <div className={s.left}>
        <button className={s.menuBtn} onClick={onMenu} aria-label="Menu">
          <Menu size={20}/>
        </button>

        {/* Search */}
        <div className={s.search}>
          <Search size={15} className={s.searchIco}/>
          <input
            className={s.searchInput}
            placeholder="Search transactions..."
            aria-label="Search"
          />
        </div>
      </div>

      <div className={s.right}>
        {/* Role chip */}
        <label className={`${s.roleChip} ${isAdmin ? s.admin : s.viewer}`}>
          {isAdmin ? <Shield size={13}/> : <Eye size={13}/>}
          <span>{isAdmin ? 'Admin' : 'Viewer'}</span>
          <ChevronDown size={11}/>
          <select
            value={state.role}
            onChange={e => dispatch({ type:'SET_ROLE', payload:e.target.value })}
            className={s.roleSelect}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </label>

        {/* Theme toggle */}
        <button
          className={`${s.themeBtn} ${isDark ? s.dark : s.light}`}
          onClick={() => dispatch({ type:'TOGGLE_THEME' })}
          aria-label="Toggle theme"
        >
          <span className={s.track}>
            <span className={s.thumb}>
              {isDark ? <Moon size={10}/> : <Sun size={10}/>}
            </span>
          </span>
        </button>

        {/* Notification */}
        <button className={s.iconBtn} aria-label="Notifications">
          <Bell size={18}/>
          <span className={s.dot}/>
        </button>
      </div>
    </header>
  )
}