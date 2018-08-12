import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
const Index = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

render(<Index />, document.getElementById('root'));
