import "./App.css";
import About from "./components/About";

import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NoteState from "./components/context/Notes-Context/NoteState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthState from "./components/context/auth/AuthState";
import Signup from "./components/Signup";

function App() {
  

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <AuthState>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup/>} />
            </Routes>
          </AuthState>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
