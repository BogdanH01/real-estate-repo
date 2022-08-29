import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPretraga, fetchOglasiData } from "../../store/fetchOglase";

import classes from "./Input.module.css";

const Pretraga = () => {
  const [searchedMin, setSearchedMin] = useState(false);
  const [searchedMax, setSearchedMax] = useState(false);

  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  const minimum = useRef();
  const maximum = useRef();

  const minHandler = (event) => {
    if (event.target.value !== "") {
      setSearchedMin(true);
    }

    if (event.target.value === "") {
      setSearchedMin(false);
    }
  };

  const maxHandler = (event) => {
    if (event.target.value !== "") {
      setSearchedMax(true);
    }

    if (event.target.value === "") {
      setSearchedMax(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const min = minimum.current.value;
    const max = maximum.current.value;

    if (min > max) {
      alert("Minimum je veci od maksimuma!");
      return;
    }

    dispatch(fetchPretraga(min, max, token));
  };

  const resetHandler = () => {
    minimum.current.value = "";
    maximum.current.value = "";

    dispatch(fetchOglasiData());
  };

  return (
    <div className={classes.input}>
      <h2>Pretraga po ceni</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Minimum</label>
          <input
            onChange={minHandler}
            type="number"
            id="minimum"
            ref={minimum}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="maximum">Maximum</label>
          <input
            onChange={maxHandler}
            type="number"
            id="maximum"
            ref={maximum}
          />
        </div>
        <div className={classes.actions}>
          <button>Pretrazi</button>
        </div>
        {(searchedMin || searchedMax) && (
          <div className={classes.actions}>
            <button onClick={resetHandler}>Ponisti pretragu</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Pretraga;
<h1>Pretraga</h1>;
