import { useState, useEffect } from "react";
import { useAlert } from "react-alert";

function Serie_details({ cookies }) {
  const [serieDetails, setSerieDetails] = useState();

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
      .then((response) => setSerieDetails([response.show]));
  }, []);

  if (!serieDetails) {
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
          {serieDetails.map((serie, i) => (
            <div>
              <div key={serie.id} className="container">
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

export default Serie_details;
