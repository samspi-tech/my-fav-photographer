import { useCallback, useEffect, useState } from 'react';

export const useScrollToTop = () => {
    const main = document.querySelector('main');
    const [isVisible, setIsVisible] = useState(false);
    const [scrollYPosition, setScrollYPosition] = useState(0);

    const handleScrollPosition = useCallback(() => {
        setScrollYPosition(main.scrollTop);
    }, [main.scrollTop]);

    const handleScrollToTop = () => {
        main.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        main.addEventListener('scroll', handleScrollPosition);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (scrollYPosition > 2530) setIsVisible(true);

        if (scrollYPosition === 0) setIsVisible(false);

        const hideButton = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => {
            clearTimeout(hideButton);
            main.removeEventListener('scroll', handleScrollPosition);
        };
    }, [scrollYPosition, handleScrollPosition, main]);

    return {
        isVisible,
        handleScrollToTop,
    };
};
