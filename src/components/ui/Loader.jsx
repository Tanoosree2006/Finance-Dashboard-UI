import styles from './Loader.module.css'

const Loader = ({ text = 'Loading...' }) => (
  <div className={styles.wrap}>
    <div className={styles.spinner} />
    <p className={styles.text}>{text}</p>
  </div>
)

export default Loader