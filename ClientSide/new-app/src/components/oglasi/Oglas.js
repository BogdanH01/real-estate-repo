import React from "react";
//import { useSelector } from 'react-redux';

import classes from "./Oglas.module.css";

const Oglas = (props) => {

  return (
    <div className={classes.oglas}>
      <p>{props.naslov}</p>
      <p>{props.cena}</p>
      <p>{props.agencijaNaziv}</p>
    </div>
  );
};

export default Oglas;
