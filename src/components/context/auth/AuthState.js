import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import NoteContext from "../Notes-Context/NoteContext";
import { toast } from "react-hot-toast";
const AuthState = (props) => {
  //status is for login or sign up buttons
  const [status, setStatus] = useState(false);
 
  const { setNotes , setPage , setIsLoading} = useContext(NoteContext);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const host = "http://localhost:5000";

  const login = async (email, password) => {
  try{  
    setIsLoading(true);
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST", //using Post method coz we are sending data
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if(data.needVerificationstatus){
      setUserId(data.id);
      toast.success("OTP Sent !")
      navigate("/verifyOTP");
      setEmail(email);
      setIsLoading(false)
    }
   else if (data.authToken) {
      setNotes([]);
    
      localStorage.setItem("token", data.authToken);
      navigate("/");
      toast.success("Login Successful!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },

      });

      setStatus(true);
      setIsLoading(false)
    } else {
      throw new Error();
    }}
    catch(e){
      setIsLoading(false)
      toast.error("Invalid Crediantials!")
    }
  };

  const signup = async (name, email, password) => {
  
    try{ 
     setIsLoading(true);
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST", //using Post method coz we are sending data
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if(data.error){
      throw new Error()
    }
    if (data.needVerificationstatus) {
      setUserId(data.id);
      toast.success("OTP Sent !")
      navigate("/verifyOTP");
      setEmail(email);
      setIsLoading(false)
    } }
    catch(e){
      setIsLoading(false)
      toast.error("Email Already Exist...")
    }
  };

  const logout = () => {
    setNotes([]);
    setPage(0);
    localStorage.removeItem("token");
    toast.success("Logout Successful!", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    navigate("/login");
    setStatus(false);
  };

  const checkOTP = async (otp) => {
    const response = await fetch(`${host}/api/auth/verifyOTP`, {
      method: "POST", //using Post method coz we are sending data
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ userId, otp }),
    });
    const data = await response.json();
    if (data.status) {
      toast.success("OTP Verified ! you can Login now", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        status,
        setStatus,
        logout,
        setUserId,
        userId,
        checkOTP,
        email,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
