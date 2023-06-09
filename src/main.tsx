import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ContextDadosUser from './context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ContextDadosUser>
                <App />
            </ContextDadosUser>
        </BrowserRouter>
    </React.StrictMode>
);
