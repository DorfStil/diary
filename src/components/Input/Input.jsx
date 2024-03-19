import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input({ isValid, className, ...restProps }, ref)  {
    return (
        <input
            className={`${styles[className]} ${
                isValid ? '' : styles.invalid
            }`}
            ref={ref}
            {...restProps}
        />
    );
});

export default Input;