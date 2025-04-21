import { useCallback } from 'react';

export const useModalNavigation = (modals) => {
    const switchToModal = useCallback((from, to) => {
        if (modals[from] && modals[to]) {
            modals[from].closeModal();
            modals[to].openModal();
        }
    }, [modals]);

    return { switchToModal };
};