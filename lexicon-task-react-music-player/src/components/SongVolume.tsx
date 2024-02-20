import './SongVolume.css';

export function SongVolume() {


  function adjustVolume(arg0: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <section className="volume-wrapper">
      <i className="fas fa-volume-off" style={{ textAlign: 'right' }} onClick={() => adjustVolume(0)}></i>
      <div className="volume-bar">
        <input type="range" name="volume-slider" id="volume-slider" min="0" max="1" step="0.1" value="0.5"
          onChange={(event) => adjustVolume(Number(event.target.value))} />
        <div className="volume-trail"></div>
      </div>
      <i className="fas fa-volume-up" onClick={() => adjustVolume(1)}></i>
    </section>
  );
}