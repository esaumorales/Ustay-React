import {
    useState,
    useEffect
} from 'react'

const useCountAnimate = (active, final, duration = 2000) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!active) return;
        let initial = 0;
        const increment = final / (duration / 50);

        const interval = setInterval(() => {
            initial += increment
            if (initial >= final) {
                initial = final;
                clearInterval(interval)
            }
            setValue(Math.floor(initial));
        }, 50);
        return () => clearInterval(interval);
    }, [active, final, duration]);
    return value;
};

export default useCountAnimate;