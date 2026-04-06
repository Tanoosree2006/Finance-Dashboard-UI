import { useState } from 'react'
import Sidebar from './Sidebar'
import Header  from './Header'
import s from './Layout.module.css'

export default function Layout({ children, currentPage, setCurrentPage }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={s.root}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={p => { setCurrentPage(p); setOpen(false) }}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      {open && <div className={s.overlay} onClick={() => setOpen(false)} />}
      <div className={s.shell}>
        <Header currentPage={currentPage} onMenu={() => setOpen(true)} />
        <div className={s.scroller}>
          <div className={s.inner}>{children}</div>
        </div>
      </div>
    </div>
  )
}