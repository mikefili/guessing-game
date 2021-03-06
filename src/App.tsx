import React from 'react'
import './styles/App.scss'
import { GameCard } from './components/GameCard'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import PlayersObj from './constants/gamePlayers.json'
import { Carousel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

// Method used to detect whether the app is being used
// on mobile or desktop based primarily on whether or not
// window.orientation exists, since it does not on
// desktops or laptops 
const isMobile = () => {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Initiate array of players
const playersArr: any[] = []

// Push player objects from JSON object or API data into
// our new players array
const players = () => Object.values(PlayersObj).map(player => {
  return playersArr.push({
    player
  })
})

const App = () => {
  players()
  return (
    <div className="App">
      <div className='jumbo-tron'>
        <h1>GUESS WHO?</h1>
        <p className='subtitle'>Get to know your classmates, co-workers, or friends!</p>
      </div>

      <DndProvider backend={isMobile() ? TouchBackend : Backend}>
        <Carousel
          interval={null}
          indicators={false}
          nextIcon={<FontAwesome name='chevron-right' />}
          prevIcon={<FontAwesome name='chevron-left' />}>
          {playersArr.map(() => {
            return (
              <Carousel.Item>
                <GameCard players={PlayersObj} />
              </Carousel.Item>
            )
          })}
        </Carousel>
      </DndProvider>
    </div>
  );
}

export default App;
