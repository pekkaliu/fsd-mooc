import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick} >{text}</button>

const Statistic = ({text, value, percent }) => 
    <tr>
        <td>{text}</td>
        <td>{value} {percent && <>%</>}</td>
    </tr>

const Statistics = ({good, bad, neutral, counter}) => {

  /**
    // Tarkistus "onko nappeja painettu" olisi parempi ehkä tehdä täällä
    if(counter === 0) {
        return <p>Ei yhtään palautetta annettu</p>
    }
   */

  const avg = (good - bad) / counter
  const pos =  ( good / counter ) * 100

  return (
    <>
        <h2>Statistiikkaa</h2>
        {counter > 0 
        ? <table>
            <Statistic text="hyvä" value ={good} />
            <Statistic text="neutraali" value ={neutral} />
            <Statistic text="huono" value ={bad} />
            <Statistic text="yhteensä" value ={counter} />
            <Statistic text="keskiarvo" value ={avg} />
            <Statistic text="positiivisia" value ={pos} percent />
          </table>
        : <p>Ei yhtään palautetta annettu</p>
        }
    </>
  )
}

  
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => () => setGood(good + 1)
  
  const handleNeutral = () => setNeutral(neutral +1)
  
  const counter = good + bad + neutral
  
  return (
    <div>
        <h2>Anna palautetta</h2>
        <Button text="Hyvä" handleClick={handleGood()}/>
        <Button text="Neutraali" handleClick={handleNeutral}/>
        <Button text="Huono" handleClick={() => setBad(bad + 1)}/>
        <Statistics good={good} bad={bad} neutral={neutral} counter={counter} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)