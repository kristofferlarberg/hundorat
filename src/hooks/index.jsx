/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

export const useHandleLoadImages = () => {
    const [loaded, setLoaded] = useState(false);

    let loadedImages = 0;

    const pageContentStyle = {
        opacity: 0,
    };
    if (loaded) {
        pageContentStyle.opacity = 1;
    }

    function handleLoad(imageAmount) {
        loadedImages += 1;
        if (loadedImages === imageAmount) {
            setLoaded(true);
        }
    }

    return { handleLoad, pageContentStyle };
};
