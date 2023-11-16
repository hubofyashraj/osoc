import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


export default function SignUP() {

    const {register, handleSubmit} = useForm();
    //TODO
    const on_submit = (d) => {
        // alert(JSON.stringify(d));
        axios.post('http://localhost:3001/ifExists', {uid: d.email})
        .then(res=>{
            if(res.data.status==false){ //EMAIL IS NOT USED
                axios.post('http://localhost:3001/createNewUser', {data: d})
                .then(res=>{
                    if(res.acknoledged==true){
                        window.location.href='/Login'
                    }
                })
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
            <h3>Sign Up</h3>
            <hr />
            <form onSubmit={handleSubmit(on_submit)}>
                <TextField id='name' text='Name' type='text' />
                <TextField id='email' text='Email {WebMail}' type='email' />
                <TextField id='password' text='Password' type='password' />
                <TextField id='cnfpassword' text='Confirm Password' type='password' />
                <button type="submit">Sign Up</button>
            </form>

            <hr />
        </div>
    );
}