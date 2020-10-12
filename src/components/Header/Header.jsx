import React from "react"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import Logout from "../Auth/Logout"


 function Header(){
    
    
    
    return(
        <header>
            <h1>PayMarv</h1>
            <ul>
                <li><Link to="/note">Note</Link></li>
                <li><Link to="/pay">Pay</Link></li>
                <li>
                    <span className="pseudo">{JSON.parse(localStorage.getItem("pseudo"))}</span>
                    <span>
                    {localStorage.getItem("pseudo") ? <Logout/>  : <Link to="/login">Login</Link>}
                    </span>
                </li>
            </ul>

        </header> 
    )
    
}
export default Header