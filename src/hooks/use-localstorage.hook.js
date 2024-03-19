import { useState, useEffect } from 'react';

export function useLocalStorage(key) {
    const [data, setData] = useState();

    useEffect(() => {
        const response = JSON.parse(localStorage.getItem(key));
        if (response) {
            setData(response);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveData = (newData) => {
        localStorage.setItem(key, JSON.stringify(newData));
        setData(newData);
    };

    return [data, saveData];
}
