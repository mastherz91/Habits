"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makestore } from "../Redux/store";

export default function StoreProvider({ children }) {
    const store = useRef(null);

    if (!store.current) {
        store.current = makestore();
    }

    return <Provider store={store.current}>{children}</Provider>;
}