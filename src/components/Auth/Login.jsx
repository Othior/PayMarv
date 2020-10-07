import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire , db } from "../../fire"

function Login() {

  const history = useHistory();

  const email = createRef();
  const password = createRef();

  const [allFiles,setAllFiles] = useState();


  const fetchUser = () => {
    let data = [];
    db.collection("Users").get().then(snapshot =>{
        snapshot.forEach(doc => {
          data.push(doc.data());
      })
      setAllFiles(data);
    })
  }
  useEffect(()=>{
    fetchUser();
  },[])


  const signIn = () => {
    const mail = email.current.value;
    const passwd = password.current.value;
    allFiles.map((item)=>{
      if(item.mail === mail){
        fire.auth().signInWithEmailAndPassword(mail,passwd).then(()=>{
          localStorage.setItem("pseudo",JSON.stringify(item.pseudo));
          history.push("/note");
        })
      }
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