import { forwardRef } from 'react';
import styles from './Textarea.module.css';

const Textarea = forwardRef(function Textarea(
    { children, className, isValid, ...restProps },
    ref
) {
    return (
        <textarea
            className={`${styles[className]} ${isValid ? '' : styles.invalid}`}
            ref={ref}
            {...restProps}
        >
            {children}
        </textarea>
    );
});

export default Textarea;