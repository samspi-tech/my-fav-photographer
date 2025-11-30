import styles from './CustomButton.module.css';

const CustomButton = ({
    text,
    icon,
    onClick,
    isDisabled,
    variant = 'primary',
}) => {
    const Icon = icon;

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
