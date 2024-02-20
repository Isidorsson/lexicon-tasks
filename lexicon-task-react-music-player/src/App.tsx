import './index.css';

import { Nav } from './components/Nav';
import SongData from './data/SongData.json';
import { SongIcon } from './components/SongIcon';
import { SongInfo } from './components/SongInfo';
import { SongList } from './components/SongList';
import { SongVolume } from './components/SongVolume';
import { useState } from 'react';

export function App() {

  const [songs, setSongs] = useState(SongData.songs);

  const removeSong = (index: number) => {
    setSongs(songs => songs.filter((_song, i) => i !== index));
    // Not implemented yet - will be used to remove a song from the list
  };

  return (
    <div className="main-wrapper">
      {/* <h1>Music Player</h1> */}
      {SongIcon()}
      {SongInfo()}
      {Nav()}
      {SongVolume()}
      <SongList SongData={{ songs }} removeSong={removeSong} />
    </div>
  );
}
