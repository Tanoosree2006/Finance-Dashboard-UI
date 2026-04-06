import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'

export default function App() {
  const [page, setPage] = useState('dashboard')

  const renderPage = () => {
    switch (page) {
      case 'dashboard':    return <Dashboard />
      case 'transactions': return <Transactions />
      case 'insights':     return <Insights />
      default:             return <Dashboard />
    }
  }

  return (
    <AppProvider>
      <Layout currentPage={page} setCurrentPage={setPage}>
        {renderPage()}
      </Layout>
    </AppProvider>
  )
}