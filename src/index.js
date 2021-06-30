import React, { useState, useEffect } from "react"
import reactDom from "react-dom"
import "./styles.css"

let pomodoroTime = 25*60
let shortBreakTime = 6*60
let longBreakTime = 10*60

const App = () => {
  const [state, setState] = useState("pomodoro")

  switch(state) {
    case "pomodoro":
      return <Pomodoro 
        setState={setState}
      />

    case "shortBreak":
      return <ShortBreak 
        setState={setState}
      />
    
    case "longBreak":
      return <LongBreak 
        setState={setState}
      />
  }
}

const Pomodoro = (props) => {
  const [timeLeft, setTimeLeft] = useState(pomodoroTime)
  const [isActive, setIsActive] = useState(false) 
  document.title = formattingTime(timeLeft) + " - Time to work!"
  document.getElementById("favicon").href = "/pomodoro.ico"

  useEffect(() => {
    if (isActive) {
      if (!timeLeft) {
        props.setState("shortBreak")
        return
      }

      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearInterval(intervalId)

    } else {
      setTimeLeft(pomodoroTime)
    }
  })
  const [display, setDisplay] = useState(false)

  return (
    <div id="container"> 
      <div>
        <button id="pomodoro" class="target">Pomodoro</button>
        <button id="sBreak" onClick={() => {
          if (isActive) {
            if (window.confirm("Sei sicuro di voler cambiare mentre il timer è ancora in funzione?")) {
              props.setState("shortBreak")
            }
          } else {
            props.setState("shortBreak")
          }
        }}>Short Break</button>
        <button id="lBreak" onClick={() => {
          if (isActive) {
            if (window.confirm("Sei sicuro di voler cambiare mentre il timer è ancora in funzione?")) {
              props.setState("longBreak")
            }
          } else {
            props.setState("longBreak")
          }
        }}>Long Break</button>
      </div>

      <div id="timer">{formattingTime(timeLeft)}</div>

      <div id="buttons">
        <button id="start" onClick={() => {
          setIsActive(true)
          setDisplay(true)
        }}>START</button>
        <button id="restart" style={{display: display ? "inline" : "none"}} onClick={() => {
          if (window.confirm("Sei sicuro di voler fermare il timer?")) {
            setIsActive(false)
            setDisplay(false)
          }
        }}>
          <img id="imgButton" src="/restart.png"></img>
        </button>
      </div>
      <p>Time to work!</p>
    </div>
  )
}

const ShortBreak = (props) => {
  const [timeLeft, setTimeLeft] = useState(shortBreakTime)
  const [isActive, setIsActive] = useState(false) 
  document.title = formattingTime(timeLeft) + " - Time for a break!"
  document.getElementById("favicon").href = "/shortBreak.ico"

  useEffect(() => {
    if (isActive) {
      if (!timeLeft) {
        props.setState("pomodoro")
        return
      }

      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearInterval(intervalId)

    } else {
      setTimeLeft(shortBreakTime)
    }
  })
  const [display, setDisplay] = useState(false)

  return (
    <div id="container"> 
      <div>
        <button id="pomodoro" onClick={() => {
          if (isActive) {
            if (window.confirm("Sei sicuro di voler cambiare mentre il timer è ancora in funzione?")) {
              props.setState("pomodoro")
            }
          } else {
            props.setState("pomodoro")
          }
        }}>Pomodoro</button>
        <button id="sBreak" class="target">Short Break</button>
        <button id="lBreak" onClick={() => {
          if (isActive) {
            if (window.confirm("Sei sicuro di voler cambiare mentre il timer è ancora in funzione?")) {
              props.setState("longBreak")
            }
          } else {
            props.setState("longBreak")
          }
        }}>Long Break</button>
      </div>

      <div id="timer">{formattingTime(timeLeft)}</div>

      <div id="buttons">
        <button id="start" onClick={() => {
          setIsActive(true)
          setDisplay(true)
        }}>START</button>
        <button id="restart" style={{display: display ? "inline" : "none"}} onClick={() => {
          if (window.confirm("Sei sicuro di voler fermare il timer?")) {
            setIsActive(false)
            props.setState("pomodoro")
          }
        }}>
          <img id="imgButton" src="/restart.png"></img>
        </button>
      </div>
      <p>Time for a break!</p>
    </div>
  )
}

const LongBreak = (props) => {
  const [timeLeft, setTimeLeft] = useState(longBreakTime)
  const [isActive, setIsActive] = useState(false) 
  document.title = formattingTime(timeLeft) + " - Time for a break!"
  document.getElementById("favicon").href = "/longBreak.ico"

  useEffect(() => {
    if (isActive) {
      if (!timeLeft) {
        props.setState("pomodoro")
        return
      }

      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearInterval(intervalId)

    } else {
      setTimeLeft(longBreakTime)
    }
  })
  const [display, setDisplay] = useState(false)

  return (
    <div id="container"> 
      <div>
        <button id="pomodoro" onClick={() => {
          if (isActive) {
            if (window.confirm("Sei sicuro di voler cambiare mentre il timer è ancora in funzione?")) {
              props.setState("pomodoro")
            }
          } else {
            props.setState("pomodoro")
          }
        }}>Pomodoro</button>
        <button id="sBreak" onClick={() => {
          if (isActive) {
            if (window.confirm("Sei sicuro di voler cambiare mentre il timer è ancora in funzione?")) {
              props.setState("shortBreak")
            }
          } else {
            props.setState("shortBreak")
          }
        }}>Short Break</button>
        <button id="lBreak" class="target">Long Break</button>
      </div>

      <div id="timer">{formattingTime(timeLeft)}</div>

      <div id="buttons">
        <button id="start" onClick={() => {
          setIsActive(true)
          setDisplay(true)
        }}>START</button>
        <button id="restart" style={{display: display ? "inline" : "none"}} onClick={() => {
          if (window.confirm("Sei sicuro di voler fermare il timer?")) {
            setIsActive(false)
            props.setState("pomodoro")
          }
        }}>
          <img id="imgButton" src="/restart.png"></img>
        </button>
      </div>
      <p>Time for a break!</p>
    </div>
  )
}

const formattingTime = (timer) => {
  let minutes = Math.floor(timer/60)
  let seconds = timer - minutes * 60
  
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds
  return `${minutes}:${seconds}`
}

reactDom.render(
  <App />,
  document.getElementById("container")
)