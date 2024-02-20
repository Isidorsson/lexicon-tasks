import './index.css';

import { Nav } from './components/Nav';
// import SongData from './data/SongData.json';
import { SongIcon } from './components/SongIcon';
import { SongInfo } from './components/SongInfo';
import { SongList } from './components/SongList';
import { SongVolume } from './components/SongVolume';

export function App() {
  return (
    <div className="main-wrapper">
      {/* <h1>Music Player</h1> */}
      {SongIcon()}
      {SongInfo()}
      {Nav()}
      {SongVolume()}
      {SongList()}
    </div>
  );
}
