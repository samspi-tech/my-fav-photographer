import { Spinner } from 'react-bootstrap';
import styles from './CustomButton.module.css';

const CustomButton = ({
    text,
    icon,
    onClick,
    ariaLabel,
    isDisabled,
    isLoading = false,
    variant = 'primary',
}) => {
    const Icon = icon;

    if (isLoading) {
        return (
            <button
                disabled={isDisabled}
                aria-label="Loading button"
                className={`${styles.btn} ${styles[variant]}`}
            >
                <Spinner
                    role="status"
                    animation="border"
                    className={styles.spinner}
                />
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            aria-label={ariaLabel}
            className={`${styles.btn} ${styles[variant]}`}
        >
            {icon && <Icon />}
            {text && <span>{text}</span>}
        </button>
    );
};

export default CustomButton;
