import  React , { createRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire , db } from "../../fire";
import Header from "../Header/Header";

export default Todo;

function Todo(){
    const [listTodo,setTodoList] = useState([]);
    const data = [];
    const isTrue = true;
    const valueItem = createRef();
    const valueTodoList = createRef();
    const valueTodo = createRef();

    const sendValue = (e) => {
        e.preventDefault();
        console.log( "value input => ", valueTodo.current.value );
        db.collection("Todo").doc(valueTodo.current.value).set({
            value: valueTodo.current.value,
            UserId:JSON.parse(localStorage.getItem("pseudo")),
            isTrue: true
        }).then( data =>{

        }).catch(err => {
            console.log("err => ", err);
        })

        window.location.reload();

    }

    const deleteValue = (e,id) => {
        console.log("id => ", id);
        db.collection("Todo").doc(id).delete().then( data => {
            alert("The task is complited");
            window.location.reload();
        })

    }

    const highligth = (e,index) => {
        e.preventDefault();
        // let valueIsHighLigth = document.querySelector(".TodoListValue").children[0].classList;
        
        console.log("index => ",index)
        console.log("data-id => ",valueItem.current)
        console.log("data-id => ",valueTodoList.current.innerHTML)
        console.log(document.querySelector(".TodoListValue").dataset.id)
       
    }

    const fetchTodoList = () => {
        db.collection("Todo").where("UserId","==",JSON.parse(localStorage.getItem("pseudo"))).get().then( querySnapshot => {
        querySnapshot.forEach(element => {
            // console.log("element => ", element.data());
            data.push(element.data().value);
            
        });
        setTodoList(data);
        }).catch( err => {
            console.log("err => ",err);
        })
    }

    useEffect(()=>{
        fetchTodoList();
    },[])

    return (
        <>
         <Header/>
         <div className="containerTodo">
             <h2 className="title">Todo-List</h2>
            <div className="blockInput">
                <input  className="valueTodo" type="text"  name="valueTodo" ref={valueTodo} />
                <button onClick={(e) => sendValue(e)}>Send</button>
            </div>
            <div className="blockTodoList">
                {listTodo.map((item,index)=> (
                    <div className="TodoListValue" key={index} ref={valueItem} data-id={index}>
                        <p className="" ref={valueTodoList}>{item}</p>
                        <div className="btnMenu">
                            <span  onClick={ (e) => highligth(e,index) }><i className="fas fa-check valid"></i></span>
                            <span onClick={ (e) => deleteValue(e,item) }><i className="fas fa-times delete"></i></span>
                        </div>
                    </div>
                ))}
                
            </div>
         </div>

        </>
    )
} 