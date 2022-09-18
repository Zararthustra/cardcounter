import { useEffect, useRef, useState } from "react";
import { saveLocalStorage } from "./utils/localStorage";

export const Parameters = ({ setRound, setParametered }) => {
  //_________________________________________________________________________________________________ Vars

  // useRefs

  const team1BetButtonRef = useRef();
  const team2BetButtonRef = useRef();
  const team1rebeloteButtonRef = useRef();
  const team2rebeloteButtonRef = useRef();
  const team1PliButtonRef = useRef();
  const team2PliButtonRef = useRef();
  const trumpClubButtonRef = useRef();
  const trumpHeartButtonRef = useRef();
  const trumpSpadeButtonRef = useRef();
  const trumpDiamondButtonRef = useRef();

  // const [loading, setLoading] = useState(false);
  const [teamBet, setTeamBet] = useState(null);
  const [trump, setTrump] = useState(null); //trump = atout
  const [contrat, setContrat] = useState(80);
  const [rebelote, setrebelote] = useState(false);
  const [rebeloteTeam, setrebeloteTeam] = useState(null);
  const [lastPliTeam, setLastPliTeam] = useState(null);
  const [contree, setContree] = useState(false);

  //_________________________________________________________________________________________________ UseEffect

  // On load
  useEffect(() => {
    let mounted = true;
    if (mounted) console.log("Render <Parameters />");
    return () => (mounted = false);
  }, []);

  //_________________________________________________________________________________________________ Functions

  const activeTeamBetButton = (team) => {
    setTeamBet(team);
    team1BetButtonRef.current.style.backgroundColor = "#ea5454";
    team2BetButtonRef.current.style.backgroundColor = "#ea5454";
    switch (team) {
      case "Equipe 1":
        return (team1BetButtonRef.current.style.backgroundColor = "#ea5454ad");
      case "Equipe 2":
        return (team2BetButtonRef.current.style.backgroundColor = "#ea5454ad");
      default:
        break;
    }
  };

  const activeTrumpButton = (trump) => {
    setTrump(trump);
    trumpClubButtonRef.current.style.backgroundColor = "#ea5454";
    trumpHeartButtonRef.current.style.backgroundColor = "#ea5454";
    trumpSpadeButtonRef.current.style.backgroundColor = "#ea5454";
    trumpDiamondButtonRef.current.style.backgroundColor = "#ea5454";
    switch (trump) {
      case "trèfle":
        return (trumpClubButtonRef.current.style.backgroundColor = "#ea5454ad");
      case "coeur":
        return (trumpHeartButtonRef.current.style.backgroundColor =
          "#ea5454ad");
      case "pique":
        return (trumpSpadeButtonRef.current.style.backgroundColor =
          "#ea5454ad");
      case "carreau":
        return (trumpDiamondButtonRef.current.style.backgroundColor =
          "#ea5454ad");
      default:
        break;
    }
  };

  const selectContrat = (e) => {
    const value = e.target.value;
    // Cast value if INT
    if (value.toUpperCase() !== value.toLowerCase()) return setContrat(value);
    return setContrat(parseInt(value));
  };

  const activeTeamrebeloteButton = (team) => {
    setrebeloteTeam(team);
    team1rebeloteButtonRef.current.style.backgroundColor = "#ea5454";
    team2rebeloteButtonRef.current.style.backgroundColor = "#ea5454";
    switch (team) {
      case "Equipe 1":
        return (team1rebeloteButtonRef.current.style.backgroundColor =
          "#ea5454ad");
      case "Equipe 2":
        return (team2rebeloteButtonRef.current.style.backgroundColor =
          "#ea5454ad");
      default:
        break;
    }
  };

  const activeTeamPliButton = (team) => {
    setLastPliTeam(team);
    team1PliButtonRef.current.style.backgroundColor = "#ea5454";
    team2PliButtonRef.current.style.backgroundColor = "#ea5454";
    switch (team) {
      case "Equipe 1":
        return (team1PliButtonRef.current.style.backgroundColor = "#ea5454ad");
      case "Equipe 2":
        return (team2PliButtonRef.current.style.backgroundColor = "#ea5454ad");
      default:
        break;
    }
  };

  const saveParameters = () => {
    const round = {
      teamBet,
      trump,
      contrat,
      rebelote,
      rebeloteTeam: rebeloteTeam || "/",
      lastPliTeam,
      contree,
    };
    if (rebelote && rebeloteTeam === null) return // error toast here
    if (Object.values(round).includes(null)) return; // error toast here
    console.log(round);
    saveLocalStorage("round", JSON.stringify(round));
    setRound(round);
    return setParametered(true)
  };

  //_________________________________________________________________________________________________ Render

  return (
    <div className="mainContainer">
      <div className="optionsContainer">
        <h2>Paramètres</h2>
        <h4>Enchère</h4>
        <div className="chooseButton">
          <button
            ref={team1BetButtonRef}
            onClick={() => activeTeamBetButton("Equipe 1")}
          >
            Equipe 1
          </button>
          <button
            ref={team2BetButtonRef}
            onClick={() => activeTeamBetButton("Equipe 2")}
          >
            Equipe 2
          </button>
        </div>
        <h4>Atout</h4>
        <div className="chooseButton">
          <button
            ref={trumpClubButtonRef}
            onClick={() => activeTrumpButton("trèfle")}
          >
            <svg width="25" height="25" viewBox="0 0 22 26" fill="none">
              <path
                d="M11.75 0C14.625 0 17.125 2.5 17.125 5.25C17.1095 6.2194 16.8405 7.16786 16.345 8.00115C15.8494 8.83444 15.1444 9.52354 14.3 10C15.55 9.375 17.375 9.375 17.375 9.375C20.5 9.375 23 11.625 23 14.75C23 17.875 20.5 20 17.375 20C17.375 20 15.5 20 13 18.75C13 18.75 12.625 21.25 15.5 25H8C10.875 21.25 10.5 18.75 10.5 18.75C8 20 6.125 20 6.125 20C3 20 0.5 17.875 0.5 14.75C0.5 11.625 3 9.375 6.125 9.375C6.125 9.375 7.95 9.375 9.2 10C8.825 9.7875 6.4875 8.4625 6.375 5.25C6.375 2.5 8.875 0 11.75 0Z"
                fill="#fff"
              />
            </svg>
          </button>
          <button
            ref={trumpHeartButtonRef}
            onClick={() => activeTrumpButton("coeur")}
          >
            <svg width="25" height="25" viewBox="0 0 25 26" fill="none">
              <path
                d="M13 24L11.1875 22.3121C4.75 16.3404 0.5 12.3891 0.5 7.56825C0.5 3.61695 3.525 0.535202 7.375 0.535202C9.55 0.535202 11.6375 1.57098 13 3.19497C14.3625 1.57098 16.45 0.535202 18.625 0.535202C22.475 0.535202 25.5 3.61695 25.5 7.56825C25.5 12.3891 21.25 16.3404 14.8125 22.3121L13 24Z"
                fill="#fff"
              />
            </svg>
          </button>
          <button
            ref={trumpSpadeButtonRef}
            onClick={() => activeTrumpButton("pique")}
          >
            <svg width="25" height="25" viewBox="0 0 20 25" fill="none">
              <path
                d="M10 0C6.25 6.25 0 8.75 0 15C0 17.5 2.5 20 5 20C6.25 20 7.5 20 8.75 18.75C8.75 18.75 9.15 21.25 6.25 25H13.75C11.25 21.25 11.25 18.75 11.25 18.75C12.5 20 13.75 20 15 20C17.5 20 20 17.5 20 15C20 8.75 13.75 6.25 10 0Z"
                fill="#fff"
              />
            </svg>
          </button>
          <button
            ref={trumpDiamondButtonRef}
            onClick={() => activeTrumpButton("carreau")}
          >
            <svg width="25" height="25" viewBox="0 0 18 25" fill="none">
              <path d="M17.5 12.5L8.75 25L0 12.5L8.75 0" fill="#fff" />
            </svg>
          </button>
        </div>
        <div className="selectDiv">
          <p>Contrat</p>
          <select onChange={selectContrat}>
            <option defaultValue value="80" onClick={() => setContrat(80)}>
              80
            </option>
            <option value="90" onClick={() => setContrat(90)}>
              90
            </option>
            <option value="100" onClick={() => setContrat(100)}>
              100
            </option>
            <option value="110" onClick={() => setContrat(110)}>
              110
            </option>
            <option value="120" onClick={() => setContrat(120)}>
              120
            </option>
            <option value="130" onClick={() => setContrat(130)}>
              130
            </option>
            <option value="140" onClick={() => setContrat(140)}>
              140
            </option>
            <option value="150" onClick={() => setContrat(150)}>
              150
            </option>
            <option value="160" onClick={() => setContrat(160)}>
              160
            </option>
            <option value="capot" onClick={() => setContrat("capot")}>
              Capot
            </option>
          </select>
        </div>
        <div className="toggleDiv">
          <p>Contré</p>
          <label className="switch">
            <input
              type="checkbox"
              value={contree}
              onChange={() => setContree(!contree)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="toggleDiv">
          <p>Belote-Rebelote</p>
          <label className="switch">
            <input
              type="checkbox"
              value={rebelote}
              onChange={() => setrebelote(!rebelote)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {rebelote ? (
          <div className="chooseButton" id="rebeloteTeam">
            <button
              ref={team1rebeloteButtonRef}
              onClick={() => activeTeamrebeloteButton("Equipe 1")}
            >
              Equipe 1
            </button>
            <button
              ref={team2rebeloteButtonRef}
              onClick={() => activeTeamrebeloteButton("Equipe 2")}
            >
              Equipe 2
            </button>
          </div>
        ) : (
          ""
        )}
        <h4>Dernier pli</h4>
        <div className="chooseButton">
          <button
            ref={team1PliButtonRef}
            onClick={() => activeTeamPliButton("Equipe 1")}
          >
            Equipe 1
          </button>
          <button
            ref={team2PliButtonRef}
            onClick={() => activeTeamPliButton("Equipe 2")}
          >
            Equipe 2
          </button>
        </div>
      </div>
      <button className="saveRound" onClick={saveParameters}>
        Enregistrer les paramètres
      </button>
    </div>
  );
};
