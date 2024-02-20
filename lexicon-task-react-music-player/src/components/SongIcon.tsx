import './SongIcon.css';

export function SongIcon() {
  return (

      <figure className="song-thumb-wrapper">
        <svg className="song-progress" width="200" height="200" viewBox="0 0 200 200">
          <circle className="song-progress-meter" cx="100" cy="100" r="90" stroke="#4d3f61" strokeWidth="10" fill="none" />
          <circle className="song-progress-value" cx="100" cy="100" r="90" stroke="#ae80d6" strokeWidth="10" fill="none"
            strokeDasharray="0 600" strokeLinecap="round" />
        </svg>
        <div className="song-thumb"></div>
      </figure>
  ) 
}