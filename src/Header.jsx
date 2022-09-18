import { removeLocalStorage } from "./utils/localStorage";

export const Header = ({
  parametered,
  computed,
  showScores,
  setShowScores,
}) => {
  const goParameters = () => {
    removeLocalStorage("round");
    window.location.reload();
  };

  const goNewGame = () => {// confirm toaster
    removeLocalStorage("rounds");
    removeLocalStorage("round");
    removeLocalStorage("team");
    window.location.reload();
  };

  const goScoreBoard = () => {
    setShowScores(true);
  };

  return (
    <nav>
      <ul>
        {parametered ? (
          <li onClick={goParameters} className="navIcons">
            Paramètres
          </li>
        ) : (
          ""
        )}
        <li onClick={goNewGame} className="navIcons">
          Nouvelle partie
        </li>
        {showScores || computed ? (
          ""
        ) : (
          <li onClick={goScoreBoard} className="navIcons">
            Scores
          </li>
        )}
      </ul>
    </nav>
  );
};
