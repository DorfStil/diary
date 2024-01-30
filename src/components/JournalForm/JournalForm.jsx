import { useContext, useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import { UserContext } from '../../context/user.context';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import DeleteButton from '../DeleteButton/DeleteButton';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';

export default function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { userId } = useContext(UserContext);
    const { isValid, values, isFormReadyToSubmit } = formState;
    const titleRef = useRef();
    const postRef = useRef();
    const dateRef = useRef();

    const handleChange = (event) => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: { [event.target.name]: event.target.value }
        });
    };

    const addItem = (event) => {
        event.preventDefault();
        dispatchForm({ type: 'SUBMIT' });
    };

    const deleteItem = () => {
        onDelete(data.id);
        dispatchForm({ type: 'CLEAR' });
        dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    };

    const focusError = (isValid) => {
        switch (true) {
        case !isValid.title:
            titleRef.current.focus();
            break;
        case !isValid.date:
            dateRef.current.focus();
            break;
        case !isValid.post:
            postRef.current.focus();
            break;
        }
    };

    useEffect(() => {
        if (data) {
            dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
        } else {
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({
                type: 'SET_VALUE',
                payload: { userId }
            });
        }
    }, [data]);

    useEffect(() => {
        let timerId;

        if (!isValid.title || !isValid.post || !isValid.date) {
            focusError(isValid);
            timerId = setTimeout(() => {
                dispatchForm({ type: 'RESET_VALIDITY' });
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values);
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({ type: 'SET_VALUE', payload: { userId } });
        }
    }, [isFormReadyToSubmit, onSubmit, values, userId]);

    useEffect(() => {
        dispatchForm({ type: 'SET_VALUE', payload: { userId: userId } });
    }, [userId]);

    return (
        <form className={styles['journal-form']} onSubmit={addItem}>
            <div className={styles['form-row']}>
                <Input
                    type="text"
                    name="title"
                    className="input-title"
                    value={values.title}
                    onChange={handleChange}
                    ref={titleRef}
                    isValid={isValid.title}
                />
                {data?.id && (
                    <DeleteButton onClick={deleteItem}>
                        <img src="/icons/archive.svg" alt="Удалить запись" />
                    </DeleteButton>
                )}
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="date" className={styles['form-label']}>
                    <img src="/icons/calendar.svg" alt="calendar" />
                    <span>Дата</span>
                </label>
                <Input
                    type="date"
                    name="date"
                    id="date"
                    className="input"
                    onChange={handleChange}
                    value={
                        values.date
                            ? new Date(values.date).toISOString().slice(0, 10)
                            : ''
                    }
                    ref={dateRef}
                    isValid={isValid.date}
                />
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="tag" className={styles['form-label']}>
                    <img src="/icons/folder.svg" alt="folder" />
                    <span>Метки</span>
                </label>
                <Input
                    type="text"
                    id="tag"
                    name="tag"
                    className="input"
                    onChange={handleChange}
                    value={values.tag}
                    isValid={isValid}
                />
            </div>
            <Textarea
                name="post"
                id="post"
                cols="30"
                rows="10"
                className="textarea"
                onChange={handleChange}
                value={values.post}
                ref={postRef}
                isValid={isValid.post}
            ></Textarea>
            <Button text="Сохранить" />
        </form>
    );
}
