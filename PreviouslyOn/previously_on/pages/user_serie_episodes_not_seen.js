import React from "react";
import { useState, useEffect } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";

function user_serie_episodes_not_seen({ cookies, setCookie }) {
  const alert = useAlert();
  const [episodesNotSeen, setEpisodesNotSeen] = useState([]);
  const [pictureSerie, setPictureSerie] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "episode",
    idEpisode: "",
    text: "",
    userToken: cookies.token,
  });
  console.log(formData);

  useEffect(() => {
    fetch("https://localhost:8000/user_serie_episodes_not_seen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSerie: cookies.idSerie,
        userToken: cookies.token,
      }),
    })
      .then((res) => res.json())
      .then((response) => setEpisodesNotSeen(response.shows))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    fetch("https://localhost:8000/serie_picture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSerie: cookies.idSerie,
      }),
    })
      .then((res) => res.json())
      .then((response) => setPictureSerie([response]))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [episodesNotSeen]);

  let clickHoldTimer = null;
  if (loading) {
    return (
      <div
        style={{
          marginTop: "100px",
          marginLeft: "15px",
          color: "#adadad",
        }}
      >
        Chargement...
      </div>
    );
  } else {
    return (
      <div>
        <div
          style={{
            marginTop: "100px",
            color: "black",
            width: "85%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {episodesNotSeen.map((serie, i) => (
            <div key={i}>
              <div className="container-episode-unseen">
                <div>
                  {pictureSerie.map((picture, i) => (
                    <img
                      key={i}
                      className="banner"
                      src={picture.show.images.show}
                      alt=""
                    />
                  ))}
                </div>
                <div className="content-episode-unseen">
                  <h1
                    style={{
                      textShadow:
                        "1px 1px 2px black, 0 0 1em grey, 0 0 0.2em grey",
                    }}
                  >
                    {serie.title}
                  </h1>
                </div>
                <div style={{ paddingLeft: "10px", paddingBottom: "1px" }}>
                  <h2 style={{ textDecoration: "underline", color: "#adadad" }}>
                    Liste des épisodes non-visionnés :
                  </h2>
                  <br></br>
                  {serie.unseen.map((episode, i) => (
                    <div
                      id="title-episode"
                      key={i}
                      onMouseDown={() => {
                        clickHoldTimer = setTimeout(() => {
                          setCookie("idSerie", episode.id, { path: "/" });
                          const { pathname } = Router;
                          if (pathname == "/user_serie_episodes_not_seen") {
                            Router.push("/episode_details/?id=" + episode.id);
                          }
                        }, 2000);
                      }}
                      onMouseUp={() => {
                        clearTimeout(clickHoldTimer);
                      }}
                    >
                      <p
                        id="episode"
                        style={{ color: "#adadad" }}
                        onClick={() => {
                          let element = document.getElementById(episode.id);
                          element.classList.toggle("active");
                        }}
                      >
                        Saison {episode.season} - Episode {episode.episode} :{" "}
                        <span style={{ color: "#fa8231" }}>
                          {episode.title}
                        </span>
                      </p>
                      <div className="hidden-menu" id={episode.id}>
                        <div>
                          <button
                            style={{
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                            className="button-menu"
                            onClick={() => {
                              fetch(
                                "https://localhost:8000/add_episode_watched",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    idEpisode: episode.id,
                                    userToken: cookies.token,
                                  }),
                                }
                              )
                                .then((res) => res.json())
                                .then((response) => {
                                  if (response == 400) {
                                    console.log("Erreur : 400");
                                  } else {
                                    alert.success(
                                      "Episode ajouté à votre liste des épisodes visionnés"
                                    );
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                                .finally(() => {
                                  setLoading(false);
                                });
                              let element = document.getElementById(episode.id);
                              element.classList.toggle("active");
                            }}
                          >
                            Vu
                          </button>
                          <br></br>
                          <br></br>
                          <button
                            className="button-menu"
                            onClick={() => {
                              fetch(
                                "https://localhost:8000/add_multiple_episode_watched",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    idEpisode: episode.id,
                                    userToken: cookies.token,
                                  }),
                                }
                              )
                                .then((res) => res.json())
                                .then((response) => {
                                  if (response == 400) {
                                    console.log("Erreur : 400");
                                  } else {
                                    alert.success(
                                      "Episode ajouté à votre liste des épisodes visionnés ainsi que tout les précédents"
                                    );
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                                .finally(() => {
                                  setLoading(false);
                                });
                              let element = document.getElementById(episode.id);
                              element.classList.toggle("active");
                            }}
                          >
                            Vu + tout les précédents
                          </button>
                          <br></br>
                          <br></br>
                          <form id="form-comment">
                            <textarea
                              rows="5"
                              cols="33"
                              name="comment"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  text: e.target.value,
                                  idEpisode: episode.id,
                                })
                              }
                              value={formData.text}
                            ></textarea>
                            <br></br>
                            <br></br>
                            <span
                              style={{
                                borderBottomLeftRadius: "10px",
                                borderBottomRightRadius: "10px",
                              }}
                              className="button-menu"
                              onClick={() => {
                                fetch(
                                  "https://localhost:8000/comment_episode",
                                  {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(formData),
                                  }
                                )
                                  .then((res) => res.json())
                                  .then((response) => {
                                    if (response == 400) {
                                      console.log("Erreur : 400");
                                    } else {
                                      alert.success(
                                        "Votre commentaire a bien été ajouté"
                                      );
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  })
                                  .finally(() => {
                                    setLoading(false);
                                  });
                                let element = document.getElementById(
                                  episode.id
                                );
                                element.classList.toggle("active");
                              }}
                            >
                              Commenter
                            </span>
                          </form>
                          <br></br>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default user_serie_episodes_not_seen;
