import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire , db } from "../../fire";
import Header from "../Header/Header";

function Note() {

    return (
      <>
      <Header/>
        <div>
          <h2 className="title"> Note a prendre </h2>
          
        </div>
      </>
    );
  }
  
  export default Note;