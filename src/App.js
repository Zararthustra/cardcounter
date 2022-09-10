import './App.css';
import { useEffect, useRef, useState } from 'react';
import * as ml5 from "ml5";
import useInterval from '@use-it/interval';

function App() {

  //_________________________________________________________________________________________________ Vars


  const videoRef = useRef();
  const [classifier, setClassifier] = useState(null);
  const [result, setResult] = useState(null)
  const [log, setlog] = useState("")
  const [start, setStart] = useState(false);

  //_________________________________________________________________________________________________ UseEffect

  // On load
  useEffect(() => {
    setClassifier(ml5.imageClassifier("./model/model.json", () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
        setlog("ff")
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" }, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => videoRef.current.play()
        });
    }))
  }, []);


  useInterval(() => {
    if (classifier && start) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(results)
        setResult(results);
      });
    }
  }, 1000);

  //_________________________________________________________________________________________________ Functions

  const startDetection = () => {
    setStart(!start)
  }



  //_________________________________________________________________________________________________ Render

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap: "3rem", marginTop: "3rem" }}>

      {log ? <div>{log}</div> : ""}
      <button onClick={() => startDetection()}>{start ? "Stop" : "Start"}</button>

      <div style={{ width: "10rem" }}>
        {result && result.map((res, index) =>
          <div key={index} style={{ justifyContent: "space-between", display: "flex" }}>
            <div>{res.label} </div>
            <div>{(res.confidence * 100).toFixed(2)}%</div>
          </div>)}
      </div>

      <video
        ref={videoRef}
        // style={{ transform: "scale(-1, 1)" }}
        width="300"
        // height="300"
      />

    </div>
  );
}

export default App;
