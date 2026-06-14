import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/styles.css';
import './assets/course-allocation-style.css';
import './assets/form-enhancements.css';
import App from './routes/App.jsx';
import { LmsProvider } from './context/LmsContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LmsProvider>
        <Suspense fallback={<div className="p-5 text-center">Loading LMS...</div>}>
          <App />
        </Suspense>
      </LmsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
