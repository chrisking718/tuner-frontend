import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function SongDetails() {
  const { id } = useParams();
  const [song, setSong] = useState([]);
  const navigate = useNavigate();

  const deleteSong = () => {
    axios
      .delete(`${API}/songs/${id}`)
      .then(
        () => {
          navigate(`/songs`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleDelete = () => {
    deleteSong();
  };

  useEffect(() => {
    axios
      .get(`${API}/songs/${id}`)
      .then((response) => {
        setSong(response.data);
      })
      .catch((c) => {
        console.warn("catch", c);
      });
  }, [id]);

  return (
    <article>
      {song.is_favorite ? <span>⭐️</span> : null} {song.name}
      <h5>
        <span>
          {song.name}
        </span>
       
      </h5>
      <h6>{song.artist}</h6>
      <p>{song.album}</p>
      <p>{song.time}</p>
      <div className="showNavigation">
        <>
          <Link to={`/songs`}>
            <button>Back</button>
          </Link>
        </>
        <>
          <Link to={`/songs/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </>
        <>
          <button onClick={handleDelete}>Delete</button>
        </>
      </div>
    </article>
  );
}
