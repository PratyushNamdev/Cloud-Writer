import React , {useState , useContext, useEffect} from 'react'
import AuthContext from './context/auth/AuthContext';
import './Style/login.css';
import {Link , useNavigate} from 'react-router-dom'
import NoteContext from './context/Notes-Context/NoteContext';
import Loading from './Loading'
export default function Signup() {
  const navigate = useNavigate();
    const [credentials , setCredentials] = useState({name:"" ,email:"" , password : ""});
    const { signup} = useContext(AuthContext);
    const {isLoading} = useContext(NoteContext)
     const handleLogin = (e)=>{
         e.preventDefault()
         signup( credentials.name , credentials.email , credentials.password);
     }
     const handleChange = (e)=>{
         setCredentials({...credentials , [e.target.name] : e.target.value})
 
     }
     useEffect(()=>{
     if(localStorage.getItem('token')){
      navigate('/');
     }
     // eslint-disable-next-line
     },[])
  return (

    <div>
      {isLoading && <Loading/>}
       <form className='form_container' onSubmit={handleLogin}>
      <h3>Cloud Writer - Sign-In</h3>
        <div className='row_'><input placeholder='Enter Name' type="text" name='name' value={credentials.name} onChange={handleChange} required minLength={3}/></div>
        <div className='row_'><input placeholder='Enter E-mail' type="email" name='email' value={credentials.email} onChange={handleChange} required/></div>
        <div className='row_'><input placeholder='Enter Password' type="password" name='password' value={credentials.Password} onChange={handleChange} autoComplete='on' required minLength={6}/></div>
        <div className='row_'><button type='submit' >Sign - Up</button></div>
        <Link to='/login'>Already Have an account ?</Link>
      </form>
    </div>
  )
}
