import { removeLocalStorage } from "./utils/localStorage";

export const Scores = ({ rounds, setComputed, setShowScores }) => {
  const newRound = () => {
    removeLocalStorage("round");
    setShowScores(false);
    setComputed(false);
  };
  const thArray = [
    undefined,
    "Pris par",
    "Contrat",
    "Atout",
    "Contrée",
    "Dernier pli",
    "Rebelote",
    "Points Equipe 1",
    "Points Equipe 2",
  ];

  // const mockRounds = [
  //   {
  //     result: { "Equipe 1": 90, "Equipe 2": 70 },
  //     contrat: 80,
  //     trump: "coeur",
  //     teamBet: "Equipe 1",
  //     contree: false,
  //     lastPliTeam: "Equipe 2",
  //     rebelote: false,
  //     rebeloteTeam: undefined,
  //   },
  //   {
  //     result: { "Equipe 1": 100, "Equipe 2": 60 },
  //     contrat: 130,
  //     trump: "carreau",
  //     teamBet: "Equipe 1",
  //     contree: true,
  //     lastPliTeam: "Equipe 1",
  //     rebelote: false,
  //     rebeloteTeam: undefined,
  //   },
  //   {
  //     result: { "Equipe 1": 160, "Equipe 2": 0 },
  //     contrat: "capot",
  //     trump: "trèfle",
  //     teamBet: "Equipe 2",
  //     contree: false,
  //     lastPliTeam: "Equipe 1",
  //     rebelote: true,
  //     rebeloteTeam: "Equipe 2",
  //   },
  //   {
  //     result: { "Equipe 1": 160, "Equipe 2": 0 },
  //     contrat: "capot",
  //     trump: "trèfle",
  //     teamBet: "Equipe 2",
  //     contree: false,
  //     lastPliTeam: "Equipe 1",
  //     rebelote: true,
  //     rebeloteTeam: "Equipe 2",
  //   },
  //   {
  //     result: { "Equipe 1": 160, "Equipe 2": 0 },
  //     contrat: "capot",
  //     trump: "trèfle",
  //     teamBet: "Equipe 2",
  //     contree: false,
  //     lastPliTeam: "Equipe 1",
  //     rebelote: true,
  //     rebeloteTeam: "Equipe 2",
  //   },
  // ];

  let mappedRounds = rounds.map((round, index) => {
    return {
      roundNumber: index + 1,
      teamBet: round.teamBet,
      contrat: round.contrat,
      trump: round.trump,
      contree: round.contree === true ? "Oui" : "Non",
      lastPliTeam: round.lastPliTeam,
      rebeloteTeam: round.rebelote && round.rebeloteTeam,
      team1Points: round.result["Equipe 1"],
      team2Points: round.result["Equipe 2"],
    };
  });

  // Create array of all rounds points
  let team1FinalPoints = mappedRounds.map((round) => round.team1Points);
  let team2FinalPoints = mappedRounds.map((round) => round.team2Points);
  // Get sum
  team1FinalPoints = team1FinalPoints.reduce((prev, next) => prev + next, 0);
  team2FinalPoints = team2FinalPoints.reduce((prev, next) => prev + next, 0);

  const mapTrumpIcons = (trump) => {
    switch (trump) {
      case "coeur":
        return (
          <svg width="25" height="25" viewBox="0 0 25 26" fill="#ea5454">
            <path d="M13 24L11.1875 22.3121C4.75 16.3404 0.5 12.3891 0.5 7.56825C0.5 3.61695 3.525 0.535202 7.375 0.535202C9.55 0.535202 11.6375 1.57098 13 3.19497C14.3625 1.57098 16.45 0.535202 18.625 0.535202C22.475 0.535202 25.5 3.61695 25.5 7.56825C25.5 12.3891 21.25 16.3404 14.8125 22.3121L13 24Z" />
          </svg>
        );

      case "trèfle":
        return (
          <svg width="25" height="25" viewBox="0 0 22 26" fill="#3A3A3A">
            <path d="M11.75 0C14.625 0 17.125 2.5 17.125 5.25C17.1095 6.2194 16.8405 7.16786 16.345 8.00115C15.8494 8.83444 15.1444 9.52354 14.3 10C15.55 9.375 17.375 9.375 17.375 9.375C20.5 9.375 23 11.625 23 14.75C23 17.875 20.5 20 17.375 20C17.375 20 15.5 20 13 18.75C13 18.75 12.625 21.25 15.5 25H8C10.875 21.25 10.5 18.75 10.5 18.75C8 20 6.125 20 6.125 20C3 20 0.5 17.875 0.5 14.75C0.5 11.625 3 9.375 6.125 9.375C6.125 9.375 7.95 9.375 9.2 10C8.825 9.7875 6.4875 8.4625 6.375 5.25C6.375 2.5 8.875 0 11.75 0Z" />
          </svg>
        );

      case "pique":
        return (
          <svg width="25" height="25" viewBox="0 0 20 25" fill="#3A3A3A">
            <path d="M10 0C6.25 6.25 0 8.75 0 15C0 17.5 2.5 20 5 20C6.25 20 7.5 20 8.75 18.75C8.75 18.75 9.15 21.25 6.25 25H13.75C11.25 21.25 11.25 18.75 11.25 18.75C12.5 20 13.75 20 15 20C17.5 20 20 17.5 20 15C20 8.75 13.75 6.25 10 0Z" />
          </svg>
        );

      case "carreau":
        return (
          <svg width="25" height="25" viewBox="0 0 18 25" fill="#ea5454">
            <path d="M17.5 12.5L8.75 25L0 12.5L8.75 0" />
          </svg>
        );

      default:
        break;
    }
  };

  return (
    <main className="mainPage">
      <div className="mainContainer">
        <h2>Scores</h2>
        <div className="teamsPoints">
          <div className="teamPoints">
            <h3>Equipe 1</h3>
            <h3>{team1FinalPoints}</h3>
          </div>
          <div className="teamPoints">
            <h3>Equipe 2</h3>
            <h3>{team2FinalPoints}</h3>
          </div>
        </div>
        <div className="tableContainer">
          <table>
            <tbody>
              {thArray.map((thValue, thIndex) => {
                return (
                  <tr key={thIndex}>
                    <th>{thValue}</th>
                    {mappedRounds.map((round, roundNumber) => {
                      let roundMappedValuesArray = Object.values(round);
                      return (
                        <td key={roundNumber}>
                          {thIndex === 3
                            ? mapTrumpIcons(round["trump"])
                            : roundMappedValuesArray[thIndex]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button className="saveRound" onClick={() => newRound()}>
          Nouvelle manche
        </button>
      </div>
    </main>
  );
};
