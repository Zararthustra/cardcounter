import { removeLocalStorage } from "./utils/localStorage";

export const Scores = ({ rounds, setComputed, setShowScores }) => {
  const newRound = () => {
    removeLocalStorage("round");
    setShowScores(false);
    setComputed(false);
  };

  // mapping over round to get better columns
  const mockRounds = [
    {
      contrat: 80,
      contree: "false",
      lastPliTeam: "Equipe 2",
      rebelote: "false",
      rebeloteTeam: "none",
      result: 20,
      teamBet: "Equipe 1",
      trump: "coeur",
    },
    {
      contrat: 130,
      contree: "true",
      lastPliTeam: "Equipe 1",
      rebelote: "false",
      rebeloteTeam: "none",
      result: 90,
      teamBet: "Equipe 1",
      trump: "carreau",
    },
    {
      contrat: "capot",
      contree: "false",
      lastPliTeam: "Equipe 1",
      rebelote: "true",
      rebeloteTeam: "Equipe 2",
      result: 150,
      teamBet: "Equipe 2",
      trump: "trèfle",
    },
  ];
  console.log(rounds, "<==");

  return (
    <main className="mainPage">
      <div className="mainContainer">
        <h2>Scores</h2>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>contrat</th>
                <th>contree</th>
                <th>lastPliTeam</th>
                <th>rebelote</th>
                <th>rebeloteTeam</th>
                <th>result</th>
                <th>teamBet</th>
                <th>trump</th>
              </tr>
            </thead>
            <tbody>
              {mockRounds.map((round, roundNumber) => {
                return (
                  <tr key={roundNumber}>
                    {Object.values(round).map((value, index) => {
                      return <td key={index}>{value}</td>;
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
