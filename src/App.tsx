import React from 'react'
import './styles/App.scss'
import { GameCard } from './components/GameCard'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import PlayersObj from './constants/gamePlayers.json'

const isMobile = () => {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

const playersArr: any[] = []

const players = () => Object.values(PlayersObj).map(player => {
  return playersArr.push({
    player
  })
})

const App = () => {
  players()
  return (
    <div className="App">
      <div className='jumbotron'>
        <h1>GUESS WHO?</h1>
        <p>Get to know your co-workers!</p>
      </div>
      <DndProvider backend={isMobile() ? TouchBackend : Backend}>
        {playersArr.map(() => {
          return <GameCard players={PlayersObj} />
        })}
      </DndProvider>
    </div>
  );
}

export default App;
