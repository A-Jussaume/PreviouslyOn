import { useState, useEffect } from "react";
import { useAlert } from "react-alert";

function Episode_details({ cookies }) {
  const [episodeDetails, setEpisodeDetails] = useState([]);
  const [pictureEpisode, setPictureEpisode] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://localhost:8000/episode_details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSerie: cookies.idSerie,
      }),
    })
      .then((res) => res.json())
      .then((response) => setEpisodeDetails([response.episode]))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(episodeDetails);
  console.log(pictureEpisode);
  console.log(cookies.idSerie);

  if (loading) {
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
          {episodeDetails.map((episode, i) => (
            <div>
              <div key={i} className="container-episode-details">
                <div className="content-episode-details">
                  <img
                    className="poster"
                    src={"https://api.betaseries.com/pictures/episodes?key=463b0f620c82&id=" + episode.id}
                    alt=""
                    style={{ float: "left" }}
                  />
                  <h1 style={{ color: "#fa8231", paddingTop: "5px" }}>
                    {episode.title}
                  </h1>
                  <div>
                    <div>
                      <strong>Date de diffusion : </strong>
                      <span style={{ color: "#fa8231" }}>{episode.date}</span>
                    </div>
                    <div>
                      <strong>Note : </strong>
                      <span style={{ color: "#fa8231" }}>
                        {episode.note.mean.toString().substring(0, 3)}
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
                        {episode.description}
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

export default Episode_details;
