import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SessionProvider } from './SessionContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider>
    <App /><ToastContainer style={{ width: "400px" }} />
    </SessionProvider>
  </React.StrictMode>
);
