import * as tf from "@tensorflow/tfjs";
import { useEFfect, useState } from "react";

function AIComponetAnswer() {
    const [prediction, setPrediction] = useState(null);

    function handlePredictClickl() {
        const inputTensor = ts.tensor2d([[1, 2, 3,]]);
        const prediction = model.predict(inputTensor);
        setPrediction(prediction.dataSync());
    }

    return (
        <div>

            <button onClick={handlePredictClick}> Predict</button>
            {prediction && <div>{prediction}</div>}
        </div>
    );



}
export default AIComponentAnswer;