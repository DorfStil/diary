import styles from './DeleteButton.module.css';

export default function DeleteButton({ children, onClick }) {
    return (
        <button 
            className={`${styles['delete-button']}`}
            onClick={onClick}
            type="button">
            {children}
        </button>
    );
}
