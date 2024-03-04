import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import PostView from "./pages/PostView";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>
            <Routes>
              <Route Component={Home} path='/' />
              <Route Component={Login} path='/login' />
              <Route Component={SignUp} path='/signup' />
              <Route Component={Post} path='/create_post' />
              <Route Component={PostView} path='/post/:id' />
            </Routes>
          <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;