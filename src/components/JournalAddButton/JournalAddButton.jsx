import styles from './JournalAddButton.module.css';
import CardButton from '../CardButton/CardButton';

export default function JournalAddButton({ clearForm }) {
    return (
        <CardButton className={styles['journal-add']} onClick={clearForm}>
            <img src="/icons/plus.svg" loading="lazy" />
      Новое воспоминание
        </CardButton>
    );
}
