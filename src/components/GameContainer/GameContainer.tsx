import React, { useState, useCallback } from 'react'
import '../../styles/GameContainer.scss'
import { Dustbin} from '../Dustbin'
import { Box } from '../Box'
import update from 'immutability-helper'
import { Jumbotron } from 'react-bootstrap'
import PlayersObj from '../../constants/gamePlayers.json'

interface DustbinState {
  accepts: string[]
  lastDroppedItem: any
  profile: any
}

interface BoxState {
  name: string
  type: string
}

export interface DustbinSpec {
  accepts: string[]
  lastDroppedItem: any
  profile: any
}
export interface BoxSpec {
  name: string
  type: string
}
export interface GameContainerState {
  droppedBoxNames: string[]
  dustbins: DustbinSpec[]
  boxes: BoxSpec[]
}

const formatName = (fullName: string) => {
  let splitName = fullName.split(' ');
  let initials = `${splitName[0]} ${(splitName[1].match(/\b\w/g) || [])}.`;
  return initials;
}

const GameContainer: React.FC = () => {
  const boxesArr: any[] = []
  let dustbin: any = null
  
  const GenerateAnswer = (obj: any) => {
    let keys = Object.keys(obj)
    const answer = (obj[keys[keys.length * Math.random() << 0]])
    console.log('answer', answer)
    return answer
  }
  
  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: ['any'], lastDroppedItem: null, profile: GenerateAnswer(PlayersObj) },
  ])

  const GenerateOptions = () => Object.values(PlayersObj).map(player => {
    boxesArr.push({
      name: formatName(player.fullName),
      type: 'any'
    })
    return boxesArr.sort(() => 0.5 - Math.random())
  })

  GenerateOptions()

  const [boxes] = useState<BoxState[]>(boxesArr)

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      console.log('dustbins ', dustbins)
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

      <Jumbotron>
        <h1>GUESS WHO?</h1>
      </Jumbotron>

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

        <div className='playerNames'>
          {boxes.map(({ name, type }, index) => (
            <Box
              name={name}
              type={type}
              isDropped={isDropped(name)}
              key={index}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default GameContainer
