
import { useEffect, useState } from 'react';

type UseScrollTopReturn = {
    scrolled: boolean;
};

const useScrollTop = (threshold: number = 10): UseScrollTopReturn => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > threshold);
        };

        // Initialize on mount
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return { scrolled };
};

export default useScrollTop;
