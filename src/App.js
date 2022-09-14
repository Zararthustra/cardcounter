// import { useState } from "react";
import { Landing } from "./Landing";
import { Header } from "./Header";
import { Main } from "./Main";
import { useEffect, useState } from "react";
import { getLocalStorage } from "./utils/localStorage";

export const App = () => {
  const [team, setTeam] = useState(getLocalStorage("team"));

  useEffect(() => {
    console.log('render <App />');
  }, [team])

  if (team === null)
    return (
      <>
        <Header />
        <Landing setTeam={setTeam} />
      </>
    );

  return (
    <>
      <Header />
      <Main team={team}/>
    </>
  );
}
