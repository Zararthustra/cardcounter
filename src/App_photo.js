import './App.css';
import { useEffect, useState } from 'react';
import * as ml5 from "ml5";

function App() {
  const [classifier, setClassifier] = useState(null);
  const [img, setImg] = useState();
  const [result, setResult] = useState(null)

  useEffect(() => {
    setClassifier(ml5.imageClassifier("./model/model.json", () => {
      console.log("loaded");
    }))
  }, []);

  const onImageChange = (e) => {
    return setImg(e.target.files[0]);
  }

  const classifyImage = () => {
    // console.log(document.getElementById('imagee'));
    classifier.classify(document.getElementById('imagee'), 1, (error, results) => {
      if (error) {
        console.error(error);
      }
      console.log(results);
      return setResult(results);
    })
  }

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap: "3rem", marginTop: "3rem" }}>

      <input type="file" onChange={onImageChange} />

      <button onClick={() => classifyImage()}>Start</button>

      <div style={{ width: "10rem" }}>
        {result && result.map((res) =>
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <div>{res.label} </div>
            <div>{(res.confidence * 100).toFixed(2)}%</div>
          </div>)}
      </div>

      {
        img
          ? <img id='imagee' src={URL.createObjectURL(img)} alt="truc" />
          : "nothing"
      }

    </div>
  );
}

export default App;
