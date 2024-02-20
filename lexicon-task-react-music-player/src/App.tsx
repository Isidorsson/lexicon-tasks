import {Nav} from './components/Nav';
import {SongIcon} from './components/SongIcon';
import {SongInfo} from './components/SongInfo';
import {SongList} from './components/SongList';

export function App() {
  return (
    <>
      <h1>My App</h1>
      {SongIcon()}
      {SongInfo()}
      {Nav()}
      {SongList()}
    </>
  );
}
