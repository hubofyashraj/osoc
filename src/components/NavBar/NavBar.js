import React from 'react'
import { Link } from 'react-router-dom'

import './NavBar.css'

const NavBar = () => {
    return (
        <div className='Nav'>
            <h5 className=''>Home</h5>
            <div className='btns'>
                <div className='btn'><Link to='/Login'>Login</Link></div>
                <div className='btn'><Link to='/SignUp'>SignUp</Link></div>
            </div>
        </div>
    );
};

export default NavBar;