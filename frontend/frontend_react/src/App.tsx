import React from 'react';
import Home from './Components/Home';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import ProductProvider from './Context/ProductContext';
// @ts-ignore: allow importing css without type declarations
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <Home />
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}


export default App;
