import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newloginInfo = { ...loginInfo, [name]: value };
    setloginInfo(newloginInfo);
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const url = "http://localhost:5000/auth/login";
      console.log('login request URL:', url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
      });

      const data = await response.json();
      const {success,message,jwtToken,name,error}=data;

      if (success) {
        toast.success(message || 'Login successful');
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(()=>{
          navigate("/home");
        },2000)
      } else {
        toast.error(data.message || "Login failed");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handlelogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your Email...'
            value={loginInfo.email}
          />
        </div> 

        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={loginInfo.password}
          />
        </div>

        <button type='submit'>Login</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;