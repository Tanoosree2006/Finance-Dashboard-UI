import s from './PayableAccounts.module.css'

const RECEIPTS = [
  { label:'Salary',          amount:90000 },
  { label:'Freelance',       amount:25000 },
  { label:'Rental Income',   amount:12000 },
]

const PAYABLES = [
  { label:'Electricity Bill', amount:2000 },
  { label:'Rent',             amount:15000 },
  { label:'Insurance',        amount:3500 },
]

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

export default function PayableAccounts() {
  const done = 14, total = 16
  return (
    <div className={s.wrap}>

      {/* Payable Accounts */}
      <div className={s.card}>
        <h3 className={s.cardTitle}>Payable Accounts</h3>
        <p className={s.cardSub}>Keep your accounts up to date to avoid issues.</p>
        <p className={s.countRow}><strong>{done} out of {total}</strong></p>
        <div className={s.progressTrack}>
          <div className={s.progressFill} style={{ width:`${(done/total)*100}%` }}/>
        </div>
      </div>

      {/* Receipts */}
      <div className={s.card}>
        <h3 className={s.sectionTitle}>Receipts</h3>
        <div className={s.list}>
          {RECEIPTS.map(r => (
            <div key={r.label} className={s.row}>
              <div className={s.rowIcon}><span>↗</span></div>
              <div className={s.rowInfo}>
                <p className={s.rowAmt}>{fmt(r.amount)}</p>
                <p className={s.rowLabel}>{r.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={s.divider}/>

      {/* Payables */}
      <div className={s.card}>
        <h3 className={s.sectionTitle}>Payables</h3>
        <div className={s.list}>
          {PAYABLES.map(p => (
            <div key={p.label} className={s.row}>
              <div className={`${s.rowIcon} ${s.payIcon}`}><span>📋</span></div>
              <div className={s.rowInfo}>
                <p className={s.rowAmt}>{fmt(p.amount)}</p>
                <p className={s.rowLabel}>{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}