import './App.css'
import { useState, useEffect } from 'react'
import React from 'react'
import SingleCard from '/home/christopher/memory/src/components/SingleCard.js'

const cardImages = [
  { "src": "/img/potion-1.png", matched: false},
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/scroll-1.png", matched: false},
  { "src": "/img/ring-1.png", matched: false},
  { "src": "/img/shield-1.png", matched: false},
  { "src": "/img/sword-1.png", matched: false},
]

function App() {
  const [turns, setTurns] = useState(0)
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => { 
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - .5)
    .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne !== null && choiceTwo !== null) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCard => {
          return prevCard.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
      resetTurn()
      } else {
      setTimeout(() => resetTurn(), 1000
      )
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  } 

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
        <p>
          Turns: {turns}
        </p>
      </div>
    </div>
  );
}

export default App