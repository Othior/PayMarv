import React, { createRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire , db } from "../../fire"

function Login() {

  const history = useHistory();

  const email = createRef();
  const password = createRef();

  const signIn = () => {
    const mail = email.current.value;
    const passwd = password.current.value;

    fire.auth().signInWithEmailAndPassword(mail,passwd).then(()=>{
      let data = [];
      db.collection("Users").where( "email" , "==" , mail ).get().then(snapshot =>{
        snapshot.forEach(doc => {
          data.push(doc.data().pseudo)
          console.log("doc => ",doc.data().pseudo)
        })
      })
      setTimeout(()=>{
        alert("ok !")
        localStorage.setItem("pseudo",JSON.stringify(data))
        history.push("/note")
      },2000)
    })
    

  }
    return (
      <div>
        <h2> Se Connecter </h2>
        <div>
          <label>Email :</label> <input type="text" ref={email}/>
          <label>Mot de passe :</label> <input type="password" ref={password}/>
          <input type="submit" onClick={(ev)=> signIn(ev)} value="se connecter"/>
        </div>
        <Link to="/register">pas de compte? s'enregistrer </Link>
      </div>
    );
  }
  
  export default Login;