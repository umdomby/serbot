import {observer} from "mobx-react-lite";
import React, {useEffect, useRef, useState} from "react";
import WebSocketProject from "./WebSocketProject";
import store from "../../Store"
import shortId from "shortid";
import './socket.css'

const ConnectWebSocket = observer(() => {
    const persId = useRef(shortId.generate())
    const [idSocket, setIdSocket] = useState(localStorage.getItem('localIdSocket') || '')
    const [displayMessage, setDisplayMessage] = useState(localStorage.getItem('localIdSocket') || '');
    const [hidden, setHidden] = useState(false)

    useEffect(()=>{
        if( localStorage.getItem('localIdSocket') === null || localStorage.getItem('localIdSocket') === undefined) {
            //localStorage.setItem('localIdSocket', pass_gen())
            localStorage.setItem('localIdSocket', '')
        }
        setIdSocket(localStorage.getItem('localIdSocket') || '')
        store.setIdSocket(idSocket)
        connectID(idSocket)
        setInterval(() => socketReconnect(), 5000)
        setInterval(() => connectByte(), 900)

    },[idSocket])

    const connectID = (idSocket) => {
        WebSocketProject(idSocket, persId.current)
        console.log('persId ' + persId.current)
    }

    const socketReconnect = () => {
        if (store.webSocket.readyState === store.webSocket.CLOSED || store.webSocket.readyState === store.webSocket.CLOSING) {
            connectID(idSocket)
            console.log('WebSocket reconnected ' + idSocket)
        }
        else {
            console.log('WebSocket socketTest')
        }
    }

    const connectByte = () => {
        try {
            if (store.webSocket.readyState !== store.webSocket.CLOSED && store.webSocket.readyState !== store.webSocket.CLOSING) {
                console.log('connectByte')
                store.webSocket.send(JSON.stringify({
                    id: store.idSocket,
                    method: 'connectByte',
                    connectByte: true,
                }))
            }
        }catch (e) {
            console.log('err send connectByte')
        }

    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setIdSocket(displayMessage)
            localStorage.setItem('localIdSocket', displayMessage)
            setIdSocket(displayMessage)
            store.setIdSocket(displayMessage)
        }, 1500);
        return () => clearTimeout(timeOutId);
    }, [displayMessage]);

    return (
        <div>
            {hidden &&
                <input className='socketInput'
                       type='text'
                       disabled={false}
                       value={displayMessage}
                       onChange={event => setDisplayMessage(event.target.value)}
                       // onChange={(event) => {
                       //     localStorage.setItem('localIdSocket', event.target.value)
                       //     setIdSocket(event.target.value)
                       //     store.setIdSocket(event.target.value)
                       // }}
                />}
            <button className='socketButton'
                onClick={()=>setHidden(!hidden)}
            >
                Connect
            </button>
            {/*<div>*/}
            {/*    <button onClick={connectID}>Connect</button>*/}
            {/*</div>*/}
        </div>
    );
});

export default ConnectWebSocket;

