import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { Login } from "../Login";
import { SignUP } from "../SignUp";

import './Home.css'

export default function Home() {
    const [page, setPage] = useState('login')
    function login(){
        // const div = document.getElementById("canvas");
        // div.style.transition='all 0.7s ease'
        setPage('login');
        // window.location.href='/Login'
    }

    function signup(){
        setPage('signup')
        // window.location.href='/SignUp'
    }

    function isActive(btnname) {
        if(page===btnname)  return 'btn-secondary'
        else return ''
    }

    return (
        <div  className="w-100 h-100 bg-light">
            <div className="nav ">
                <h5>Home</h5>

            </div>
            <div style={{height: `calc(100vh - 50px)`}} className={"pane d-flex align-items-center "}>
                <div className="card py-2 form-card  mx-auto my-auto">
                    <div className="d-flex align-self-center flex-row bd-highlight">
                        <div className={"btn p-2 fs-5 " + isActive('login')} onClick={login} disabled={page==='login'}>Login</div>
                        <div className={"btn p-2 fs-5 " + isActive('signup')} onClick={signup} disabled={page==='signup'}>Sign Up</div>
                    </div>
                    <div id="canvas" className="m-3">
                        { page==='login' && (<Login />)}
                        { page==='signup' && (<SignUP />)}
                    </div>

                </div>
            </div>
        </div>
    );
}