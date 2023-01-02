import React from "react";

// Context API configuration


export interface CartItem {
    bookId: string;
    priceInUSD: number;
    quantity: number;
}

export interface AppData {
    cart: CartItem[]
}

export interface AppContext {
    appData: AppData;
    setAppData: (data: AppData) => void
}

export const initContext: AppContext = {
    appData: {
        cart: []
    },
    setAppData: () => {}
}

export const Context = React.createContext(initContext)