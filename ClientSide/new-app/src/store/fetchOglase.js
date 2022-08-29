import { oglasiActions } from "./oglasi";

export const fetchOglasiData = () => {
  return async (dispatch) => {
    const fetchOglasi = async () => {
      const response = await fetch("https://localhost:44301/api/Oglasi");

      if (!response.ok) {
        throw new Error("Greska pri ucitavanju oglasa!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const oglasiData = await fetchOglasi();
      dispatch(oglasiActions.ucitajOglase(oglasiData));
    } catch (error) {
      alert("Doslo je do greske!");
    }
  };
};

export const fetchObrisiOglas = (oglasId, token) => {
  return async (dispatch) => {
    const obrisiOglas = async () => {
      let response;
      response = await fetch(`https://localhost:44301/api/Oglasi/${oglasId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status !== 204) {
        throw new Error("Greska pri brisanju oglasa!");
      }
    };

    try {
      await obrisiOglas();
      dispatch(oglasiActions.obrisiOglas(oglasId));
      dispatch(fetchOglasiData());
    } catch (error) {
      alert("Doslo je do greske pri brisanju oglasa!");
    }
  };
};

export const fetchPretraga = (minimum, maximum, token) => {
  return async (dispatch) => {
    const pretraziOglase = async () => {
      const params = {
        min: minimum,
        max: maximum
      }

      console.log("PARAMETRI ZXA FETCH PRETRAGU");
      console.log(token);
      console.log(params);

      const response = await fetch(`https://localhost:44301/api/pretraga`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        }, 
        body:JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error("Greska pri brisanju oglasa!");
      }

      const data = response.json();
      return data;
    };
    
    try {
      const oglasi = await pretraziOglase();
      dispatch(oglasiActions.ucitajOglase(oglasi));
    } catch (error) {
      alert("Doslo je do greske pri pretrazi oglasa!");
    }
  };
};

export const fetchDodaj = (oglas, token, agencijaNaziv) => {
  return async (dispatch) => {
    const dodajOglas = async () => {
      const params = {
        naslov: oglas.Naslov,
        tipNekretnine: oglas.TipNekretnine,
        godinaIzgradnje: oglas.GodinaIzgradnje,
        cena: oglas.Cena,
        agencijaId: oglas.AgencijaId
      }

      console.log(params);

      const response = await fetch(`https://localhost:44301/api/Oglasi`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        }, 
        body:JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error("Greska pri dodavanju oglasa!");
      }

      const data = response.json();
      return data;
    };
    
    try {
      const oglas = await dodajOglas();
      oglas.agencijaNaziv = agencijaNaziv;
      dispatch(oglasiActions.dodajOglas(oglas));
    } catch (error) {
      alert("Doslo je do greske pri dodavanju oglasa!");
    }
  };
};

