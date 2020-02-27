import React, { useState, useCallback } from 'react'
import { GameCardState, DustbinState, BoxState } from './ComponentInterface'
import '../../styles/GameContainer.scss'
import { Dustbin} from '../Dustbin'
import { Box } from '../Box'
import update from 'immutability-helper'

// GameCard functional component: The GameCard acts as a styled  
// container to hold each game gard. Users can carousel through
// all the game cards within the set provided in the JSON object
// or API data being consumed 
const GameCard: React.FC<GameCardState> = ({ players }) => {
  const boxesArr: any[] = []
  
  // Method used to push player objects from the JSON object or
  // API data into an array, in randomized order, for display on 
  // each game card
  const GenerateOptions = () => Object.values(players).map(player => {
    boxesArr.push({
      name: player.fullName,
      uid: player.uid,
      profilePicture: player.profilePicture,
      type: 'any',
    })
    return boxesArr.sort(() => 0.5 - Math.random())
  })
  
  // Method used to first generate the possible answers for each
  // game card, then determine the desired answer
  const GenerateAnswer = () => {
    GenerateOptions()
    let int = Math.ceil((Math.random() * 10) / 2)
    const answer = boxesArr.slice((int - 1), int)[0]
    return answer
  }
  
  // Setup hook using DustinState from our Component Interface
  // and determine desired answer for each game card
  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: ['any'], lastDroppedItem: null, profile: GenerateAnswer() }
  ])

  // Setup hook using BoxState from our Component Interface
  // and select five possible options for each card
  const [boxes] = useState<BoxState[]>(boxesArr.slice(0, 5))
  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

  // Method that accepts a Box name and confirms if it has yet
  // been dropped into the card's Dustbin
  const isDropped = (boxName: string) => {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  // Callback method used to pass off the data from the Box
  // being dropped to the Dustbin it's being dropped into
  const handleDrop = useCallback(
    (index: number, item: { name: string, uid: any, profilePicture: any }) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, dustbins],
  )

  return (
    <div>
      
      <div className='game-card'>

        <div>
          {dustbins.map(({ accepts, lastDroppedItem, profile }, index) => (
            <Dustbin
              accept={accepts}
              lastDroppedItem={lastDroppedItem}
              profile={profile}
              onDrop={item => handleDrop(index, item)}
              key={index}
            />
            ))}
        </div>

        <div className='player-names'>
          {boxes.map(({ name, type, uid, profilePicture }, index) => (
            <Box
              name={name}
              type={type}
              profilePicture={profilePicture}
              uid={uid}
              isDropped={isDropped(name)}
              key={index}
            />
          ))}
        </div>

      </div>

    </div>
  )
}

export default GameCard
