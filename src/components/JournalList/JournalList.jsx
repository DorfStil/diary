import styles from './JournalList.module.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

const sortItems = (a, b) => {
    if (a.date < b.date) {
        return 1;
    } else {
        return -1;
    }
};

export default function JournalList({ items, setItem }) {
    const { userId } = useContext(UserContext);
    const filteredItems = useMemo(
        () => items.filter((item) => item.userId === userId).sort(sortItems),
        [items, userId]
    );

    if (items.length === 0) {
        return <p>Записей нет, добавьте новую</p>;
    }

    return (
        <div className={styles['journal-list']}>
            {filteredItems.map((element) => (
                <CardButton key={element.id} onClick={() => setItem(element)}>
                    <JournalItem
                        title={element.title}
                        post={element.post}
                        date={element.date}
                    />
                </CardButton>
            ))}
        </div>
    );
}
