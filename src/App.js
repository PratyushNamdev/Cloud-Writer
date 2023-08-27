import "./App.css";
import About from "./components/About";
import  { Toaster } from 'react-hot-toast';
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NoteState from "./components/context/Notes-Context/NoteState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthState from "./components/context/auth/AuthState";
import Signup from "./components/Signup";
import VerifyOTP from "./components/VerifyOTP";

function App() {
  

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <AuthState>
          <Toaster />
          
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/verifyOTP" element={<VerifyOTP/>}/>
            </Routes>
          </AuthState>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
