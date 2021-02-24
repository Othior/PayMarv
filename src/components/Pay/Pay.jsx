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
    // let [resultTotalPrice ,setResultTotalPrice] = useState(0)
    let [totalPrice,setTotalPrice] = useState(0);

    const today = new Date();
    const getMonthToday = today.getMonth();


  const payDay = () => {

    const title = titleInput.current.value;
    const price = priceInput.current.value;

    if(title !== "" && price !== "" && JSON.parse(localStorage.getItem("pseudo"))!== null){
      db.collection("Pay").doc(title).set({
          UserId:JSON.parse(localStorage.getItem("pseudo")),
          title:title,
          price:parseFloat(price),
          month:month[getMonthToday]
      })
      setTimeout( () => {
          window.location.href="/pay";
      },1000)
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
          data.push(doc.data());


          if(doc.data() === null || doc.data() === undefined || doc.data() === ""){
            // console.log("il n'y a rien dans le panier");
          }else{
            // console.log("il y a des choses dans le panier")
            total.push(parseFloat(doc.data().price));
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            total.reduce(reducer);
            setTotalPrice(sum());
          }
          // console.log(doc.id, " => ", doc.data());
          // if(doc.data().price)
          
          
        });
        setPrice(data);
        
    })
  }

const sum = () => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return total.reduce(reducer);
}
const highligth = (e,index,item) => {
  let valueIsHighLigth = document.querySelector("#listValue"+index).children[0].classList;
  let result = 0;
    price.map(element =>{
            if(element === item){
                // console.log("valueIsHighLigth => ",valueIsHighLigth)
                if(valueIsHighLigth.contains("line")){
                    valueIsHighLigth.remove("line");
                    totalPrice += element.price 
                    console.log(totalPrice)
                }else{
                    valueIsHighLigth.add("line");
                    console.log(element.price);
                    totalPrice -= element.price;
                    console.log(totalPrice)
                }
            }
        })
}
  function handleTotalPrice(e){
    console.log(e.target.value)
  }

  useEffect(()=>{
    fetchPay();
  },[])
    return (
      <>
        <Header/>
        <div className="containerPay">
            <h2 className="titlePay"> Fiche de trucs a payer </h2>
          <div className="form">
              <label htmlFor="">Titre : </label><input className="inputTitlePay" type="text" ref={titleInput}/>
            
              <label htmlFor="">Prix  : </label><input className="inputPricePay" type="number" ref={priceInput}/>
            
              <button className="btnSubmitPay" type="submit" onClick={(e) => payDay(e)}>
                Ajouter
              </button>
          </div>
          <div className="containerFiche">
          <div className="fiche">
                <p onChange={ e => handleTotalPrice(e) }>{ totalPrice } <i className="fas fa-euro-sign"></i></p>
            </div>
            <div className="blockPay">
                {price.map((item,index)=>(
                  <div className="listValue" key={index} id={"listValue"+ index}>
                      <p>
                        {item.title} {item.price} <i className="fas fa-euro-sign"></i>
                        {/* &emsp;{item.month} <i class="fas fa-calendar-check"></i> */}
                      </p>
                      <div className="btnMenu">
                          {/* <span onClick={ (e) => highligth(e,index,item) }><i className="fas fa-check valid"></i></span> */}
                          <span onClick={(ev) => deletedItem(ev,item.title)}><i className="fas fa-times delete"></i></span>
                      </div>
                  </div>
              ))}
              </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Pay;