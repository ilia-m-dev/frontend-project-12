import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AuthProvider from './contexts/AuthProvider.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import './i18n.js';
import RollbarProvider from './components/RollbarProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RollbarProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </RollbarProvider>
  </React.StrictMode>,
);
