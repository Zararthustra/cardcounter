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

  useEffect(() => {
    console.log("render <App />");
  }, [team]);

  if (team === null)
    return (
      <>
        <Header />
        <Landing setTeam={setTeam} />
      </>
    );

  if (showScores || computed)
    return (
      <>
        <Header />
        <Scores rounds={rounds} setComputed={setComputed} setShowScores={setShowScores} />
      </>
    );

  return (
    <>
      <Header />
      <Main
        rounds={rounds}
        setRounds={setRounds}
        setShowScores={setShowScores}
        setComputed={setComputed}
      />
    </>
  );
};
