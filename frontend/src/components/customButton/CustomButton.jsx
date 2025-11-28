import styles from './CustomButton.module.css';

const CustomButton = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className={styles.btn}>
            {text}
        </button>
    );
};

export default CustomButton;
