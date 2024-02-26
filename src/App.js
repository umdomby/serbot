import './App.css';
import Gamepad from "./Components/Gamepad/Gamepad";
import ConnectWebSocket from "./Components/Socket/ConnectWebSocket";


function App() {

  return (
    <div className="App">
        <header className="App-header">
            <div style={{paddingLeft: '30px'}}>
                <Gamepad/>
            </div>
            <ConnectWebSocket/>
            {/*<video controls width="100%">*/}
            {/*    <source src={"https://192.168.0.104:8084/browserfs.html"} type="video/mp4"/>*/}
            {/*    Sorry, your browser doesn't support embedded videos.*/}
            {/*</video>*/}
        </header>
    </div>
  );
}

export default App;
