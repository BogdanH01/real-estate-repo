import { agencijeActions } from "./agencije";

export const fetchAgencijeData = () => {
    return async (dispatch) => {
      const fetchAgencije = async () => {
        const response = await fetch("https://localhost:44301/api/Agencije");
  
        if (!response.ok) {
          throw new Error("Greska pri ucitavanju agencija!");
        }
  
        const data = await response.json();
        return data;
      };
  
      try {
        const ucitaneAgencije = await fetchAgencije();
        dispatch(agencijeActions.ucitajAgencije(ucitaneAgencije));
      } catch (error) {
        alert("Doslo je do greske!");
      }
    };
  };