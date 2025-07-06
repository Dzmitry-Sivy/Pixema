import React, { JSX, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Trailer(): JSX.Element {
  const location = useLocation();
  const { video } = location.state;
  console.log(video);

  if (!video)
    return <h1 style={{ color: "red" }}>Трейлера для данного фильма нет</h1>;
  return (
    <div className="movie__card_trailer trailer">
      <iframe
        className="trailer__iframe"
        width="740"
        height="460"
        src={video}
        title="Trailer"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Trailer;
