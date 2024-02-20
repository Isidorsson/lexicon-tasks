import './Nav.css';

export function Nav() {
  return (
    <nav className="player-wrapper">
      <i className="fas fa-circle-notch repeat-btn" id="repeatBtn"></i>
      <i className="fas fa-caret-left player-move-btn" id="prevBtn"></i>
      <i className="fas fa-play-circle player-state-btn" id="playBtn"></i>
      <i className="fas fa-caret-right player-move-btn" id="nextBtn"></i>
      <i className="fas fa-random shuffle-btn" id="shuffleBtn"></i>
    </nav>
  );
}