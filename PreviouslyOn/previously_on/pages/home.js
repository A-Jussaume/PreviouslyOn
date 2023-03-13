import { useState, useEffect } from "react";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";

function Home({ cookies, isLogged, setCookie }) {
  const alert = useAlert();
  const [seriesKind, setSeriesKind] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [kind, setKind] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://localhost:8000/series_kind", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((response) => {
        setSeriesKind([response.genres]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    fetch("https://localhost:8000/all_series", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((response) => {
        setAllSeries(response.shows);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  let clickHoldTimer = null;

  if (loading) {
    return (
      <div style={{ marginTop: "100px", marginLeft: "30px", color: "#adadad" }}>
        Chargement...
      </div>
    );
  } else {
    if (isLogged == true) {
      return (
        <div>
          <div className="container-home-kind">
            {seriesKind.map((kind, i) => (
              <div key={i}>
                <div className="content-kind">
                  <div className="kinds" onClick={() => setKind("all_series")}>
                    Toutes les séries
                  </div>
                  {Object.values(kind).map((genre, i) => {
                    return (
                      <div
                        className="kinds"
                        key={i}
                        onClick={() => setKind(i.genre)}
                      >
                        {genre}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "50px",
              marginLeft: "215px",
              color: "black",
              position: "absolute",
              width: "85%",
            }}
          >
            <h1
              style={{
                color: "#adadad",
                paddingLeft: "15px",
                backgroundImage: "linear-gradient(to right, #1d1d1d , #272727)",
              }}
            >
              Toutes les séries
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {allSeries.map((serie) => (
                <div
                  key={serie.id}
                  className="container-card"
                  onMouseDown={() => {
                    clickHoldTimer = setTimeout(() => {
                      setCookie("idSerie", serie.id, { path: "/" });
                      const { pathname } = Router;
                      if (pathname == "/home") {
                        Router.push("/serie_details/?id=" + serie.id);
                      }
                    }, 1000);
                  }}
                  onMouseUp={() => {
                    clearTimeout(clickHoldTimer);
                  }}
                >
                  <img src={serie.images.poster} alt="" />
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
                    icon={faPlusSquare}
                    onClick={() => {
                      fetch("https://localhost:8000/add_serie", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          idSerie: serie.id,
                          userToken: cookies.token,
                        }),
                      });
                      alert.success(
                        "''" + serie.title + "''" + " est ajoutée à vos séries"
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
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="container-home-kind">
            {seriesKind.map((kind, i) => (
              <div key={i}>
                <div className="content-kind">
                  <div className="kinds" onClick={() => setKind("all_series")}>
                    Toutes les séries
                  </div>
                  {Object.values(kind).map((genre, i) => {
                    return (
                      <div
                        className="kinds"
                        key={i}
                        onClick={() => setKind(i.genre)}
                      >
                        {genre}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "50px",
              marginLeft: "215px",
              color: "black",
              position: "absolute",
              width: "85%",
            }}
          >
            <h1
              style={{
                color: "#adadad",
                paddingLeft: "15px",
                backgroundImage: "linear-gradient(to right, #1d1d1d , #272727)",
              }}
            >
              Toutes les séries
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {allSeries.map((serie) => (
                <div
                  key={serie.id}
                  className="container-card"
                  onMouseDown={() => {
                    clickHoldTimer = setTimeout(() => {
                      setCookie("idSerie", serie.id, { path: "/" });
                      const { pathname } = Router;
                      if (pathname == "/home") {
                        Router.push("/serie_details/?id=" + serie.id);
                      }
                    }, 1000);
                  }}
                  onMouseUp={() => {
                    clearTimeout(clickHoldTimer);
                  }}
                >
                  <img src={serie.images.poster} alt="" />
                  <div className="content">
                    <h3>{serie.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
