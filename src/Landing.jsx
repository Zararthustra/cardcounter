import { useState } from "react";
import { saveLocalStorage } from "./utils/localStorage";

export const Landing = ({ setTeam }) => {
  //___________________________________________________ Variables
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");

  //___________________________________________________ Functions

  const handleSubmit = (e) => {
    const teamObject = {
      player1,
      player2,
      player3,
      player4,
    };
    setTeam(teamObject);
    saveLocalStorage("team", JSON.stringify(teamObject));
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "player1":
        return setPlayer1(e.target.value);
      case "player2":
        return setPlayer2(e.target.value);
      case "player3":
        return setPlayer3(e.target.value);
      case "player4":
        return setPlayer4(e.target.value);
      default:
        break;
    }
  };

  //___________________________________________________ Render
  return (
    <main className="landingPage">
      <div className="landingContainer">
        <div className="title">
          <div className="cardIcons">
            <svg
              width="25"
              height="25"
              viewBox="0 0 26 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 24L11.1875 22.3121C4.75 16.3404 0.5 12.3891 0.5 7.56825C0.5 3.61695 3.525 0.535202 7.375 0.535202C9.55 0.535202 11.6375 1.57098 13 3.19497C14.3625 1.57098 16.45 0.535202 18.625 0.535202C22.475 0.535202 25.5 3.61695 25.5 7.56825C25.5 12.3891 21.25 16.3404 14.8125 22.3121L13 24Z"
                fill="#EA5454"
              />
            </svg>
            <svg
              width="25"
              height="25"
              viewBox="0 0 23 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.75 0C14.625 0 17.125 2.5 17.125 5.25C17.1095 6.2194 16.8405 7.16786 16.345 8.00115C15.8494 8.83444 15.1444 9.52354 14.3 10C15.55 9.375 17.375 9.375 17.375 9.375C20.5 9.375 23 11.625 23 14.75C23 17.875 20.5 20 17.375 20C17.375 20 15.5 20 13 18.75C13 18.75 12.625 21.25 15.5 25H8C10.875 21.25 10.5 18.75 10.5 18.75C8 20 6.125 20 6.125 20C3 20 0.5 17.875 0.5 14.75C0.5 11.625 3 9.375 6.125 9.375C6.125 9.375 7.95 9.375 9.2 10C8.825 9.7875 6.4875 8.4625 6.375 5.25C6.375 2.5 8.875 0 11.75 0Z"
                fill="#3A3A3A"
              />
            </svg>
          </div>
          <h1>
            CARD
            <br />
            COUNTER
          </h1>
          <div className="cardIcons">
            <svg
              width="25"
              height="25"
              viewBox="0 0 20 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C6.25 6.25 0 8.75 0 15C0 17.5 2.5 20 5 20C6.25 20 7.5 20 8.75 18.75C8.75 18.75 9.15 21.25 6.25 25H13.75C11.25 21.25 11.25 18.75 11.25 18.75C12.5 20 13.75 20 15 20C17.5 20 20 17.5 20 15C20 8.75 13.75 6.25 10 0Z"
                fill="#3A3A3A"
              />
            </svg>

            <svg
              width="25"
              height="25"
              viewBox="0 0 18 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.5 12.5L8.75 25L0 12.5L8.75 0" fill="#EA5454" />
            </svg>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Équipe 1</h3>
          <label htmlFor="player1">Joueur 1</label>
          <input
            required
            type="text"
            value={player1}
            onChange={handleChange}
            name="player1"
            id="player1"
          />
          <label htmlFor="player2">Joueur 2</label>
          <input
            required
            type="text"
            value={player2}
            onChange={handleChange}
            name="player2"
            id="player2"
          />
          <h3>Équipe 2</h3>
          <label htmlFor="player3">Joueur 3</label>
          <input
            required
            type="text"
            value={player3}
            onChange={handleChange}
            name="player3"
            id="player3"
          />
          <label htmlFor="player4">Joueur 4</label>
          <input
            required
            type="text"
            value={player4}
            onChange={handleChange}
            name="player4"
            id="player4"
          />
          <input type="submit" value="Commencer" />
        </form>
      </div>
    </main>
  );
};
