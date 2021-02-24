import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire, db } from "../../fire"
import Header from '../Header/Header';

function Login() {

  const history = useHistory();

  const email = createRef();
  const password = createRef();

  const [allFiles, setAllFiles] = useState();


  const fetchUser = () => {
    let data = [];
    db.collection("Users").get().then(snapshot => {
      snapshot.forEach(doc => {
        data.push(doc.data());
      })
      setAllFiles(data);
    })
  }
  useEffect(() => {
    fetchUser();
  }, [])


  const signIn = (e) => {
    e.preventDefault();
      const mail = email.current.value;
      const passwd = password.current.value;
  
      
  
      allFiles.map((item) => {
        if (item.mail === mail) {
          fire.auth().signInWithEmailAndPassword(mail, passwd).then(() => {
            localStorage.setItem("pseudo", JSON.stringify(item.pseudo));
            history.push("/note");
          })
        }
      })
  }
  return (
    <div>
      <Header />
      <div className="title-block">
        <span className="rectangle-gauche"></span><h2 className="title-form">Login</h2><span className="rectangle-droit"></span>
      </div>
      <div className="container-form-login">
        <form className="form" onSubmit={(e) => signIn(e) }>
          <label>Email :</label> 
          <input type="text" ref={email} required />
          <label>Password :</label>
          <input type="password" ref={password} required />
          <button className="btnSubmitPay" type="submit">Login</button>
          <div className="link-register-login">
            <Link to="/register">pas de compte? s'enregistrer </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;