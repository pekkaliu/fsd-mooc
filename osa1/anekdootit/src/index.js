import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick} >{text}</button>

const WinningAnecdote = ({votes, anecdotes}) => {
    // https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
    // const indexOfMaxValue = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
    // or
    const indexOfMaxValue = votes.indexOf(Math.max(...votes))
    return (
        <>
            <p>{anecdotes[indexOfMaxValue]}</p>
            <p>has {votes[indexOfMaxValue]} vote(s)</p>
        </>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))

  const getRandomInt = (max) =>  Math.floor(Math.random() * Math.floor(max))

  const setNewSelected = () => () => setSelected(getRandomInt(6))

  const handleVote = () => () => {
    const voteCopy = [...votes]
    voteCopy[selected] +=1
    setVotes(voteCopy)
  }
  
  const { anecdotes } = props

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} vote(s)
      <br />
      <Button text="vote" handleClick={handleVote()} />
      <Button text="next anecdote" handleClick={setNewSelected()} />
      
      <h2>Anecdote of the day</h2>
      <WinningAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)