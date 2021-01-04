import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire, db } from "../../fire";
import Header from "../Header/Header";

function Note() {

  const history = useHistory();
  const titleInput = createRef();
  const urlInput = createRef();
  const [items,setItems] = useState([]);
  let data = [];

  const addNote = (e) => {
    const title = titleInput.current.value;
    const url = urlInput.current.value;
    if (title !== "" && url !== "" && JSON.parse(localStorage.getItem("pseudo")) !== null) {

      db.collection("Note").doc(title).set({
        UserId: JSON.parse(localStorage.getItem("pseudo")),
        title: title,
        url: url,
      })
      setTimeout(() => {
        window.location.href = "/note";
      }, 2000)
    }
    else if(title === "" || url === ""){
      alert(" Vous n'avez pas remplis les champs ");
    }else{
      alert(" Vous n'avez pas de compte , vous devez vous inscrire ");
      history.push("/login");
    }
  }

  const deletedItem = (ev,id) =>{
    db.collection("Note").doc(id).delete().then(()=>{
      alert("Objet est bien supprimé ! ")
      window.location.href="/note";
    })
  }

  const fetchNote = () => {
    db.collection("Note").where("UserId","==",JSON.parse(localStorage.getItem("pseudo"))).get().then(querySnapshot =>{
        querySnapshot.forEach(doc => {
          data.push(doc.data())
          // console.log(doc.id, " => ", doc.data());
        });
        setItems(data);
    })
  }

  useEffect(()=>{
    fetchNote();
  },[])

  return (
    <>
      <Header />
      <div>
        <h2 className="titlePay"> Note a prendre </h2>
        <div className="container">
          <div className="form">
            <label htmlFor="">Titre :</label><input className="inputTitlePay" type="text" ref={titleInput} />

            <label htmlFor="">Url :</label><input className="inputPricePay" type="url" ref={urlInput} />

            <button className="btnSubmitPay" type="submit" onClick={(e) => addNote(e)}>
              Ajouter
              </button>
          </div>
          <div className="containerFiche">
            <h3 className="titleFiche">Liens utiles :</h3>
              {items.map((item,index)=>(
                <div className="fiche" key={index}>
                  <div className="item_fiche" >
                      <span>{item.title} <a href={item.url}>click ici</a><span className="deleted" onClick={(ev) => deletedItem(ev,item.title)}>X</span> </span>
                      
                  <hr/>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default Note;