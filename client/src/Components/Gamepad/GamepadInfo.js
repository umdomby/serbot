import React, {useRef, useState} from "react";
import store from "../../Store"
import './gamepad.css'

const GamepadInfo = ({ buttons, axes }) => {

  const refLT = useRef(false);
  const refRT = useRef(false);
  const refLB = useRef(true);
  const refA = useRef(true);
  const refX = useRef(true);
  const refB = useRef(true);
  const refY = useRef(true);
  const refRB = useRef(true);
  const refPWR = useRef(true);
  const refLS = useRef(true);
  const refRS = useRef(true);
  const refPWRoNoFF = useRef(false);
  const refSpeed = useRef(1);
  // const [startSpeed, setStartSpeed] = useState(Number(localStorage.getItem('startSpeed') || 0));
  const refInterval = useRef(2000);
  const refRTLTNull = useRef(true);
  const refRjVert = useRef(0);
  const refLjHoriz = useRef(0);
  const refTimeout = useRef(1000);
  const refBoolLL = useRef(false);
  const refBoolRR = useRef(false);
  const refTimeoutBool2 = useRef(true);
  const lineUpDown = useRef(false)


  const {
    x,
    y,
    a,
    b,
    dUp,
    dDown,
    dLeft,
    dRight,
    lb,
    rb,
    ls,
    rs,
    lt,
    rt,
    menu,
    pwr,
    pause,
  } = buttons;
  const ljHoriz = axes[0];
  const ljVert = axes[1];
  const rjHoriz = axes[2];
  const rjVert = axes[3];

  //const refLjVert = useRef(axes[1]);
  //refLjVert.current = ljVert
  //console.log("6666 " + ljVert)
  //console.log("7777 " + refLjVert.current)

  if(ljHoriz > 0.11 && ls.pressed === false && rs.pressed === false || ljHoriz < -0.11 && ls.pressed === false && rs.pressed === false) {
    refBoolLL.current = true
    const map = (x, in_min, in_max,out_min, out_max)=> {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    //refRjVert.current = map(rjVert, 0, 1, 50, 100);
    refLjHoriz.current = map(ljHoriz, 0, -1, 90, 180);
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBLL',
      messageLL: Math.round(refLjHoriz.current),
      //messageRR: Math.round(refRjVert.current)
    }))
    console.log('Joy LeftRight ' + refLjHoriz.current)

  }else if(refBoolLL.current === true){
    refBoolLL.current = false
    //refRjVert.current = 40
    refLjHoriz.current = 90
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBLL',
      messageLL: 90,
      //messageRR: 40
    }))
  }
  if(rjVert > 0.11 && ls.pressed === false && rs.pressed === false || rjVert < -0.11 && ls.pressed === false && rs.pressed === false) {
    refBoolRR.current = true
    const map = (x, in_min, in_max,out_min, out_max)=> {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    refRjVert.current = map(rjVert, 0, 1, 50, 100);
    //refLjHoriz.current = map(ljHoriz, 0, 1, 90, 180);
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBRR',
      //messageLL: Math.round(refLjHoriz.current),
      messageRR: Math.round(refRjVert.current)
    }))
    console.log('Joy UpDown ' + refRjVert.current)
    //console.log('refRjVert.current ' + refLjHoriz.current )
  }else if(refBoolRR.current === true){
    refBoolRR.current = false
    refRjVert.current = 40
    //refLjHoriz.current = 90
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBRR',
      //messageLL: 90,
      messageRR: 40
    }))
  }

  // if(ls.pressed === true){
  //   store.webSocket.send(JSON.stringify({
  //     id: store.idSocket,
  //     method: 'messageFBLLRR',
  //     messageLL: 90,
  //     messageRR: 30
  //   }))
  // }
  //
  // if(rs.pressed === true){
  //   store.webSocket.send(JSON.stringify({
  //     id: store.idSocket,
  //     method: 'messageFBLLRR',
  //     messageLL: 90,
  //     messageRR: 30
  //   }))
  // }

  if(lt.pressed === true){refLT.current = true}
  if(rt.pressed === true){refRT.current = true}

  if(refLT.current === true || refRT.current === true) {
    console.log('RT ' + rt.value)
    console.log('LT ' + lt.value)
    if(lineUpDown.current === false) {
      // console.log('lineUpDown.current 1 ' + lineUpDown.current)
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesLTRT',
        messageL: lt.value * refSpeed.current * 25,
        messageR: rt.value * refSpeed.current * 25,
      }))
    }
  else if(lineUpDown.current === true){
      // console.log('lineUpDown.current 2 ' + lineUpDown.current)
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesLTRT',
        messageL: rt.value * refSpeed.current * 25,
        messageR: lt.value * refSpeed.current * 25,
      }))
    }
  }
  if(lt.pressed === false && refLT.current === true){
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesLTRT',
      messageLT: 0,
      messageRT: rt.value,
    }))
    refLT.current = false
  }
  if(rt.pressed === false && refRT.current === true){
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesLTRT',
      messageLT: lt.value,
      messageRT: 0,
    }))
    refRT.current = false
  }

  if(dUp.pressed === true) {
    lineUpDown.current = true
    store.setMessageFBL(true)
    store.setMessageFBR(true)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBLR',
      messageFBL: true,
      messageFBR: true
    }))
  }
  if(dDown.pressed === true) {
    lineUpDown.current = false
    store.setMessageFBL(false)
    store.setMessageFBR(false)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBLR',
      messageFBL: false,
      messageFBR: false
    }))
  }
  if(dLeft.pressed === true) {
    store.setMessageFBL(true)
    store.setMessageFBR(false)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBLR',
      messageFBL: false,
      messageFBR: true
    }))
  }
  if(dRight.pressed === true) {
    store.setMessageFBL(false)
    store.setMessageFBR(true)
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesFBLR',
      messageFBL: true,
      messageFBR: false
    }))
  }
  if(a.pressed === true && refA.current === true) {
    refA.current = false
    //refRjVert.current = 30
    if(refRjVert.current > 4){
      refRjVert.current = refRjVert.current - 5
    }
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messageFBRR',
      messageRR: refRjVert.current
    }))
  }
  if(a.pressed === false){
    refA.current = true
  }
  if(x.pressed === true && refX.current === true) {
    refX.current = false
    if(refLjHoriz.current < 176) {
      refLjHoriz.current = refLjHoriz.current + 5
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messageFBLL',
        messageLL: refLjHoriz.current
      }))
    }
  }
  if(x.pressed === false){
    refX.current = true
  }
  if(b.pressed === true && refB.current === true) {
    refB.current = false
    if(refLjHoriz.current > 4) {
      refLjHoriz.current = refLjHoriz.current - 5
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messageFBLL',
        messageLL: refLjHoriz.current
      }))
    }
  }
  if(b.pressed === false){
    refB.current = true
  }
  if(y.pressed === true && refY.current === true) {
    refY.current = false
    if(refRjVert.current < 96) {
      refRjVert.current = refRjVert.current + 5
      store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messageFBRR',
        messageRR: refRjVert.current
      }))
    }
  }
  if(y.pressed === false){
    refY.current = true
  }

  if(lb.pressed === true && refLB.current === true) {
    refLB.current = false
    if(refSpeed.current > 0) {
      refSpeed.current = refSpeed.current - 1
    }
    console.log(refSpeed.current)
  }

  // if(lb.pressed === true && refLB.current === true) {
  //   refLB.current = false
  //   if(refSpeed.current === 255) {
  //     refSpeed.current = refSpeed.current - 30
  //   }else if(refSpeed.current > 26){
  //     refSpeed.current = refSpeed.current - 25
  //   }
  //   console.log(refSpeed.current)
  // }
  if(lb.pressed === false){
    refLB.current = true
  }

  if(rb.pressed === true && refRB.current === true) {
    refRB.current = false
    if(25.5 * refSpeed.current < 255) {
      refSpeed.current = refSpeed.current + 1
    }
    //refSpeed.current = store.speedControl + store.speedControl * 25.5
    //console.log(refSpeed.current)
  }
  // if(rb.pressed === true && refRB.current === true) {
  //   refRB.current = false
  //   if(refSpeed.current < 201) {
  //     refSpeed.current = refSpeed.current + 25
  //   } else if(refSpeed.current === 225){
  //     refSpeed.current = refSpeed.current + 30
  //   }
  //   console.log(refSpeed.current)
  // }
  if(rb.pressed === false){
    refRB.current = true
  }

  if(menu.pressed === true) {
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesOnOff',
      messageOnOff: true
    }))
  }
  if(pause.pressed === true) {
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'messagesOnOff',
      messageOnOff: false
    }))
  }


  if(ls.pressed === true && refLS.current === true){
    refLS.current = false
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'saddleUP',
      message: false
    }))
  }else if(ls.pressed === false && refLS.current === false) {
    refLS.current = true
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'saddleUP',
      message: true
    }))
  }

  if(rs.pressed === true && refRS.current === true){
    refRS.current = false
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'saddleDOWN',
      message: false
    }))
  }else if(rs.pressed === false && refRS.current === false) {
    refRS.current = true
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'saddleDOWN',
      message: true
    }))
  }

  if(pwr.pressed === true && refPWR.current === true) {
    console.log('pwr_1')
    refPWR.current = false
  }else if(pwr.pressed === false && refPWR.current === false) {
    console.log('pwr_2')
    refPWRoNoFF.current = !refPWRoNoFF.current
    refPWR.current = true
    store.webSocket.send(JSON.stringify({
      id: store.idSocket,
      method: 'light',
      message: refPWRoNoFF.current
    }))
  }

  return (
    <div className='gamepad'>
      {' speed ' + refSpeed.current + ' = '+ (25 * refSpeed.current)}
      <div>{'LT = ' + (parseInt(lt.value * refSpeed.current * 25))}</div>
      <div>{'RT = ' + (parseInt(rt.value * refSpeed.current * 25))}</div>
        {/*<input*/}
        {/*    value={startSpeed}*/}
        {/*    type="range"*/}
        {/*    min="0"*/}
        {/*    max="255"*/}
        {/*    step="1"*/}
        {/*    id="pitch"*/}
        {/*    onChange={(event) => {*/}
        {/*      // refSpeed.current = 1*/}
        {/*      setStartSpeed(Number(event.target.value));*/}
        {/*      localStorage.setItem('startSpeed', Number(event.target.value))*/}
        {/*    }}*/}
        {/*/>*/}

      {/*{startSpeed}*/}


      {/*<div style={{ fontFamily: "monospace", color:'white', paddingTop:'100px' ,width:'30%', margin: '0 auto'}}>*/}
      {/*<p>X: {x && x.pressed && `pressed`}</p>*/}
      {/*<p>Y: {y && y.pressed && `pressed`}</p>*/}
      {/*<p>A: {a && a.pressed && `pressed`}</p>*/}
      {/*<p>B: {b && b.pressed && `pressed`}</p>*/}
      {/*<p>DPad Up: {dUp && dUp.pressed && `pressed`}</p>*/}
      {/*<p>DPad Down: {dDown && dDown.pressed && `pressed`}</p>*/}
      {/*<p>DPad Left: {dLeft && dLeft.pressed && `pressed`}</p>*/}
      {/*<p>DPad Right: {dRight && dRight.pressed && `pressed`}</p>*/}
      {/*<p>LB: {lb && lb.pressed && `pressed`}</p>*/}
      {/*<p>RB: {rb && rb.pressed && `pressed`}</p>*/}
      {/*<p>LS: {ls && ls.pressed && `pressed`}</p>*/}
      {/*<p>RS: {rs && rs.pressed && `pressed`}</p>*/}
      {/*<p>LT: {lt && lt.pressed && `pressed, value: ${lt.value}`}</p>*/}
      {/*<p>RT: {rt && rt.pressed && `pressed, value: ${rt.value}`}</p>*/}
      {/*<p>menu: {menu && menu.pressed && `pressed`}</p>*/}
      {/*<p>pause: {pause && pause.pressed && `pressed`}</p>*/}
      {/*<p>pwr: {pwr && pwr.pressed && `pressed`}</p>*/}
      {/*<p>LJ horiz: {ljHoriz}</p>*/}
      {/*<p>LJ vert: {ljVert}</p>*/}
      {/*<p>RJ horiz: {rjHoriz}</p>*/}
      {/*<p>RJ vert: {rjVert}</p>*/}
    </div>
  );
}

export default GamepadInfo;
