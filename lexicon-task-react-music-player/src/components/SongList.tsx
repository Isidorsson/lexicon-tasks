import './SongList.css';

import { useState } from 'react';

/* The `interface ISong` is defining a TypeScript interface that specifies the structure of an object
representing a song. In this case, it defines that a song object should have a property `title` of
type `string`. This interface helps to enforce type checking and ensure that any object labeled as a
song conforms to this structure, providing clarity and consistency in the codebase. */
interface ISong {
  title: string;
}

/* The `ISongListProps` interface is defining the props that the `SongList` component expects to
receive. It specifies that the `SongList` component expects a prop named `SongData`, which should be
an object with a property `songs` that is an array of objects conforming to the `ISong` interface.
This structure helps to enforce type checking and ensure that the component receives the correct
data structure as props. */
interface ISongListProps {
  SongData: { songs: ISong[] };
}

export function SongList({ SongData }: ISongListProps) {
  // const { songs } = SongData;
  // function removeSong(index: number): void {
  //   songs.splice(index, 1);
  // }

  const [hiddenSongs, setHiddenSongs] = useState<number[]>([]); 

  const hideSong = (index: number) => {
    setHiddenSongs(prevHiddenSongs => [...prevHiddenSongs, index]);
  
    setTimeout(() => {
      setHiddenSongs(prevHiddenSongs => prevHiddenSongs.filter(i => i !== index));
    }, 10000); // 10 seconds
  };

  return (
    <aside className="song-list-wrapper">
      <ul className="song-list">
        {SongData.songs.map((song, index) => (
          !hiddenSongs.includes(index) && (
            <li key={index}>
              {song.title}
              <button className='btn-remove' onClick={() => hideSong(index)}>Remove</button>
            </li>
          )
        ))}
      </ul>
    </aside >
  );
}