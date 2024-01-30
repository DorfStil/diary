import styles from './CardButton.module.css';

export default function CardButton({ children, className, ...restProps }) {
    const cn = styles['card-button'] + (className ? ' ' + className : '');
    return <button className={cn} {...restProps}>{children}</button>;
}
