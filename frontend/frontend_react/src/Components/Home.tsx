import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../Context/UserContext';
import { User, UserContextState } from '../Types/User';

import Navbar from './Navbar/Navbar';
import Announcement from './Announcement/Announcement';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './Theme';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';

// Importaciones de React Router
import { Routes, Route } from 'react-router-dom';

import Cart from './Cart/Cart';                     // Ajusta la ruta según tu estructura
import Login from './LoginRegister/Login';                  // Ajusta la ruta según tu estructura
import ProductDisplay from './Slider/Slider'; // Para la ruta principal o catálogo si aplica

const Container = styled.div`
  background-color: ${(props: any) => props.theme.body};
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const ThemeButton = styled.button`
  position: fixed;
  z-index: 3;
  bottom: 60px;
  right: 20px;
  background: transparent;
  cursor: pointer;
  border: none;
`

const Home: React.FC = () => {
  // Inicializa el estado directamente con lo que haya en localStorage o 'light' por defecto
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const themeToggler = () => { 
    if (theme === 'light'){
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }

  const id: number = Number(localStorage.getItem("curUserI"));

  const { updateCurrentUser } = useContext(Context) as UserContextState

  useEffect(() => {
    const getTheUser = async () => {
      try{
        let res = await axios.get<User>(
          'http://localhost:8000/users/user',
          {
            headers : { 'Access-Control-Allow-Origin' : '*' },
            params: { id : id },
          }
        )
        let tUser = res.data;
        if (tUser){
          updateCurrentUser(tUser);
        }
      }
      catch(e){
          //TODO
      }
    };
    getTheUser();
  }, [id, updateCurrentUser])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme }>
      <ThemeButton onClick={themeToggler} >
        {
          theme === 'light' ?
          <DarkModeOutlined style={{fontSize: '3em', borderRadius: '50%', backgroundColor: 'transparent', color: '#333'}} />
          :
          <LightModeOutlined style={{fontSize: '3em', borderRadius: '50%', backgroundColor: 'transparent', color: 'white'}} />
        }
      </ThemeButton>
      <Container>
        <Announcement />
        <Navbar />
        
        {/* Configuración de las rutas según la imagen */}
        <Routes>
          <Route path="/" element={<ProductDisplay />} />
          
          <Route path="/cart" element={<Cart />} />
          <Route path="/LoginRegister" element={<Login />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
};

export default Home;