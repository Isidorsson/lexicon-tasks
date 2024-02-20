import './SongList.css';

import SongData from '../data/SongData.json';

export function SongList() {
  return (
    <aside className="song-list-wrapper">
      <ul className="song-list">
        {SongData.songs.map((song) => (
          <li>{song.title}</li>
        ))}
      </ul>
    </aside >
  );
}