import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import bcrypt from 'bcryptjs';

import './SignUp.css';

export default function SignUP() {

    const {register, handleSubmit} = useForm();
    const [matchingPassword, setMatchingPassword] = useState(true);
    const [usedEmail, setUsedEmail] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [emptyDetails, setEmptyDetails] = useState(false);


    const on_submit = (d) => {

        if(d.password.length===0 || d.cnfpassword.length===0 || d.email.length===0 || d.name.length===0){
            setEmptyDetails(true);
        }else if(d.password!==d.cnfpassword){
            setEmptyDetails(false);
            setMatchingPassword(false);
        }else{
            setEmptyDetails(false);
            setMatchingPassword(true);
            axios.post('http://localhost:3001/ifExists', {uid: d.email})
            .then(res=>{
                console.log(res.data);
            if(res.data.status===false){ //EMAIL IS NOT USED
                setUsedEmail(false);
                const salt = '$2a$04$p2ZwyrDfGodsmqQQBoD70e';
                const user={
                    name: d.name,
                    email: d.email,
                    password: bcrypt.hashSync(d.password, salt)
                }
                axios.post('http://localhost:3001/createNewUser', {data: user})
                .then(res=>{
                    console.log(res);
                    if(res.data.acknowledged===true){ //SignUp Successful
                        setSignupSuccess(true);
                        window.location.href='/Home'
                    }else{
                        setSignupSuccess(false);
                    }
                })
            }else{
                setUsedEmail(true);
            }
        })
        }
        
        
    }

    function TextField(props) {
        return (
            <div>
                <label className="mb-1" for={props.id} >{props.text}</label>
                <input className="form-control  mb-2"  {...register(props.id)} type={props.type} placeholder={props.placeholder} />
            </div>
        );
    }

    return (
        <div id="signupdiv">
            <hr />
            <form onSubmit={handleSubmit(on_submit)}>
                { !matchingPassword && (<p className="text-danger">Password do not match</p>)}
                { usedEmail && (<p className="text-danger">Email is used already kindly login</p>)}
                { signupSuccess && (<p className="text-success">Signed Up redirecting to login page</p>)}
                { emptyDetails && (<p className="text-danger">Please Enter all details</p>)}
                <TextField id='name' text='Name' type='text' placeholder='John Doe' />
                <TextField id='email' text='Email {WebMail}' type='email' placeholder='someone@example.com' />
                <TextField id='password' text='Password' type='password' placeholder='*****' />
                <TextField id='cnfpassword' text='Confirm Password' type='password' placeholder='*****' />
                <input className="m-0 btn-sm btn btn-primary fs-5 form-control "  type="submit" value="Sign Up" />
            </form>
            {/* <button onClick={()=>window.location.href='/Login'}>Login</button> */}

            <hr />
        </div>
    );
}