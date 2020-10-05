import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire , db } from "../../fire"

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
      <div>
        <h2> Fiche de trucs a payer </h2>
        <div>
            <label htmlFor="">Titre :</label><input type="text" ref={titleInput}/>
            <label htmlFor="">Prix</label><input type="number" ref={priceInput}/>
            <input type="submit" value="ajouter" onClick={(e) => payDay(e)}/>
        </div>
        <div className="fiche">
            {price.map((item,index)=>(
                <div key={index}>
                    <p>Titre : {item.title} = Prix : {item.price} € = Mois : {item.month}</p>
                </div>
            ))}
        </div>
      </div>
    );
  }
  
  export default Pay;