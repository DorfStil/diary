import styles from './Logo.module.css';

export default function Logo() {
    return (
        <a href="/">
            <img
                className={styles.logo}
                src="/icons/logo.svg"
                alt="Logo"
                loading="lazy"
            />
        </a>
    );
}
