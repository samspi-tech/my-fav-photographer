import { Spinner } from 'react-bootstrap';
import styles from './CustomButton.module.css';

const CustomButton = ({
    text,
    icon,
    onClick,
    isDisabled,
    isLoading = false,
    variant = 'primary',
}) => {
    const Icon = icon;

    if (isLoading) {
        return (
            <button
                disabled={isDisabled}
                className={`${styles.btn} ${styles[variant]}`}
            >
                <Spinner className={styles.spinner} />
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`${styles.btn} ${styles[variant]}`}
        >
            {icon && <Icon />}
            {text && <span>{text}</span>}
        </button>
    );
};

export default CustomButton;
