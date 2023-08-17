import React , {useState , useContext} from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "./AuthContext";
import NoteContext from '../Notes-Context/NoteContext';
const AuthState = (props) =>{
   const [status , setStatus] = useState(false);
   const [userName , setUserName] = useState("");
   const {setNotes} = useContext(NoteContext);
    let navigate = useNavigate();
    const host = "http://localhost:5000";
    const login =  async (email , password) => {
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", //using Post method coz we are sending data
            headers: {
              "content-Type": "application/json"
            },
            body : JSON.stringify({ email , password })
          });
          const data = await response.json();
          if (data.authToken) {
             setNotes([]);
             setUserName(`${data.user.name}`);
             localStorage.setItem('token' , data.authToken);
              navigate('/')
              setStatus(true);
          }
          else{
            alert("enter valid email or password"); 
          }
           
    }

    const signup = async (name , email , password)=>{
      const response = await fetch(`${host}/api/auth/signup`, {
        method: "POST", //using Post method coz we are sending data
        headers: {
          "content-Type": "application/json"
        },
        body : JSON.stringify({ name , email , password })
      });
      const data = await response.json();
      if (data.authToken) {
        setNotes([]);
         localStorage.setItem('token' , data.authToken);
         setUserName(`${data.user.name}`);
          navigate('/')
          setStatus(true);
      }
      else{
        console.log(data);
      }
      }

      const logout = ()=>{
        setNotes([]);
        localStorage.removeItem('token');
        navigate('/login');
        setStatus(false);
      }



return(
    <AuthContext.Provider
      value={{
      login,
      signup,
      status,
      setStatus,
      logout,
      userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
)
}
export default AuthState;