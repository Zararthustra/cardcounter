// import { useState } from "react";
import { Landing } from "./Landing";
import { Header } from "./Header";
import { Main } from "./Main";
import { useEffect, useState } from "react";

export const App = () => {
  const [teamReady, setTeamReady] = useState(false);

  useEffect(() => {
    console.log('render app');
  }, [teamReady])

  if (!teamReady)
    return (
      <>
        <Header />
        <Landing setTeamReady={setTeamReady} />
      </>
    );

  return (
    <>
      <Header />
      <Main />
    </>
  );
}
