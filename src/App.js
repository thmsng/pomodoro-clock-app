import React, { Component } from 'react';
import './App.css';

let interval
let timeLeft = 1500
const redText = document.getElementById("time-left")

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {  timeStart: 1500,
                    breakStart: 300,
                    startCount: 1500,
                    breakCount: 300,
                    onBreak: false,
                    onStart: false,
                    onPause: true}

    this.changeOnBreak = this.changeOnBreak.bind(this)
    this.changeOnPause = this.changeOnPause.bind(this)
    this.breakDecrement = this.breakDecrement.bind(this)
    this.breakIncrement = this.breakIncrement.bind(this)
    this.sessionDecrement = this.sessionDecrement.bind(this)
    this.sessionIncrement = this.sessionIncrement.bind(this)
    this.pressStart = this.pressStart.bind(this)
    this.countDown = this.countDown.bind(this)
    this.reset = this.reset.bind(this)
  }

  reset(){
    clearInterval(interval)
    this.setState({ onBreak: false,
                    onStart: false,
                    onPause: true,
                    timeStart : 1500,
                    breakStart : 300,
                    startCount : 1500,
                    breakCount : 300})
    timeLeft = 1500


  }

  countDown(){
    if ( !this.state.timeStart ===0 && !this.state.breakStart===0) {
      if (this.state.startCount===0) {
        this.setState({ onBreak : true,
                        onStart : false,
                        startCount : this.state.timeStart})
        let sound = document.getElementById("beep")
        sound.play()
      }
      if (this.state.breakCount===0) {
        this.setState({ onStart : true,
                        onBreak : false,
                        breakCount : this.state.breakStart})
      }

      if (this.state.onBreak) {
        this.setState({breakCount : this.state.breakCount-1})
        timeLeft = this.state.breakCount
      }
      else {
        this.setState({startCount : this.state.startCount-1})
        if (this.state.startCount === 60) {
          redText.style.color = "red"
        }
        timeLeft = this.state.startCount
      }
    }
  }



  pressStart(){
    if (!this.state.onStart && !this.state.onBreak) {
      this.setState({ startCount : this.state.timeStart,
                      breakCount : this.state.breakStart,
                      onStart : true,
                      onPause : false})
      interval = setInterval(this.countDown,1000)
    }
    else if (!this.state.onPause) {
      clearInterval(interval)
      this.setState({onPause : true})
    }
    else {
      interval = setInterval(this.countDown,1000)
      this.setState({onPause : false})
    }
  }

  breakDecrement(){
    if (this.state.breakStart !==0) {
      this.setState({breakStart : this.state.breakStart-60})
    }
  }

  breakIncrement(){
    if (this.state.breakStart !==3600) {
      this.setState({breakStart : this.state.breakStart+60})
    }
  }

  sessionDecrement(){
    if (this.state.timeStart !==0) {
      this.setState({timeStart : this.state.timeStart-60})
    }
  }

  sessionIncrement(){
    if (this.state.timeStart !==3600) {
      this.setState({timeStart : this.state.timeStart+60})
    }
  }

  changeOnBreak(){
    this.setState({onBreak : !this.state.onBreak})
  }

  changeOnPause(){
    this.setState({onPause : !this.state.onPause})
  }

  render() {
    let timerLabel
    if (this.state.onBreak) { timerLabel="Break"}
    else {timerLabel="Session"}

    return (
      <div id="containter">

        <div id="pomo-title">Pomodoro Clock</div>

        <div className="input-box left">
          <div id="break-label">Break Length</div>
          <div className="input-buttons left">
            <button id="break-decrement" className="input" onClick={this.breakDecrement}>Break decrement</button>
            <div id="break-length" className="input" onload="5">{this.state.breakStart/60}</div>
            <button id="break-increment" className="input" onClick={this.breakIncrement}> Break increment</button>
          </div>
        </div>

        <div className="input-box right">
          <div id="session-label">Session Length</div>
          <div className="input-buttons right">
            <button id="session-decrement" className="input" onClick={this.sessionDecrement}> Session decrement</button>
            <div id="session-length" className="input" onload="25">{this.state.timeStart/60}</div>
            <button id="session-increment" className="input" onClick={this.sessionIncrement}>Session increment</button>
          </div>
        </div>

        <div className="clock">
          <div id="timer-label">{timerLabel}</div>
          <div id="time-left">{("0" + Math.floor(timeLeft/60)).slice(-2)}:{("0" + timeLeft%60).slice(-2)}</div>
        </div>

        <div className="start-stop-reset">
          <button id="start_stop" onClick={this.pressStart}>Start/Stop</button>
          <button id="reset" onClick={this.reset}>Reset</button>
        </div>
        <audio id="beep" src="https://goo.gl/65cBl1"></audio>
      </div>
    );
  }
}

export default App;
