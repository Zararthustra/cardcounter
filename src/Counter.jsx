import { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5";
import useInterval from "@use-it/interval";
import { saveLocalStorage } from "./utils/localStorage";
// import { saveLocalStorage } from "./utils/localStorage";

export const Counter = ({
  round,
  rounds,
  setRounds,
  setComputed,
  setParametered,
}) => {
  //_________________________________________________________________________________________________ Vars

  // useRefs
  const videoRef = useRef();
  const team1CalcButtonRef = useRef();
  const team2CalcButtonRef = useRef();

  const refreshEverySec = 0.1; //1 = 1 second
  const confidenceLevel = 0.99; //1 = 100%

  const [classifier, setClassifier] = useState(null);
  const [result, setResult] = useState({ "Equipe 1": 0, "Equipe 2": 0 });
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardsArray, setCardsArray] = useState([]); //array of accepted cards
  const [teamCalc, setTeamCalc] = useState(null);

  //_________________________________________________________________________________________________ UseEffect

  // On load
  useEffect(() => {
    let mounted = true;
    console.log("Render <Counter />");

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
            if (mounted) {
              videoRef.current.srcObject = stream;
              videoRef.current.onloadedmetadata = () => videoRef.current.play();
            }
          });
      })
    );
    return () => (mounted = false);
  }, [start]);

  useInterval(() => {
    if (classifier && start) {
      setLoading(true);
      classifier.classify(videoRef.current, (error, predictions) => {
        if (error) return console.error(error);

        console.log("predictions : ", predictions);
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

  const startCounter = () => {
    if (teamCalc === null) return; // error toaster here
    return setStart(!start);
  };

  const activeTeamCalcButton = (team) => {
    setTeamCalc(team);
    team1CalcButtonRef.current.style.backgroundColor = "#ea5454";
    team2CalcButtonRef.current.style.backgroundColor = "#ea5454";
    switch (team) {
      case "Equipe 1":
        return (team1CalcButtonRef.current.style.backgroundColor = "#ea5454ad");
      case "Equipe 2":
        return (team2CalcButtonRef.current.style.backgroundColor = "#ea5454ad");
      default:
        break;
    }
  };

  const handlePrediction = (newCard) => {
    if (cardsArray.includes(newCard.label)) return;
    newCard.confidence > confidenceLevel &&
      setCardsArray([...cardsArray, newCard.label]);
  };

  const handleCounter = (cardsArray) => {
    const totalPoints = round.rebelote ? 180 : 160
    let finalPoints =
      (round.lastPliTeam === teamCalc ? 10 : 0) +
      (round.rebeloteTeam === teamCalc ? 20 : 0);

    console.log("Bonus : ", finalPoints);

    finalPoints += cardsArray.reduce(
      (previousValue, currentValue) =>
        previousValue + scoreMapping(currentValue),
      0
    );

    // if (round.teamBet === teamCalc) {
    //   if (finalPoints >= round.contrat)
    //     finalPoints = Math.round(finalPoints / 10) * 10;
    //   else finalPoints = 0;
    // } else {
    //   if (finalPoints > 160 - round.contrat) finalPoints = 160;
    // }

    const otherTeamFinalPoints = totalPoints - finalPoints >= 0 ? totalPoints - finalPoints : 0;

    return {
      "Equipe 1": teamCalc === "Equipe 1" ? finalPoints : otherTeamFinalPoints,
      "Equipe 2": teamCalc === "Equipe 2" ? finalPoints : otherTeamFinalPoints,
    };
  };

  const scoreMapping = (card) => {
    const color = card.split(" ")[2];
    const value = card.split(" ")[0];

    if (color === round.trump)
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

  const saveRound = () => {
    const updatedRound = {
      ...round,
      result,
      teamCalc,
    };
    setRounds([...rounds, updatedRound]);
    saveLocalStorage("rounds", JSON.stringify([...rounds, updatedRound]));
    setParametered(false);
    setComputed(true);
    return;
  };

  //_________________________________________________________________________________________________ Render

  return (
    <div className="mainContainer">
      <h2>Compteur</h2>
      <div className="chooseButton">
        <button
          ref={team1CalcButtonRef}
          onClick={() => activeTeamCalcButton("Equipe 1")}
        >
          Equipe 1
        </button>
        <button
          ref={team2CalcButtonRef}
          onClick={() => activeTeamCalcButton("Equipe 2")}
        >
          Equipe 2
        </button>
      </div>
      <div>{JSON.stringify(cardsArray)}</div>
      <div>{loading ? "Chargement..." : ""}</div>
      <div className="videoContainer">
        <h3>Score : {result[teamCalc]}</h3>
        <video ref={videoRef} />
        <button onClick={startCounter}>
          {start ? "Arrêter" : "Lancer le compteur"}
        </button>
      </div>

      <button className="saveRound" onClick={saveRound}>
        Enregistrer la manche
      </button>
    </div>
  );
};
