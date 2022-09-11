import { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5";
import useInterval from "@use-it/interval";

export const Main = () => {
  //_________________________________________________________________________________________________ Vars

  const refreshEverySec = 0.5;
  const videoRef = useRef();
  const [classifier, setClassifier] = useState(null);
  const [result, setResult] = useState(0);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trump, setTrump] = useState(null);
  const [contrat, setContrat] = useState(null);
  const [rebelotte, setRebelotte] = useState(false);
  const [lastPli, setLastPli] = useState(false);
  const [cardsArray, setCardsArray] = useState([]);

  //_________________________________________________________________________________________________ UseEffect

  // On load
  useEffect(() => {
    console.log("render");

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
    newCard.confidence > 0.7 && setCardsArray([...cardsArray, newCard.label]);
  };

  const handleCounter = (cardsArray) => {
    return cardsArray.reduce(
      (previousValue, currentValue) =>
        previousValue + scoreMapping(currentValue),
      0
    ) + lastPli
      ? 10
      : 0 + rebelotte
      ? 20
      : 0;
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
  //_________________________________________________________________________________________________ Render

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
        marginTop: "3rem",
      }}
    >
      <div>
        <div>Score : {result}</div>
        <button onClick={() => setStart(!start)}>
          {start ? "Arrêter" : "Lancer le compteur"}
        </button>
      </div>
      <video
        ref={videoRef}
        // style={{ transform: "scale(-1, 1)" }}
        width="300"
        // height="300"
      />
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <button onClick={() => setTrump("trèfle")}>Trèfle</button>
            <button onClick={() => setTrump("coeur")}>Coeur</button>
            <button onClick={() => setTrump("pique")}>Pique</button>
            <button onClick={() => setTrump("carreau")}>Carreau</button>
          </div>
          {trump ? " Atout " + trump : " Pas d'atout"}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button onClick={() => setRebelotte(!rebelotte)}>
            Belotte-Rebelotte
          </button>
          {rebelotte ? " Oui" : " Non"}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button onClick={() => setLastPli(!lastPli)}>Dernier pli</button>
          {lastPli ? " Oui" : " Non"}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <button onClick={() => setContrat(80)}>80</button>
            <button onClick={() => setContrat(90)}>90</button>
            <button onClick={() => setContrat(100)}>100</button>
            <button onClick={() => setContrat(110)}>110</button>
            <button onClick={() => setContrat(120)}>120</button>
            <button onClick={() => setContrat(130)}>130</button>
            <button onClick={() => setContrat(140)}>140</button>
            <button onClick={() => setContrat("capot")}>Capot</button>
          </div>
          Contrat : {contrat ? " " + contrat : " Pas de contrat"}
        </div>
      </div>

      <div style={{ width: "10rem", height: "6rem" }}>
        Status :
        {loading ? (
          <div>Chargement...</div>
        ) : trump === null ? (
          <div>Choisir un Atout</div>
        ) : start ? (
          <div>En cours</div>
        ) : (
          <div>Prêt</div>
        )}
      </div>
    </div>
  );
}