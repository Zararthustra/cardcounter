import { useEffect, useState } from "react";
import { Parameters } from "./Parameters";
import { Counter } from "./Counter";

export const Main = ({
  rounds,
  setRounds,
  setShowScores,
  setComputed,
  setParametered,
}) => {
  //_________________________________________________________________________________________________ Vars

  // const [loading, setLoading] = useState(false);
  const [round, setRound] = useState({});

  //_________________________________________________________________________________________________ UseEffect

  // On load
  useEffect(() => {
    let mounted = true;
    if (mounted) console.log("render <Main />");
    return () => (mounted = false);
  }, []);

  //_________________________________________________________________________________________________ Functions

  //_________________________________________________________________________________________________ Render

  if (Object.keys(round).length > 0)
    return (
      <main className="mainPage">
        <Counter
          round={round}
          rounds={rounds}
          setRounds={setRounds}
          setComputed={setComputed}
          setParametered={setParametered}
        />
      </main>
    );

  return (
    <main className="mainPage">
      <Parameters
        round={round}
        setRound={setRound}
        setParametered={setParametered}
      />
    </main>
  );
};
