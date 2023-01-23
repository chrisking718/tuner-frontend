import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const API = process.env.REACT_APP_API_URL;

export default function SongNewForm() {

  let navigate = useNavigate();


  const [song, setSong] = useState({
    name: '',
    artist: '',
    album: '',
    time:'',
    is_favorite: false
  });

  const addSong = (newSong) => {
    axios
      .post(`${API}/songs`, newSong)
      .then(
        () => {
          navigate(`/songs`);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    addSong(song);
  };
  return (
    <div className="New">
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
  </div>
  )
}
