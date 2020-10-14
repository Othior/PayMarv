import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import {fire, db} from "../../fire";
import Header from "../Header/Header";

function Register() {

  const [mailUser,setMailUser] = useState([])

  const email = createRef();
  const password = createRef();
  const pseudo = createRef();

  const history = useHistory();


  const fetchUser = () => {
    db.collection("Users").get().then( querySnapshot => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data().mail)
      });
      setMailUser(data);
    })
  }
  useEffect(()=>{
    fetchUser();
  },[])
  
  const signUp = () => {
    
    const mail = email.current.value;
    const passwd = password.current.value;
    const username = pseudo.current.value;

    mailUser.map(item=>{
      if(item !== mail){
        db.collection("Users").doc(username).set({
            pseudo:username,
            mail:mail,
            password:passwd
        })
        
        
        fire.auth().createUserWithEmailAndPassword(mail,passwd).then(doc => {
          localStorage.setItem('pseudo', JSON.stringify(username))
          history.push("/")
        });
      }
      console.log("mailUser => ",item)
    })

    
    

  }
    return (
      <div>
        <Header/>
        <div className="title-block">
            <span className="rectangle-gauche"></span><h2 className="title-form">Register</h2><span className="rectangle-droit"></span>
        </div>
            <div className="container-form-register">
                <form onSubmit={(ev) => signUp(ev)} className="form-register">
                    <div className="input-pseudo">
                        <label>Pseudo : </label><input type="text" ref={pseudo} required/>
                    </div>
                    <div className="input-email">
                        <label>Email : </label><input type="email" ref={email} required/>
                    </div>
                    <div className="input-password">
                        <label>Password : </label><input type="password"  ref={password} required/>
                    </div>
                    <div className="input-submit">
                        <input className="btn-submit" type="submit" value="Register"/>
                    </div>
                    <div className="link-register-login">
                    <Link to="/login">vous avez déjà un compte ? se connecter </Link>
                    </div>
                </form>
            </div>
      </div>
      
    );
  }
  
  export default Register;