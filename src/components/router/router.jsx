import {Route, Routes} from "react-router";
import App from "../app";
import Login from "../../pages/login";
import Profile from "../../pages/profile";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import React from "react";

function Router() {
  
  return(
    <>
    
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
    </>
  )
  
  
}


export default Router;
