import styles from './CustomButton.module.css';

const CustomButton = ({ text, icon, onClick, isDisabled }) => {
    const Icon = icon;

    return (
        <button disabled={isDisabled} onClick={onClick} className={styles.btn}>
            {icon && <Icon />}
            <span>{text}</span>
        </button>
    );
};

export default CustomButton;
