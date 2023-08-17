import React , {useContext, useEffect} from "react";
import AuthContext from "./context/auth/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
   const {status , setStatus , logout} = useContext(AuthContext);
  
   
   useEffect(()=>{
    if(localStorage.getItem('token')){
      setStatus(true)
    }
    else{
      
      setStatus(false)
    }
      // eslint-disable-next-line
   },[])

   const style = {
    minWidth:"70px",
    borderRadius:"10px",
    backgroundColor:"#3B71CA",
    border: "0",
    outline: "1px solid rgb(0, 0, 0)",
    padding:".5em",
    outlineOffset:" -7px"
   }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand  text-light" href="/">
          Cloud Writer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          
            <li className="nav-item">
              <Link to="/" className="nav-link  text-light">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link  text-light">
                About
              </Link>
            </li>
           
          </ul>
        {
          
          status ?<ul className="navbar-nav ">
          <li className="nav-item">
              <button  style={style} className="register_btns" onClick={logout}>Log Out</button>
             </li>
          </ul> : <ul className="navbar-nav ">
        <li className="nav-item">
             <Link to="/login" className="nav-link  text-light">
               <button style={style} className="register_btns">Login</button>
             </Link>
           </li>
           <li className="nav-item">
             <Link to="/signup" className="nav-link  text-light">
               <button style={style} className="register_btns">SignUp</button>
             </Link>
           </li>
           
        </ul>
         
        }
        
        </div>
      </nav>
    </div>
  );
}
