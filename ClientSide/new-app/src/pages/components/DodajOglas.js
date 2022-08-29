import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgencijeData } from "../../store/fetchAgencije";
import { fetchDodaj, fetchOglasiData } from "../../store/fetchOglase";

import classes from "./DodajOglas.module.css";

let agencijaId = 1;
let agencijaNaziv = "Naj Nekretnine";

const DodajOglas = () => {
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  const naslov = useRef();
  const tipNekretnine = useRef();
  const godinaIzgradnje = useRef();
  const cena = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const unetaGodinaIzgradnje = godinaIzgradnje.current.value;
    const unetaCena = cena.current.value;

    if (unetaGodinaIzgradnje < 1910 || unetaGodinaIzgradnje > 2022) {
      alert("Uneta godina izgradnje nije validna");
      return;
    }

    if (unetaCena < 20000 || unetaCena > 300000) {
      alert("Unesite cenu u rasponu od 20k do 300k");
      return;
    }

    const oglas = {
      AgencijaId: agencijaId,
      Naslov: naslov.current.value,
      TipNekretnine: tipNekretnine.current.value,
      GodinaIzgradnje: godinaIzgradnje.current.value,
      Cena: cena.current.value,
    };

    dispatch(fetchDodaj(oglas, token, agencijaNaziv));
  };

  const onChangeHandler = (event) => {
    const index = event.target.selectedIndex;
    const el = event.target[index];
    agencijaId = el.id;
    agencijaNaziv = el.innerText;
  };

  const resetHandler = () => {
    naslov.current.value = "";
    cena.current.value = "";
    tipNekretnine.current.value = "";
    godinaIzgradnje.current.value = "";
  };

  const agencije = useSelector((state) => state.agencije.agencije);

  useEffect(() => {
    dispatch(fetchAgencijeData());
    dispatch(fetchOglasiData());
  }, [dispatch]);

  return (
    <div className={classes.div}>
      <h2>Dodaj novi oglas</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="agencija">Agencija</label>
          <select id="select" onChange={onChangeHandler}>
            {agencije.map((agencija) => (
              <option id={agencija.id} key={agencija.id}>
                {agencija.naziv}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.control}>
          <label className={classes.label} htmlFor="naslov">
            Naslov:
          </label>
          <input className={classes.input} required type="text" ref={naslov} />
        </div>
        <div className={classes.control}>
          <label htmlFor="tipNekretnine">Tip nekretnine:</label>
          <input type="text" ref={tipNekretnine} required/>
        </div>
        <div className={classes.control}>
          <label htmlFor="godinaIzgradnje">Godina izgradnje:</label>
          <input
            className={classes.input}
            type="number"
            required
            ref={godinaIzgradnje}
          />
        </div>{" "}
        <div className={classes.control}>
          <label htmlFor="cena">Cena</label>
          <input type="number" ref={cena} required />
        </div>
        <div className={classes.actions}>
          <button>Dodaj</button>
        </div>
        <div className={classes.control}>
          <button
            type="button"
            className={classes.cancel}
            onClick={resetHandler}
          >
            Odustani
          </button>
        </div>
      </form>
    </div>
  );
};

export default DodajOglas;
