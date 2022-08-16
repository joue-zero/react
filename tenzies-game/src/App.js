
import Dice from "./components/Dice";
import { useEffect, useState } from "react"
import { nanoid } from "nanoid";
import {useWindowSize} from 'react-use';
import Confetti from "react-confetti";
function App() {
  // Dice Stata 
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const {width, height} = useWindowSize();
  useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every(el => el.value === firstValue && el.isHeld);
    if(allHeld){
      setTenzies(true)
    }
  }, [dice])

  function generateADie(){
    const rand = Math.ceil(Math.random() * 6);
    return {
      id: nanoid(),
      value: rand,
      isHeld: false
    }
  }
  function allNewDice() {
    const arr = [];
    for(let i =0; i < 10; ++i){
      arr.push(generateADie())
    }
    return arr;
  }

  function activeDie(id){
    setDice((oldValues)=> oldValues.map(die => {
      if(die.id === id) {
        return {...die, isHeld: !die.isHeld}
      } else {
        return die;
      }
    }))
  }

  function roll() {
    if(!tenzies){
      setDice((oldValue) => oldValue.map(die => die.isHeld? die : generateADie()))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }
  const myDice = dice.map(die => 
    <Dice 
      value={die.value} 
      key={die.id} 
      isHeld={die.isHeld} 
      activeDie={() => activeDie(die.id)}/>)
  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1>Tenzies Game</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-cont">
        {myDice}
      </div>
      <button
        onClick={roll}
      >
        {!tenzies? "Roll" : "New Game"}</button>
    </main>
  );
}

export default App;
