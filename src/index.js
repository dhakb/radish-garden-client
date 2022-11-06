import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import AuthContextProvider from "./context/auth/Auth.context";

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </BrowserRouter>
    // </React.StrictMode>
);