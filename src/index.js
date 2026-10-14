import React from 'react';
import ReactDOM from 'react-dom/client';
// Las fuentes (@font-face + preload) viven en public/index.html: CRA no deja
// referenciar /public desde CSS sin romper el build.
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
