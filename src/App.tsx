import React from 'react'
import './styles/App.scss'
import { GameContainer } from './components/GameContainer'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'

const isMobile = () => {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

const App = () => {
  return (
    <div className="App">
      <DndProvider backend={isMobile() ? TouchBackend : Backend}>
        <GameContainer />
      </DndProvider>
    </div>
  );
}

export default App;
