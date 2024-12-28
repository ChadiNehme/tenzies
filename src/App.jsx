
import { useState ,useRef,useEffect } from 'react'
import './App.css'
import Die from './component/Die/Die'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'


function App() {
  const [dies, setDies] = useState(() => generateRandomDies());
  const buttonRef = useRef(null);
  
  const gameWno = dies.every(die => die.on) && dies.every(die => die.value === dies[0].value)

  useEffect(()=>{
    if(gameWno){
      buttonRef.current.focus()
    }
  },[gameWno])
  

  function random() {
    return 1 + Math.floor(Math.random() * 6);
  }

  function generateRandomDies() {
    const dieArr = []
    for (let i = 0; i < 10; i++) {
      dieArr.push({
        value: random(),
        on: false,
        id: nanoid()
      })

    }
    return dieArr

  }

  function toggle(id) {
    setDies(prev => prev.map(item => {
      return id === item.id ? { ...item, on: !item.on } : item
    }))

  }


  const display = dies.map(die =>
    <Die
      key={die.id}
      value={die.value}
      on={die.on}
      toggle={() => toggle(die.id)}

    />)

  function roll() {
    // setDies(generateRandomDies())
    !gameWno ?
      setDies(prev => prev.map(item => {
        return item.on ? { ...item } : { ...item, value: random() }
      }))
      : setDies(generateRandomDies())
  }






  return (
    <main>
      {gameWno && <Confetti />}
      <div className="die-container">
        {display}
      </div>
      <button ref={buttonRef} onClick={roll}>
        {gameWno ? "New Game" : "Roll"}
      </button>

    </main>
  )
}

export default App
