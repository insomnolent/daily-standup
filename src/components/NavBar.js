import React from 'react'
import { A } from 'hookrouter'
import rats from '../img/rats.png'
import '../css/NavBar.css'

function NavBar() {
  return (
    <div className="navbar">
      <A href="/" className="navbar-logo">
        <img src={rats} className="navbar-logo-size" alt="logo" />
      </A>
      <A href="/about">About</A>
      <A href="/settings">Settings</A>
    </div>
  )
}

export default NavBar