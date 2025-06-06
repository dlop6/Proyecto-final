import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesConfig from './routes';
import Navbar from './components/Navbar';
import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <RoutesConfig />
      </div>
    </BrowserRouter>
  );
}
