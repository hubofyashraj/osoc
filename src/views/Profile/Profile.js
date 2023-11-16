import axios from "axios";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";



export default function Profile() {
    const [info, setInfo] = useState([]);

    useEffect(()=>{
        getinfo();
    }, []);

    async function getinfo() {
        const save_data = JSON.parse(localStorage.getItem('id'))
        axios.post('http://localhost:3001/getinfo', {
            data: save_data
        }).then(res=>{
            if (res.data.status==false){
                // localStorage.setItem('id', '')
                window.location.href=res.data.action
            }else{
                setInfo(res.data.data);
            }
        })
        
        
    }


    return (
        <div>
            <div></div>
            <div>
                <h3>Profile</h3>
                <hr />
                <h4>Name: {info.name}</h4>
                <h4>Email: {info.email}</h4>
                <hr/>    
            </div>            
        </div>
    );
}