import React from 'react';
import '../App.css';

import logo from '../assets/logo.webp';


export default function Header() {
  return (
    <>
        <span className='centering'>
            <div className=" w-85">
            <span className="centering">
                <img className='rounded-full' width='100px' height='100px' src={logo} alt="logo" />
            </span>
            <h1 className="font-bold text-2xl">Chat with DocDAI!</h1>
            <h5>Your go-to companion for navigating health information.</h5>
            </div>
        </span>
      <br />
    </>
  )
}
