import axios from "axios";
import React, { useEffect, useState } from "react";
import { InfinitySpin } from 'react-loader-spinner'
 
import './Profile.css'

export default function Profile() {
    const [info, setInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        getinfo().then(()=>{ setIsLoading(false) });            
    }, []);

    

    async function getinfo() {
        
        if(localStorage.getItem('id')===null){
            window.location.href='/Home'
        }else{
            const save_data = JSON.parse(localStorage.getItem('id'))
            axios.post('http://localhost:3001/getinfo', {
                data: save_data
            }).then(res=>{
                // console.log('PRofile', res.data);
                if (res.data.status===false){
                    window.location.href=res.data.action
                }else{
                    setInfo(res.data.data);
                }
            })
        }
        
        
        
    }

    async function logout() {
        console.log('logout called');
        const save_data = JSON.parse(localStorage.getItem('id'));
        
        axios.post('http://localhost:3001/logout', { data: save_data })
        .then(res=>{
            localStorage.removeItem('id');
            window.location.href='/Home'
        })
    }

    async function editprofile() {

    }

    return (
        <div style={{backgroundColor: '#FFFFDD'}}>
            { isLoading && (<InfinitySpin color="blue" width="15em" />) }
            { !isLoading && (
                <div>
                    <div className="nav d-flex flex-row justify-content-between p-2">
                        <h3>Profile</h3>
                        <div style={{display: "flex", gap: "1em"}}>
                            <div className=" btn btn-sm  btn-light m-0 px-2 fs-6" onClick={editprofile} id="editprofile"  >Edit Profile</div>
                            <div className=" btn btn-sm  btn-danger m-0 px-2 fs-6" onClick={logout} id="logout"  >Logout</div>
                        </div>
                    </div>
                    <div  >
                        <hr />
                        <h4>Name: {info.name}</h4>
                        <h4>Email: {info.email}</h4>
                        <hr />    
                    </div>
                </div>
            )}            
        </div>
    );
}