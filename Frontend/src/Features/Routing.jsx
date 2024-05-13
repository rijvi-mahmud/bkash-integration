import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CheckoutPage from '../Pages/CheckoutPage';
import Home from '../Components/Home';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<CheckoutPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
