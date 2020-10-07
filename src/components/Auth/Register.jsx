import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import {fire, db} from "../../fire";

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
        console.log(doc.id, " => ", doc.data().mail);
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
          console.log("doc => ",doc)
          localStorage.setItem('pseudo', JSON.stringify(username))
          history.push("/")
        });
      }
      console.log("mailUser => ",item)
    })

    
    

  }
    return (
      <div>
        <h2> S'enregister </h2>
        <div>
          <label>Pseudo :</label> <input type="text" ref={pseudo} required/>
          <label>Email :</label> <input type="email" ref={email} required/>
          <label>Mot de passe :</label> <input type="password" ref={password} required/>
          <input type="submit" onClick={(ev) => signUp(ev) }value="s'enregister"/>
        </div>
        <Link to="/login">vous avez déjà un compte ? se connecter </Link>
      </div>
    );
  }
  
  export default Register;