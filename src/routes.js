import React from "react";
import { Home } from './views/Home'
import { Profile } from "./views/Profile";
import { Route, Routes, Navigate } from "react-router-dom";

export const RoutesComp = () => {
    return (
        <div className="" style={{height:"100vh"}}>
            <Routes>
                <Route exact path="/Home" Component={Home} />
                <Route exact path="/" element={<Navigate to="/Home" />}/> 
                <Route exact path="/Login" element={<Navigate to="/Home" />} />
                <Route exact path="/SignUp" element={<Navigate to="/Home" />} />
                <Route exact path="/Profile" Component={Profile} />
            </Routes>
        </div>
    )
}