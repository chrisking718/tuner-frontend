import axios from "axios"
import { useEffect, useState } from "react"
import {Link, useParams, useNavigate } from "react-router-dom"


const API = process.env.REACT_APP_API_URL;


export default function SongEditForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [song, setSong] = useState({
    name: '',
    artist: '',
    album: '',
    time:'',
    is_favorite: false
  });

  const updateSong = (updatedSong) => {
    axios
      .put(`${API}/songs/${id}`, updatedSong)
      .then(
        () => {
          navigate(`/songs/${id}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn('catch', c));
  };

  const handleTextChange = (event) => {
    setSong({ ...song, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSong({ ...song, is_favorite: !song.is_favorite });
  };

  useEffect(() => {
    axios.get(`${API}/songs/${id}`)
    .then(
      (response) => setSong(response.data),
      (error) => navigate(`/not-found`)
    );
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSong(song, id);
  };
  return (
    <div className="Edit">
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        value={song.name}
        type="text"
        onChange={handleTextChange}
        placeholder="Name of Song"
        required
      />
      <label htmlFor="artist">Artist:</label>
      <input
        id="artist"
        type="text"
        name="artist"
        value={song.artist}
        onChange={handleTextChange}
      />
      <label htmlFor="album">Abum:</label>
      <input
        id="album"
        type="text"
        value={song.album}
        placeholder="Album Song is on"
        onChange={handleTextChange}
        required
      />
      <label htmlFor="time">Time:</label>
      <input
        id="time"
        type="text"
        value={song.time}
        placeholder="Length of song"
        onChange={handleTextChange}
      
      />
      <label htmlFor="is_favorite">Favorite:</label>
      <input
        id="is_favorite"
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={song.is_favorite}
      />

      <br />

      <input type="submit" />
    </form>
    <Link to={`/songs/${id}`}>
      <button>Nevermind!</button>
    </Link>
  </div>
  )
}