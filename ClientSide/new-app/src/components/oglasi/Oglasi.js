import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchObrisiOglas, fetchOglasiData } from "../../store/fetchOglase";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Oglasi.module.css";

const Oglasi = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const token = useSelector((state) => state.login.token);

  const [isLoading, setIsLoading] = useState(false);
  const oglasi = useSelector((state) => state.oglasi.oglasi);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOglasiData());
    setIsLoading(false);
  }, [dispatch]);

  const deleteHandler = (event) => {
    dispatch(fetchObrisiOglas(event.target.id, token));
  };

  return (
    <div className={classes.oglasi}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && oglasi.length === 0 && <div className={classes.errorMessage}><p>Ne postoji nijedan oglas</p></div>}
      {!isLoading && oglasi.length !== 0 && (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Naslov</th>
              <th>Cena</th>
              <th>Tip</th>
              <th>Agencija</th>
              {isLoggedIn && <th>Godina Izgradnje</th>}
              {isLoggedIn && <th>Akcija</th>}
            </tr>
          </thead>
          <tbody>
            {oglasi.map((oglas) => (
              <tr key={oglas.id}>
                <td>{oglas.naslov}</td>
                <td>{oglas.cena}</td>
                <td>{oglas.tipNekretnine}</td>
                <td>{oglas.agencijaNaziv}</td>
                {isLoggedIn && <td>{oglas.godinaIzgradnje}</td>}
                {isLoggedIn && (
                  <td>
                    <button id={oglas.id} onClick={deleteHandler}>
                      Obrisi
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Oglasi;
