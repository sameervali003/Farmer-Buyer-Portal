import React from "react"
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Detect from "./components/Detect";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact path="login" element={<Login />} />
          <Route element={<NavBar/>}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="about" element={<About />} />
          <Route exact path="detect" element={<Detect />} />
          </Route> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;