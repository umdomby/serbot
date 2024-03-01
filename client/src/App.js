import './App.css';
import Gamepad from "./Components/Gamepad/Gamepad";
import ConnectWebSocket from "./Components/Socket/ConnectWebSocket";
import {ModalSet} from "./Components/Modal/ModalSet"


function App() {

  return (
    <div>
        <header className="App-header">
            <Gamepad/>
            <ConnectWebSocket/>
            <ModalSet/>
            {/*<video controls width="100%">*/}
            {/*    <source src={"https://192.168.0.104:8084/browserfs.html"} type="video/mp4"/>*/}
            {/*    Sorry, your browser doesn't support embedded videos.*/}
            {/*</video>*/}
        </header>
    </div>
  );
}

export default App;
