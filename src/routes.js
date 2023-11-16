import React from "react";
import { Home } from './views/Home'
import { Login } from './views/Login'
import { SignUP } from "./views/SignUp";
import { Profile } from "./views/Profile";
import { NavBar } from "./components/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";

export const RoutesComp = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route exact path="/Home" Component={Home} />
                <Route exact path="/" element={<Navigate to="/Home" />}/> 
                <Route exact path="/Login" Component={Login} />
                <Route exact path="/SignUp" Component={SignUP} />
                <Route exact path="/Profile" Component={Profile} />
            </Routes>
        </div>
    )
}