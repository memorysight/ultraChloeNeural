import * as tf from "@tensorflow/tfjs";
import { useEFfect, useState } from "react";

function AIComponet(){
    const [model, sestModel] = useState(null);

    useEffect(() => {
        async function LoadModel(){
            const LoadedModel = await tf.LoadLayersModel("path/to/model.json");
            setModel(loadedModel);
        }

        LoadModel();
    }, []);

    return <div>AIComponent</div>;

}

    export default AIComponent;

