// import { useState } from "react";
import { Landing } from "./Landing";
import { Header } from "./Header";
import { Main } from "./Main";
import { useEffect, useState } from "react";

export const App = () => {
  const [team, setTeam] = useState(false);

  useEffect(() => {
    console.log('render <App />');
  }, [team])

  if (!team)
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
