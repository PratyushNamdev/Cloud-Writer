import React, { useState , useContext, useEffect} from 'react'
import AuthContext from './context/auth/AuthContext';
import {Link , useNavigate } from 'react-router-dom';
import './Style/login.css'
export default function Login() {
    const navigate = useNavigate();
    const [credentials , setCredentials] = useState({email:"" , password : ""});
   const { login } = useContext(AuthContext);
    const handleLogin = (e)=>{
        e.preventDefault()
        login(credentials.email , credentials.password);
    }
    const handleChange = (e)=>{
        setCredentials({...credentials , [e.target.name] : e.target.value})

    }
    useEffect(()=>{

      if(localStorage.getItem('token')){
        navigate('/')
      }
       // eslint-disable-next-line
    },[])
  return (
    <div>
      <form className='form_container' onSubmit={handleLogin}>
      <h3>Cloud writer - Login</h3>
        <div className='row_'><input placeholder='E-mail' type="email" name='email' value={credentials.email} onChange={handleChange}/></div>
        <div className='row_'><input placeholder='Password' type="password" name='password' value={credentials.Password} onChange={handleChange} autoComplete='on'/></div>
        <div className='row_'><button type='submit' >Login</button></div>
        <Link to='/signup'>Create New Acccount</Link>
      </form>
    </div>
  )
}
