import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import Home from '../pages/Home.jsx';
import RefreshHandler from './Rereshhandler.jsx';

function App(){
  const [isAuthenticated,setIsAuthenticated]=useState(false);

  const PrivateRoute=({element})=>{
    const token = localStorage.getItem('token');
    if(isAuthenticated || token){
      return element;
    }
    return <Navigate to="/login" replace />;
  }
  return(
    <div className='App'>
      <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<PrivateRoute element={<Home/>} />} />
          <Route path='*' element={<h1>404 - Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;