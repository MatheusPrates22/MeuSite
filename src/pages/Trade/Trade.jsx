import styles from './Trade.module.css';

function Trade() {
  return (
    <div className={styles.trade}>
      <h1 className={styles.title}>Trade</h1>
      <div className={styles.message}>
        <p className={styles.messageText}>Em desenvolvimento</p>
        <p className={styles.messageSubtext}>
          Esta funcionalidade será implementada em breve.
        </p>
      </div>
    </div>
  );
}

export default Trade;
