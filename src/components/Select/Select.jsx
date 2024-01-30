import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from './Select.module.css';

export function Select() {
    const { userId, setUserId } = useContext(UserContext);
    const handleChange = (event) => {
        setUserId(Number(event.target.value));
    };

    return (
        <select
            className={styles.select}
            name="user"
            id="user"
            value={userId}
            onChange={handleChange}
        >
            <option value="1">Дмитрий</option>
            <option value="2">Василий</option>
        </select>
    );
}
