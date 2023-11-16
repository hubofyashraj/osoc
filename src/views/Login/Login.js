import React, { useEffect, useState } from "react";
import { loginClicked } from "./loginHandler";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate, redirect } from "react-router";

export default function Login() {

    const {register, handleSubmit} = useForm();
    


    const on_submit = (d) => {
        console.log(d);
        axios.post('http://localhost:3001/check',{uid: d.email})
        .then(res=>{
            if(res.data.status==false){
                window.location.href='/SignUp'
            }else{
                var save_data = {
                    id: d.email,
                    secret: res.data.secret
                }
                localStorage.setItem('id', JSON.stringify(save_data))
                window.location.href='/Profile'
            }
        })
    }

    function TextField(props) {
        return (
            <div>
                <h5>{props.text}</h5>
                <input {...register(props.id)} type={props.type} />
            </div>
        );
    }

    return (
        <div>
            <h3>Login</h3>

            <div>
                <hr />
                <form onSubmit={handleSubmit(on_submit)}>
                    <TextField text='Email' id='email' type='text' />
                    <TextField text='Password' id='password' type='password' />
                    <button type="submit">Login</button>
                </form>
                <hr />

            </div>
        </div>
    );
}