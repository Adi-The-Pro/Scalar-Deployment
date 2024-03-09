import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {Toaster} from 'react-hot-toast'

import axios from 'axios';
axios.defaults.baseURL = 'https://scalar-deployment.vercel.app/api';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster position='top-center'/>
    <App />
  </React.StrictMode>
);

