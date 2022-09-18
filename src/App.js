import { Landing } from "./Landing";
import { Header } from "./Header";
import { Main } from "./Main";
import { Scores } from "./Scores";

import { useEffect, useState } from "react";
import { getLocalStorage } from "./utils/localStorage";

export const App = () => {
  const [team, setTeam] = useState(getLocalStorage("team"));
  const [rounds, setRounds] = useState([]);
  const [showScores, setShowScores] = useState(false);
  const [computed, setComputed] = useState(false);
  const [parametered, setParametered] = useState(false);

  useEffect(() => {
    console.log("render <App />");
  }, [team]);

  if (team === null)
    return (
      <>
        <Landing setTeam={setTeam} />
      </>
    );

  if (showScores || computed)
    return (
      <>
        <Header
          parametered={parametered}
          computed={computed}
          showScores={showScores}
          setShowScores={setShowScores}
        />
        <Scores
          rounds={rounds}
          setComputed={setComputed}
          setShowScores={setShowScores}
        />
      </>
    );

  return (
    <>
      <Header
        parametered={parametered}
        computed={computed}
        showScores={showScores}
        setShowScores={setShowScores}
      />
      <Main
        rounds={rounds}
        setRounds={setRounds}
        setShowScores={setShowScores}
        setComputed={setComputed}
        setParametered={setParametered}
      />
    </>
  );
};
