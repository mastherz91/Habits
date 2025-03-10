import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { StoreProvider } from "./StoreProvider"; // Asegúrate de que esta línea tenga la ruta correcta

const geistSans = Geist({
    variable: "--font-geist-sans",
    // ...existing code...
});

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider>
            <Component {...pageProps} />
        </StoreProvider>
    );
}

export default MyApp;