import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart')) ?? [];
        setCartItems(items);
    }, []);

    return (
        <ShoppingCartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};
