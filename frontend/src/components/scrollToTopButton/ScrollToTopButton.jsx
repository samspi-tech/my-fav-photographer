import CustomButton from '../customButton/CustomButton';
import { HiArrowUp } from 'react-icons/hi2';
import styles from './ScrollToTopButton.module.css';
import { useScrollToTop } from '../../hooks/useScrollToTop';

const ScrollToTopButton = () => {
    const { isVisible, handleScrollToTop } = useScrollToTop();

    if (isVisible)
        return (
            <div className={styles.container}>
                <CustomButton
                    variant="small"
                    icon={HiArrowUp}
                    ariaLabel="Scroll to top"
                    onClick={handleScrollToTop}
                />
            </div>
        );
};

export default ScrollToTopButton;
