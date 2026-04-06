import { createContext, useContext, useReducer, useEffect } from 'react'
import { MOCK_TRANSACTIONS } from '../data/mockData'

const Ctx = createContext(null)

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t)
  document.documentElement.style.colorScheme = t
}

const INIT = {
  transactions: [],
  role: 'admin',
  theme: 'light',
  filters: { search:'', category:'all', type:'all', sortBy:'date-desc' },
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'HYDRATE':            return { ...state, ...payload }
    case 'ADD_TRANSACTION':    return { ...state, transactions: [payload, ...state.transactions] }
    case 'DELETE_TRANSACTION': return { ...state, transactions: state.transactions.filter(t => t.id !== payload) }
    case 'UPDATE_TRANSACTION': return { ...state, transactions: state.transactions.map(t => t.id === payload.id ? payload : t) }
    case 'SET_ROLE':           return { ...state, role: payload }
    case 'SET_FILTER':         return { ...state, filters: { ...state.filters, ...payload } }
    case 'RESET_FILTERS':      return { ...state, filters: INIT.filters }
    case 'TOGGLE_THEME': {
      const next = state.theme === 'light' ? 'dark' : 'light'
      applyTheme(next)
      return { ...state, theme: next }
    }
    default: return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT)

  useEffect(() => {
    const theme = localStorage.getItem('fiq_theme') || 'light'
    const role  = localStorage.getItem('fiq_role')  || 'admin'
    let tx = MOCK_TRANSACTIONS
    try { const r = localStorage.getItem('fiq_tx'); if (r) tx = JSON.parse(r) } catch {}
    applyTheme(theme)
    dispatch({ type:'HYDRATE', payload: { theme, role, transactions: tx } })
  }, [])

  useEffect(() => { if (state.transactions.length) localStorage.setItem('fiq_tx', JSON.stringify(state.transactions)) }, [state.transactions])
  useEffect(() => { localStorage.setItem('fiq_theme', state.theme) }, [state.theme])
  useEffect(() => { localStorage.setItem('fiq_role',  state.role)  }, [state.role])

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>
}

export const useApp = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useApp outside AppProvider')
  return c
}