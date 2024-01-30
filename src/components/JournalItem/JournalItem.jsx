import styles from './JournalItem.module.css';

export default function JournalItem({title, date, post}) {
    const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);
    return (
        <>
            <h2 className={styles['journal-item__title']}>{title}</h2>
            <div className={styles['journal-item__content']}>
                <span className={styles['journal-item__date']}>{formatedDate}</span>
                <p className={styles['journal-item__text']}>{post}</p>
            </div>
        </>
    );
}
