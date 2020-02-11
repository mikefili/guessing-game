import React from 'react'
import './styles/App.css'
import { GameContainer } from './components/GameContainer'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const App = () => {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <GameContainer />
      </DndProvider>
    </div>
  );
}

export default App;
