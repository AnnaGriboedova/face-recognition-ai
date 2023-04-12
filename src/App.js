import './App.css';
import {ImageLinkForm} from "./components/ImageLinkForm";
import {Rank} from "./components/Rank";
import {useState} from "react";
import {FaceRecognition} from "./components/FaceRecognition/FaceRecognition";
import {SignIn} from "./components/SignIn/SignIn";
import {Navigate} from "./components/Navigate/Navigate";
import {Register} from "./components/Register/Register";

///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////
const returnClarifaiRequestOptions = (imageUrl) => {
// Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '11a614b308a04ee191b3de14fc1e9716';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
    const USER_ID = 'cpqvg6g9pf1q';
    const APP_ID = 'test';
// Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions
}


function App() {
    const [inputValue, setInputValue] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [box, setBox] = useState({});
    const [route, setRoute] = useState('signin');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const onInputChange = (event) => {
        setInputValue(event.target.value/*(prevState)=>{
        return event.target.value
    }*/)


    }

    const calculateFaceLocation = (data) => {
        console.log(data)
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('input_image')
        const imageW = Number(image.width)
        const imageH = Number(image.height)
        console.log(imageW)
        console.log(imageH)
        return {
            leftCol: clarifaiFace.left_col * imageW,
            topRow: clarifaiFace.top_row * imageH,
            rightCol: imageW - (clarifaiFace.right_col * imageW),
            bottomRow: imageH - (clarifaiFace.bottom_row * imageH)
        }

    }
    const displayFaceBox = (box) => {
        setBox(box)
    }

    const onSubmit = () => {
        setImageUrl(inputValue)
        fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(inputValue))
            .then(response => response.json())
            .then(result => displayFaceBox(calculateFaceLocation(result)))
            .catch(error => console.log('error', error));
    }

    const onRouteChange = (route) => {
        if (route === 'signout')
            setIsSignedIn(false)
        else if (route === 'home')
            setIsSignedIn(true)

        setRoute(route)
    }
    return (
        <div className="App">
            <Navigate isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
            {route === 'home' ? <div>
                <Rank/>
                <ImageLinkForm onSubmit={onSubmit} inputValue={inputValue} onInputChange={onInputChange}/>
                <FaceRecognition imageUrl={imageUrl} box={box}/>
            </div> : (route === 'signin' ? <SignIn onRouteChange={onRouteChange}/> :
                <Register/>)
            }
        </div>
    );
}

export default App;
