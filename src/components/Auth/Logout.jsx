import React from "react"
import {  fire } from '../../fire';


export default function Logout(){
    
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("pseudo");
        fire.auth().signOut()
        window.location.href = "/"
    }
    
    return <span className="btnLogout" onClick={(e) => handleLogout(e)} >Logout</span>
}