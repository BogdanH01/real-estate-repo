import { usersActions } from "../store/users";
import { oglasiActions } from "../store/oglasi";
import { useDispatch } from "react-redux";

//Implementirati umesto fetchova

function useHttp(fetchData) {
  const dispatch = useDispatch();
  const sendData = async () => {
    const headers = "headers: {'Content-Type': 'application/json'}";
    const body = JSON.stringify(fetchData.data);
    const fetchMethod = `method: ${fetchData.method}`;
    let url;

    const response = await fetch(
      `${url} ${fetchData.data !== "" && fetchMethod + ", " + headers + " body:" + body}`
    );

    if(!response.ok){
      throw new Error("Neuspesan upit.")
    }
    const responseData = response.json();

    if (fetchData.type === "users") {
      dispatch(usersActions.storeUsers(responseData));
    }

    if (fetchData.type === "oglasi") {
      dispatch(oglasiActions.storeOglasi(responseData));
    }
  };

  try {
    sendData();
  } catch (error) {
    alert(error);
  }
}

export default useHttp;
