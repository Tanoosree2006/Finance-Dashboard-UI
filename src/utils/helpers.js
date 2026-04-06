export const formatCurrency = (amount, compact = false) => {
  if (compact && amount >= 100000)
    return '₹' + (amount / 100000).toFixed(1) + 'L'
  if (compact && amount >= 1000)
    return '₹' + (amount / 1000).toFixed(0) + 'k'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })

export const formatMonthShort = (dateStr) =>
  new Date(dateStr + '-01').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })

export const generateId = () =>
  'tx' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)

export const getSummaryStats = (transactions) => {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t)  => s + t.amount, 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  return { balance: income - expense, income, expense }
}

export const getMonthlyData = (transactions) => {
  const map = {}
  transactions.forEach(tx => {
    const key = tx.date.substring(0, 7)
    if (!map[key]) map[key] = { month: formatMonthShort(key), income: 0, expense: 0 }
    if (tx.type === 'income')  map[key].income  += tx.amount
    else                        map[key].expense += tx.amount
  })
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, d]) => ({ ...d, balance: d.income - d.expense }))
}

export const getCategoryBreakdown = (transactions) => {
  const map = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount
  })
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

export const getInsights = (transactions) => {
  const monthly   = getMonthlyData(transactions)
  const cats      = getCategoryBreakdown(transactions)
  const stats     = getSummaryStats(transactions)
  const curr      = monthly[monthly.length - 1] || null
  const prev      = monthly[monthly.length - 2] || null
  const savingsRate = curr?.income > 0 ? ((curr.income - curr.expense) / curr.income * 100).toFixed(1) : 0
  const expChange   = curr && prev && prev.expense > 0
    ? (((curr.expense - prev.expense) / prev.expense) * 100).toFixed(1) : 0
  return { ...stats, monthly, categories: cats, current: curr, previous: prev, savingsRate, expChange, topCategory: cats[0] || null }
}

export const getFilteredTransactions = (transactions, filters) => {
  let r = [...transactions]
  if (filters.search) {
    const q = filters.search.toLowerCase()
    r = r.filter(t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
  }
  if (filters.category !== 'all') r = r.filter(t => t.category === filters.category)
  if (filters.type     !== 'all') r = r.filter(t => t.type     === filters.type)
  const sorts = {
    'date-desc':   (a,b) => new Date(b.date) - new Date(a.date),
    'date-asc':    (a,b) => new Date(a.date) - new Date(b.date),
    'amount-desc': (a,b) => b.amount - a.amount,
    'amount-asc':  (a,b) => a.amount - b.amount,
  }
  return r.sort(sorts[filters.sortBy] || sorts['date-desc'])
}

export const exportToCSV = (transactions) => {
  const rows = [['Date','Description','Category','Type','Amount'],
    ...transactions.map(t => [t.date, t.description, t.category, t.type, t.amount])]
  const csv = rows.map(r => r.join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type:'text/csv' }))
  Object.assign(document.createElement('a'), { href:url, download:'transactions.csv' }).click()
  URL.revokeObjectURL(url)
}