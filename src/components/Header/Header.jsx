import  React , { createRef, useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import Logout from "../Auth/Logout"


 function Header(){
    
    const hamburgerResponsive = createRef();
    let isClicked = false;

    const responsiveNavbar = (e) => {
        isClicked = !isClicked

        if(isClicked){
            hamburgerResponsive.current.classList.add("active");
            
        }else{
            hamburgerResponsive.current.classList.remove("active")
        }
    }
    
    return(
        <header>
            <nav>
                <div className="hamburger">
                    <input type="checkbox" id="check"/>

                    <div for="check" className="checkbtn"  onClick={(e)=> responsiveNavbar(e)}>
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
                <div className="nav-item" >
                    <h2>PayMarv</h2>
                    <ul ref={hamburgerResponsive}>
                        <li><Link to="/note">Note</Link></li>
                        <li><Link to="/pay">Pay</Link></li>
                        <li className="spaceUser">
                            <span className="pseudo">{JSON.parse(localStorage.getItem("pseudo"))}</span>
                            <span>
                                {localStorage.getItem("pseudo") ? <Logout/>  : <Link to="/login">Login</Link>}
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
        </header> 
    )
    
}
export default Header