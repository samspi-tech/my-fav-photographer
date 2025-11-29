import styles from './CustomButton.module.css';

const CustomButton = ({ text, icon, onClick }) => {
    const Icon = icon;

    return (
        <button onClick={onClick} className={styles.btn}>
            {icon && <Icon />}
            <span>{text}</span>
        </button>
    );
};

export default CustomButton;
