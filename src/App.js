import React from 'react';
// import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import JsonPlaceholderPage from './pages/JsonPlaceholderPage/JsonPlaceholderPage';
import './style.css';

export default function App() {
  return (
    <section className="nik_app">
      {/* <HomePage /> */}
      <ProductsPage />
      <JsonPlaceholderPage />
    </section>
  );
}
