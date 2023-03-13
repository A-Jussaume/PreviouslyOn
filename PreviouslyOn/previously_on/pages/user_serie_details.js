import { useState, useEffect } from "react";
import { useAlert } from "react-alert";

function user_serie_details({ cookies }) {
  const [userSerieDetails, setUserSerieDetails] = useState();
  const alert = useAlert();

  useEffect(() => {
    fetch("https://localhost:8000/serie_details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serie_id: cookies.idSerie,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setUserSerieDetails([response.show]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(userSerieDetails);

  if (!userSerieDetails) {
    return <div>Chargement...</div>;
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
          {userSerieDetails.map((serie, i) => (
            <div key={i}>
              <div className="container">
                <div className="content-details">
                  <img
                    className="poster"
                    src={serie.images.poster}
                    alt=""
                    style={{ float: "left" }}
                  />
                  <h1 style={{ color: "#fa8231", paddingTop: "5px" }}>
                    {serie.title}
                  </h1>
                  <div>
                    <div>
                      <strong>Genre : </strong>
                      <span style={{ color: "#fa8231" }}>
                        {Object.values(serie.genres).join(", ")}
                      </span>
                    </div>
                    <div>
                      <strong>Année de production : </strong>
                      <span style={{ color: "#fa8231" }}>{serie.creation}</span>
                    </div>
                    <div>
                      <strong>Pays : </strong>
                      <span style={{ color: "#fa8231" }}>{serie.country}</span>
                    </div>
                    <div>
                      <strong>Saisons : </strong>
                      <span style={{ color: "#fa8231" }}>{serie.seasons}</span>
                    </div>
                    <div>
                      <strong>Episodes : </strong>
                      <span style={{ color: "#fa8231" }}>{serie.episodes}</span>
                    </div>
                    <div>
                      <strong>durée : </strong>
                      <span style={{ color: "#fa8231" }}>{serie.length} min</span>
                    </div>
                    <div>
                      <strong>Note : </strong>
                      <span style={{ color: "#fa8231" }}>
                        {serie.notes.mean.toString().substring(0, 3)}
                      </span>
                    </div>
                    <br></br>
                    <div>
                      <span
                        id="button-archiver"
                        style={{ color: "" }}
                        onClick={() => {
                          fetch(
                            "https://localhost:8000/archiver_serie",
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
                          alert.success(
                            "''" + serie.title + "''" + " a été archivée"
                          );
                        }}
                      >
                        <strong>ARCHIVER</strong>
                      </span>
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                      <p
                        style={{
                          paddingLeft: "265px",
                          paddingRight: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <strong style={{ fontStyle: "italic" }}>
                          Synopsis :{" "}
                        </strong>
                        {serie.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default user_serie_details;
