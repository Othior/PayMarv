import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire , db } from "../../fire";
import Header from "../Header/Header";

function Pay() {

    const history = useHistory();
    const titleInput = createRef();
    const priceInput = createRef();
    
    const [month,setMonth] = useState(["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"]);
    let data = [];
    let total = [];
    const [price,setPrice] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);

    const today = new Date();
    const getMonthToday = today.getMonth();


  const payDay = () => {

    const title = titleInput.current.value;
    const price = priceInput.current.value;

    if(title !== "" && price !== "" && JSON.parse(localStorage.getItem("pseudo"))!== null){
      db.collection("Pay").doc(title).set({
          UserId:JSON.parse(localStorage.getItem("pseudo")),
          title:title,
          price:parseInt(price),
          month:month[getMonthToday]
      })
      setTimeout( () => {
          window.location.href="/pay";
      },2000)
    }else if(title === "" || price === ""){
      alert(" Vous n'avez pas remplis les champs ");
    }else{
      alert(" Vous n'avez pas de compte , vous devez vous inscrire ");
      history.push("/login");
    }

  }

  const deletedItem = (ev,id) =>{
    db.collection("Pay").doc(id).delete().then(()=>{
      alert("Objet est bien supprimé ! ")
      window.location.href="/pay";
    })
  }

  const fetchPay = () => {
    db.collection("Pay").where("UserId","==",JSON.parse(localStorage.getItem("pseudo"))).get().then(querySnapshot =>{
        querySnapshot.forEach(doc => {
          data.push(doc.data())
          // console.log(doc.id, " => ", doc.data().price);
          total.push(parseInt(doc.data().price));
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          total.reduce(reducer);
          
        });
        setPrice(data);
        setTotalPrice(sum());
    })
  }

const sum = ()=>{
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return total.reduce(reducer);
}
  

  useEffect(()=>{
    fetchPay();
  },[])
    return (
      <>
        <Header/>
            <h2 className="titlePay"> Fiche de trucs a payer </h2>
        <div className="container">
          <div className="form">
              <label htmlFor="">Titre : </label><input className="inputTitlePay" type="text" ref={titleInput}/>
            
              <label htmlFor="">Prix  : </label><input className="inputPricePay" type="number" ref={priceInput}/>
            
              <button className="btnSubmitPay" type="submit" onClick={(e) => payDay(e)}>
                Ajouter
              </button>
          </div>
          <div className="containerFiche">
            <h3 className="titleFiche">A Payer</h3>
              <div>
                {price.map((item,index)=>(
                <div className="fiche" key={index}>
                  <div className="item_fiche" >
                      <p>{item.title} {item.price} <i className="fas fa-euro-sign"></i> en {item.month} <span className="deleted" onClick={(ev) => deletedItem(ev,item.title)}>X</span> </p>
                      {/* <img src="../../assets/euro.png" />  */}
                  <hr/>
                  </div>
                </div>
              ))}
              </div>
              <div className="fiche">
                <div>
                  <p> Total :{ totalPrice } <i className="fas fa-euro-sign"></i></p>
                </div>
                
              </div>
              
          </div>
        </div>
      </>
    );
  }
  
  export default Pay;