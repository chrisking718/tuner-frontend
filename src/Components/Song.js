import { Link } from "react-router-dom"

export default function Song({ song }) {
  return (
    <tr>
    <td>
      {song.is_favorite ? (
        <span>⭐️</span>
      ) : (
        <span>&nbsp; &nbsp; &nbsp;</span>
      )}
    </td>
    <td>
      {song.name}
    </td>
    <td>
      {song.artist}
    </td>
    <td>
      <Link to={`/songs/${song.id}`}>{song.time}</Link>
    </td>
  </tr>

    // name, artist, album, time, is_favorite
  )
}
