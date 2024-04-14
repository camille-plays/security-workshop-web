import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import './index.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Logout from './Logout';
import Transfer from './Transfer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfers" element={<Transfer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
