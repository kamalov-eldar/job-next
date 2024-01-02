import { useState } from "react";

const useLocalStorage = (key:string, initialValue: any) => {
    const [state, setState] = useState(() => {
        // Initialize the state
        try {
            const value = window.localStorage.getItem(key);
            return value ? value : initialValue;
        } catch (error) {
            console.log(error);
        }
    });

    const setValue = (value: (arg: any) => any) => {
        try {
            // If the passed value is a callback function,
            //  then call it with the existing state.
            const valueToStore = value instanceof Function ? value(state) : value;
            window.localStorage.setItem(key, valueToStore);
            setState(value);
        } catch (error) {
            console.log(error);
        }
    };

    return [state, setValue];
};

export default useLocalStorage;