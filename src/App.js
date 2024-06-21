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
import Profile from './pages/Profile';
import {PostsProvider} from "./context/PostContext";
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <PostsProvider>
              <Header/>
                <Routes>
                  <Route Component={Home} path='/' />
                  <Route Component={Login} path='/login' />
                  <Route Component={SignUp} path='/signup' />
                  <Route Component={Post} path='/create_post' />
                  <Route Component={PostView} path='/post/:id' />
                  <Route Component={Profile} path='/profile/:username'/>
                  <Route Component={SearchPage} path='/search/:keyword'/>
                </Routes>
              <Footer/>
          </PostsProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
