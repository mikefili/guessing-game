import React, { useState, useCallback } from 'react'
import { GameCardState, DustbinState, BoxState } from './ComponentInterface'
import '../../styles/GameContainer.scss'
import { Dustbin} from '../Dustbin'
import { Box } from '../Box'
import update from 'immutability-helper'

const GameCard: React.FC<GameCardState> = ({ players }) => {
  const boxesArr: any[] = []
  
  const GenerateOptions = () => Object.values(players).map(player => {
    boxesArr.push({
      name: player.fullName,
      uid: player.uid,
      profilePicture: player.profilePicture,
      type: 'any',
    })
    return boxesArr.sort(() => 0.5 - Math.random())
  })
  
  const GenerateAnswer = () => {
    GenerateOptions()
    let int = Math.ceil((Math.random() * 10) / 2)
    const answer = boxesArr.slice((int - 1), int)[0]
    return answer
  }
  
  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: ['any'], lastDroppedItem: null, profile: GenerateAnswer() }
  ])

  const [boxes] = useState<BoxState[]>(boxesArr.slice(0, 5))
  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

  const isDropped = (boxName: string) => {
    return droppedBoxNames.indexOf(boxName) > -1
  }

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
