import React from "react"
import './style.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  function generateNewDie() {
    return { 
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid() 
    };
  }
  
  function allNewDice(){
    const arr = [];
    for (let i = 0; i < 10; i++) {
        const obj = generateNewDie();
        arr.push(obj);
    }
    return arr;
  }
  
  function rollDice() {
    if (!tenzies) {
      setNumbers(oldNumbers => oldNumbers.map(num => {
          return num.isHeld ? 
              num :
              generateNewDie()
      }))             
  } else {
      setTenzies(false)
      setNumbers(allNewDice()) 
  }
  }

  function holdDice(id) {
    setNumbers(oldNumbers => oldNumbers.map(num => {
      return num.id === id ? {...num, isHeld: !num.isHeld} : num
    }))
  }

  const [numbers, setNumbers] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false)
    
  React.useEffect(() => {
    let isWin = true;
    let num = numbers[0].value;
    numbers.map(number => {
        if (!number.isHeld || num !== number.value){
            isWin = false;
        }
    })
    if (isWin) {
        setTenzies(true)
        console.log("You won!");
      }
  }, [numbers])

  // React.useEffect(() => {
  //     const allHeld = numbers.every(die => die.isHeld)
  //     const firstValue = numbers[0].value
  //     const allSameValue = numbers.every(die => die.value === firstValue)
  //     if (allHeld && allSameValue) {
  //         setTenzies(true)
  //         console.log("You won!")
  //     }
  // }, [numbers])

  const nums = numbers.map(num => (
    <Die key={num.id} value={num.value} isHeld={num.isHeld} holdDice={() => holdDice(num.id)}/>
  ));

  
  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
     <div className="die-container">
      {nums}
     </div>
     <button className="roll-dice-btn" onClick={rollDice}><p>{tenzies ? "New Game" : "Roll"}</p></button>
    </main>
  );
}

export default App;
