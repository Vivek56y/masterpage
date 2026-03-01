import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newsignupInfo = { ...signupInfo, [name]: value };
    setsignupInfo(newsignupInfo);
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const url = "http://localhost:5000/auth/register";
      console.log('Signup request URL:', url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupInfo)
      });

      const data = await response.json();
      const success = data?.success ?? data?.sucess;
      const message = data?.message;

      if (success) {
        toast.success(message || 'Signup successful');
        setTimeout(()=>{
          navigate("/login");
        },2000)
      } else {
        toast.error(data.message || "Signup failed");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handlesignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            placeholder='Enter your name...'
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your Email...'
            value={signupInfo.email}
          />
        </div> 

        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={signupInfo.password}
          />
        </div>

        <button type='submit'>Signup</button>

        <span>
          Already have an account? 
          <Link to="/login"> Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Signup;