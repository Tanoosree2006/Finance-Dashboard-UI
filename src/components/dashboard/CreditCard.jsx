import s from './CreditCard.module.css'

export default function CreditCard({ balance, cardNumber = '4328 4388 4161 8183', holder = 'Admin User', expiry = '12/28' }) {
  return (
    <div className={s.card}>
      {/* Background decorative circles */}
      <div className={s.circle1}/>
      <div className={s.circle2}/>

      <div className={s.top}>
        <div>
          <p className={s.cardNum}>{cardNumber}</p>
          <p className={s.cardHolder}>{holder}</p>
          <p className={s.cardExpiry}>{expiry}</p>
        </div>
      </div>

      <div className={s.bottom}>
        <div className={s.mastercard}>
          <span className={s.mc1}/>
          <span className={s.mc2}/>
        </div>
      </div>
    </div>
  )
}