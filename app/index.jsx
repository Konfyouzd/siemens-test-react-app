import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home/index';

import printGreeting from './printGreeting';
import reportWebVitals from './reportWebVitals';

import './style.scss';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={ <Home /> } />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

printGreeting();
reportWebVitals();
