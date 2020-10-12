import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire , db } from "../../fire";
import Header from "../Header/Header";

function Pay() {


    const titleInput = createRef();
    const priceInput = createRef();
    
    const [month,setMonth] = useState(["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"]);
    let data = [];
    const [price,setPrice] = useState([]);

    const today = new Date();
    const getMonthToday = today.getMonth();


  const payDay = () => {
    const title = titleInput.current.value;
    const price = priceInput.current.value;
    db.collection("Pay").doc(title).set({
        title:title,
        price:price,
        month:month[getMonthToday]
    })
    setTimeout(()=>{
        window.location.href="/pay";
    },2000)

  }

  const deletedItem = (ev,id) =>{
    db.collection("Pay").doc(id).delete().then(()=>{
      alert("Objet est bien supprimé ! ")
      window.location.href="/pay";
    })
  }

  const fetchPay = () => {
    db.collection("Pay").get().then(querySnapshot =>{
        querySnapshot.forEach(doc => {
          data.push(doc.data())
          console.log(doc.id, " => ", doc.data());
        });
        setPrice(data);
    })
  }


  

  useEffect(()=>{
    fetchPay();
  },[])
    return (
      <>
        <Header/>
        <div>
          <div className="form">
          <h2 className="title"> Fiche de trucs a payer </h2>
            <div className="titleInput">
              <label htmlFor="">Titre : </label><input type="text" ref={titleInput}/>
            </div>
            <div className="priceInput">
              <label htmlFor="">Prix : </label><input type="number" ref={priceInput}/>
            </div>
            <div className="btnSubmit">
              <input type="submit" value="ajouter" onClick={(e) => payDay(e)}/>
            </div>
          </div>
          <div className="fiche">
              {price.map((item,index)=>(
                <>
                  <div className="item_fiche" key={index}>
                      <p>Titre : {item.title} = Prix : {item.price} € = Mois : {item.month} <span className="deleted" onClick={(ev) => deletedItem(ev,item.title)}>X</span> </p>
                  <hr/>
                  </div>
                </>
              ))}
          </div>
        </div>
      </>
    );
  }
  
  export default Pay;