import React from "react"
import './style.css'
import Die from './components/Die'

/**
 * Challenge:
 * 
 * - Create a Die component that takes a `value` prop
 * - Render 10 instances of the Die component (manually)
 *      - Provide a number between 1-6 for the value on each
 *        for now
 * - Style the <main> and <Die> components 
 *   to look like they do in the slide
 *      - Hints: Create a container to hold the 10 instances
 *        of the Die component, and use CSS Grid to lay them
 *        out evenly in 2 rows of 5 columns
 *      - Use flexbox on main to center the dice container
 *        in the center of the page
 */





function App() {
  function allNewDice(){
    const arr = [];
    for (let i = 0; i < 10; i++) {
        const num = Math.ceil(Math.random() * 6);
        arr.push(num);
    }
    return arr;
  }

  const [numbers, setNumbers] = React.useState(allNewDice());
  const nums = numbers.map(num => <Die value={num} />);

  function rollDice() {
    setNumbers(allNewDice());
  }

  return (
    <main className="App">
     <div className="die-container">
      {nums}
     </div>
     <button className="roll-dice-btn" onClick={rollDice}><p>Roll</p></button>
    </main>
  );
}

export default App;
