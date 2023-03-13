import { useState, useEffect } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";

function mes_series({ cookies, setIdSerie, setCookie }) {
  const alert = useAlert();
  const [currentUserSeries, setUserSeries] = useState();
  const [archivedUserSeries, setArchivedUserSeries] = useState();
  const router = useRouter();

  useEffect(
    () => {
      fetch("https://localhost:8000/current_user_series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: cookies.user,
        }),
      })
        .then((res) => res.json())
        .then((response) => setUserSeries(response.shows));
      fetch("https://localhost:8000/archived_user_series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: cookies.user,
        }),
      })
        .then((res) => res.json())
        .then((response) => setArchivedUserSeries(response.shows));
    },
    [currentUserSeries],
    [archivedUserSeries]
  );

  let clickHoldTimer = null;
  if (!currentUserSeries) {
    return (
      <div style={{ marginTop: "100px", marginLeft: "15px", color: "#adadad" }}>
        Chargement...
      </div>
    );
  } else {
    if (archivedUserSeries) {
      return (
        <div
          style={{
            marginTop: "100px",
            color: "black",
            width: "85%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h1
            style={{
              color: "#adadad",
              paddingLeft: "15px",
              backgroundImage: "linear-gradient(to right, #1d1d1d , #272727)",
            }}
          >
            Mes séries
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {currentUserSeries.map((serie) => (
              <div key={serie.id} className="card">
                <img
                  src={serie.images.poster}
                  alt=""
                  onMouseDown={() => {
                    clickHoldTimer = setTimeout(() => {
                      setCookie("idSerie", serie.id, { path: "/" });
                      const { pathname } = Router;
                      if (pathname == "/my_series") {
                        Router.push("/user_serie_details/?id=" + serie.id);
                      }
                    }, 1000);
                  }}
                  onMouseUp={() => {
                    clearTimeout(clickHoldTimer);
                    setCookie("idSerie", serie.id, { path: "/" });
                    const { pathname } = Router;
                    if (pathname == "/my_series") {
                      Router.push(
                        "/user_serie_episodes_not_seen/?id=" + serie.id
                      );
                    }
                  }}
                />
                <FontAwesomeIcon
                  id="plus-icon"
                  style={{
                    color: "#fa8231",
                    marginLeft: "-25px",
                    marginTop: "15px",
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                  }}
                  icon={faTrashAlt}
                  onClick={() => {
                    fetch(
                      "https://localhost:8000/delete_serie",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          idSerie: serie.id,
                          userToken: cookies.token,
                        }),
                      },
                      []
                    );
                    alert.error(
                      "''" +
                        serie.title +
                        "''" +
                        " a été supprimée de vos séries"
                    );
                  }}
                ></FontAwesomeIcon>
                <div className="content">
                  <h3
                    style={{
                      textShadow:
                        "1px 1px 2px black, 0 0 1em grey, 0 0 0.2em grey",
                    }}
                  >
                    {serie.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <h1
            style={{
              color: "#adadad",
              paddingLeft: "15px",
              backgroundImage: "linear-gradient(to right, #1d1d1d , #272727)",
            }}
          >
            Séries archivées
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {archivedUserSeries.map((serie) => (
              <div key={serie.id} className="card">
                <img
                  src={serie.images.poster}
                  alt=""
                  onMouseDown={() => {
                    clickHoldTimer = setTimeout(() => {
                      setIdSerie(serie.id);
                      const { pathname } = Router;
                      if (pathname == "/my_series") {
                        Router.push("/serie_details/?id=" + serie.id);
                      }
                    }, 1000);
                  }}
                  onMouseUp={() => {
                    clearTimeout(clickHoldTimer);
                  }}
                />
                <FontAwesomeIcon
                  id="plus-icon"
                  style={{
                    color: "#fa8231",
                    marginLeft: "-25px",
                    marginTop: "15px",
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                  }}
                  icon={faTrashAlt}
                  onClick={() => {
                    fetch(
                      "https://localhost:8000/delete_serie",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          idSerie: serie.id,
                          userToken: cookies.token,
                        }),
                      },
                      []
                    );
                    alert.error(
                      "''" +
                        serie.title +
                        "''" +
                        " a été supprimée de vos séries"
                    );
                  }}
                ></FontAwesomeIcon>
                <div className="content">
                  <h3>{serie.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            marginTop: "100px",
            color: "black",
            width: "85%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h1
            style={{
              color: "#adadad",
              paddingLeft: "15px",
              backgroundImage: "linear-gradient(to right, #1d1d1d , #272727)",
            }}
          >
            Mes séries
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {currentUserSeries.map((serie) => (
              <div key={serie.id} className="card">
                <img
                  src={serie.images.poster}
                  alt=""
                  onMouseDown={() => {
                    clickHoldTimer = setTimeout(() => {
                      setIdSerie(serie.id);
                      const { pathname } = Router;
                      if (pathname == "/my_series") {
                        Router.push("/user_serie_details/?id=" + serie.id);
                      }
                    }, 1000);
                  }}
                  onMouseUp={() => {
                    clearTimeout(clickHoldTimer);
                    setCookie("idSerie", serie.id, { path: "/" });
                    const { pathname } = Router;
                    if (pathname == "/my_series") {
                      Router.push(
                        "/user_serie_episodes_not_seen/?id=" + serie.id
                      );
                    }
                  }}
                />
                <FontAwesomeIcon
                  id="plus-icon"
                  style={{
                    color: "#fa8231",
                    marginLeft: "-25px",
                    marginTop: "15px",
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                  }}
                  icon={faTrashAlt}
                  onClick={() => {
                    fetch(
                      "https://localhost:8000/delete_serie",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          idSerie: serie.id,
                          userToken: cookies.token,
                        }),
                      },
                      []
                    );
                    alert.error(
                      "''" +
                        serie.title +
                        "''" +
                        " a été supprimée de vos séries"
                    );
                  }}
                ></FontAwesomeIcon>
                <div className="content">
                  <h3>{serie.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default mes_series;
