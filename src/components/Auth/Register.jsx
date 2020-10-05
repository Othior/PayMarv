import React, { createRef } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import {fire, db} from "../../fire";

function Register() {

  const email = createRef();
  const password = createRef();
  const pseudo = createRef();

  const history = useHistory();

  const signUp = () => {
    const mail = email.current.value;
    const passwd = password.current.value;
    const username = pseudo.current.value;
    console.log("mail =>",mail,"passwd =>",passwd,"username => ",username)

    db.collection("Users").doc(username).set({
        pseudo:username,
        mail:mail,
        password:passwd
    })
    
    
    fire.auth().createUserWithEmailAndPassword(mail,passwd).then(()=>{
    });
    
    localStorage.setItem('pseudo', JSON.stringify(username))
    history.push("/")
    

  }
    return (
      <div>
        <h2> S'enregister </h2>
        <div>
          <label>Email :</label> <input type="email" ref={email} required/>
          <label>Pseudo :</label> <input type="text" ref={pseudo} required/>
          <label>Mot de passe :</label> <input type="password" ref={password} required/>
          <input type="submit" onClick={(ev) => signUp(ev) }value="s'enregister"/>
        </div>
        <Link to="/login">vous avez déjà un compte ? se connecter </Link>
      </div>
    );
  }
  
  export default Register;