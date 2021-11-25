import  React , { createRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire , db } from "../../fire";
import Header from "../Header/Header";

export default Todo;

function Todo(){
    const [listTodo,setTodoList] = useState([]);
    const data = [];
    // const isTrue = true;
    // const valueItem = createRef();
    const valueTodoList = createRef();
    const valueTodo = createRef();
    const valueTodoUpdate = createRef();

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
        alert("the taks is complited")
        setTimeout(()=>{
            window.location.reload();
        },1000)

    }

    const deleteValue = (e,id) => {
        console.log("id => ", id);
        db.collection("Todo").doc(id).delete().then( data => {
            alert("The task is complited");
            window.location.reload();
        })

    }

    const highligth = (e,index ,item) => {
        // e.preventDefault();
        let valueIsHighLigth = document.querySelector("#TodoListValue"+index).children[0].classList;
        listTodo.map(element =>{
            if(element === item){
                console.log("valueIsHighLigth => ",valueIsHighLigth)
                if(valueIsHighLigth.contains("line")){
                    valueIsHighLigth.remove("line");
                }else{
                    valueIsHighLigth.add("line");
                }
            }
        })

        // console.log("index => ",index)
        // console.log("item => ",item)
       
    }

    const updateTodo = (e,index,item) => {

        console.log("index => ", index);
        console.log("item => ", item);

        valueTodoUpdate.current.value = item

        
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
                    <div className="listValue" key={index} id={"TodoListValue"+ index}>
                        <p className="">{item}</p>
                        <div className="btnMenu">
                            <span  onClick={ (e) => highligth(e,index,item) }><i className="fas fa-check valid"></i></span>
                            <span  onClick={ (e) => updateTodo(e,index,item) }><i className="fas fa-check valid">edit</i></span>
                            <span onClick={ (e) => deleteValue(e,item) }><i className="fas fa-times delete"></i></span>
                        </div>
                    </div>
                ))}
                
            </div>
         </div>
         <div className="blockInput">
            <input  className="valueTodo" type="text"  name="valueTodo" ref={valueTodoUpdate} />
            <button onClick={(e) => sendValue(e)}>Send</button>
        </div>        
        </>
    )
} 