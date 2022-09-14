import { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5";
import useInterval from "@use-it/interval";
import { saveLocalStorage, getLocalStorage } from "./utils/localStorage";

export const Main = ({ team }) => {
  //_________________________________________________________________________________________________ Vars

  // useRefs
  const videoRef = useRef();
  const team1ButtonRef = useRef();
  const team2ButtonRef = useRef();
  const trumpClubButtonRef = useRef();
  const trumpHeartButtonRef = useRef();
  const trumpSpadeButtonRef = useRef();
  const trumpDiamondButtonRef = useRef();

  const refreshEverySec = 0.5; //1 = 1 second
  const confidenceLevel = 0.7; //1 = 100%

  const [classifier, setClassifier] = useState(null);
  const [result, setResult] = useState(0);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamPlaying, setTeamPlaying] = useState(null);
  const [trump, setTrump] = useState(null); //trump = atout
  const [contrat, setContrat] = useState(null);
  const [rebelotte, setRebelotte] = useState(false);
  const [lastPli, setLastPli] = useState(false);
  const [contree, setContree] = useState(false);
  const [cardsArray, setCardsArray] = useState([]); //array of accepted cards

  //_________________________________________________________________________________________________ UseEffect

  // On load
  useEffect(() => {
    console.log("render <Main />");

    // Launch classifier on video stream
    setClassifier(
      ml5.imageClassifier("./model/model.json", () => {
        setLoading(true);
        navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: "environment" },
            audio: false,
          })
          .then((stream) => {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => videoRef.current.play();
          });
      })
    );
  }, [result, start]);

  useInterval(() => {
    if (classifier && start) {
      if (trump === null) return setStart(false);

      setLoading(true);
      classifier.classify(videoRef.current, (error, predictions) => {
        if (error) return console.error(error);

        console.log(predictions);
        // Append the highest prediction to cardsArray
        handlePrediction(predictions[0]);
        console.log("cardsArray : ", cardsArray);
        // Set final result with cardsArray sum
        setResult(handleCounter(cardsArray));
      });
    }
    setLoading(false);
  }, refreshEverySec * 1000);

  //_________________________________________________________________________________________________ Functions

  const handlePrediction = (newCard) => {
    if (cardsArray.includes(newCard.label)) return;
    newCard.confidence > confidenceLevel &&
      setCardsArray([...cardsArray, newCard.label]);
  };

  const handleCounter = (cardsArray) => {
    return (
      cardsArray.reduce(
        (previousValue, currentValue) =>
          previousValue + scoreMapping(currentValue),
        0
      ) +
      (lastPli ? 10 : 0) +
      (rebelotte ? 20 : 0)
    );
  };

  const scoreMapping = (card) => {
    const color = card.split(" ")[2];
    const value = card.split(" ")[0];

    if (color === trump)
      switch (value) {
        case "Valet":
          return 20;
        case "9":
          return 14;
        case "As":
          return 11;
        case "10":
          return 10;
        case "Roi":
          return 4;
        case "Dame":
          return 3;
        default:
          return 0;
      }
    else
      switch (value) {
        case "As":
          return 11;
        case "10":
          return 10;
        case "Roi":
          return 4;
        case "Dame":
          return 3;
        case "Valet":
          return 2;
        default:
          return 0;
      }
  };

  const saveManche = () => {
    console.log(trump);
    return;
  };

  const activeTeamButton = (team) => {
    setTeamPlaying(team);
    team1ButtonRef.current.style.backgroundColor = "#ea5454";
    team2ButtonRef.current.style.backgroundColor = "#ea5454";
    switch (team) {
      case "Equipe 1":
        return (team1ButtonRef.current.style.backgroundColor = "#ea5454ad");
      case "Equipe 2":
        return (team2ButtonRef.current.style.backgroundColor = "#ea5454ad");
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

  //_________________________________________________________________________________________________ Render

  return (
    <main className="mainPage">
      <div className="mainContainer">
        <div className="videoContainer">
          <h2>Score : {result}</h2>
          <video
            ref={videoRef}
            width="300"
            // height="300"
          />
          <button onClick={() => setStart(!start)}>
            {start ? "Arrêter" : "Lancer le compteur"}
          </button>
        </div>

        <div className="optionsContainer">
          <h2>Paramètres</h2>
          <p>Calcul des points de :</p>
          <div className="chooseButton">
            <button
              ref={team1ButtonRef}
              onClick={() => activeTeamButton("Equipe 1")}
            >
              Equipe 1
            </button>
            <button
              ref={team2ButtonRef}
              onClick={() => activeTeamButton("Equipe 2")}
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
          <h4>Contrat</h4>
          <div className="chooseButton">
            <button onClick={() => setContrat(80)}>80</button>
            <button onClick={() => setContrat(90)}>90</button>
            <button onClick={() => setContrat(100)}>100</button>
            <button onClick={() => setContrat(110)}>110</button>
            <button onClick={() => setContrat(120)}>120</button>
            <button onClick={() => setContrat(130)}>130</button>
            <button onClick={() => setContrat(140)}>140</button>
            <button onClick={() => setContrat(150)}>150</button>
            <button onClick={() => setContrat("capot")}>Capot</button>
          </div>
          <div className="toggleDiv">
            <h4>Belotte-Rebelotte</h4>
            <label className="switch">
              <input
                type="checkbox"
                value={rebelotte}
                onChange={() => setRebelotte(!rebelotte)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggleDiv">
            <h4>Dernier pli</h4>
            <label className="switch">
              <input
                type="checkbox"
                value={lastPli}
                onChange={() => setLastPli(!lastPli)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggleDiv">
            <h4>Contrée</h4>
            <label className="switch">
              <input
                type="checkbox"
                value={contree}
                onChange={() => setContree(!contree)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <button className="saveManche" onClick={saveManche}>
          Enregistrer
        </button>
      </div>
    </main>
  );
};
