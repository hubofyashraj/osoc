import "bootstrap/dist/css/bootstrap.min.css";

import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import bcrypt from 'bcryptjs';

import './Login.css'

export default function Login() {

    const {register, handleSubmit} = useForm();
    const [noSuchUser, setNoSuchUser] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [emptyCredentials, setEmptyCrediatials] = useState(false);
    const save_data = localStorage.getItem('id');
    
    async function checkIfLoggedIn() {
        if(save_data!==null)
            window.location.href='/Profile'
    }

    checkIfLoggedIn()

    const on_submit = (d) => {
        console.log(d);
        setNoSuchUser(false);
        setWrongCredentials(false);

        if(d.email.length===0 || d.password.length===0){
            setEmptyCrediatials(true);
        }else{
            setEmptyCrediatials(false);
            axios.post('http://localhost:3001/check',{uid: d.email, password: bcrypt.hashSync(d.password, '$2a$04$p2ZwyrDfGodsmqQQBoD70e')})
            .then(res=>{
                console.log(res);
                if(res.data.status===false){
                    if (res.data.reason==='norecordfound')    setNoSuchUser(true);
                    else if (res.data.reason==='wrongcredentials') setWrongCredentials(true);
                    // window.location.href='/SignUp'
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

    }

    function TextField(props) {
        return (
            <div className="form-group">
                <label className="mb-1" for={props.id} >{props.text}</label>
                <input className="form-control  mb-2" id={props.id} placeholder={props.placeholder}  
                    {...register(props.id)} type={props.type} />
            </div>
        );
    }

    return (
        <div>
            { (save_data==null) && (<div>
                <div id = "login_div">
                    <hr />
                    <form onSubmit={handleSubmit(on_submit)}>
                        {wrongCredentials && (<p className="text-danger">Wrong Credentials!!</p>)}
                        {emptyCredentials && (<p className="text-danger">Credentials can't be empty!!</p>)}
                        <TextField placeholder='someone@example.com' text='Email' id='email' type='text' />
                        {noSuchUser && (<p className="text-warning">Please Signup</p>)}
                        <TextField placeholder='*****' text='Password' id='password' type='password' />
                        <input className="m-0 btn-sm btn btn-primary fs-5 form-control " type="submit" value="Login" />
                    </form>
                    {/* <button onClick={()=>window.location.href='/SignUp'}>Sign Up</button> */}

                    <hr />

                </div>
            </div>)}
        </div>
    );
}