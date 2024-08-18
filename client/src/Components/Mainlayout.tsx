// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => (
  <div>
    <Header />
    <main className="p-4">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;