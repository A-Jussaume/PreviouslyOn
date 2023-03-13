import { useState, useEffect } from "react";
import Router from "next/router";
import { useAlert } from "react-alert";

function login({ user, setUser, setCookie }) {
  const alert = useAlert();
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });
  const [checkUserLog, setCheckUserLog] = useState();

  const HandleSubmit = (e) => {
    e.preventDefault();
    fetch("https://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response == 400) {
          return alert.error("ERREUR : Identifiant ou mot de passe incorrect");
        } else {
          setUser(response);
          setCheckUserLog(true);
        }
      });
  };

  useEffect(() => {
    if (checkUserLog == true) {
      setCookie("user", user.user.id, { path: "/" });
      setCookie("token", user.token, { path: "/" });
      const { pathname } = Router;
      if (pathname == "/login") {
        Router.push("/home");
      }
    }
  }, [checkUserLog]);

  return (
    <div className="form-container">
      <form id="form-login">
        <h1 style={{ color: "#fa8231" }}>Connectez-vous</h1>
        <label htmlFor="user">Pseudo :</label>
        <div>
          <input
            type="text"
            name="user"
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
            value={formData.user}
          ></input>
        </div>
        <br></br>
        <label htmlFor="password">Mot de passe :</label>
        <div>
          <input
            type="password"
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
          ></input>
        </div>
        <br></br>
        <div>
          <button id="button-login" type="submit" onClick={HandleSubmit}>
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
}
export default login;
