import React, { useState, useCallback } from 'react'
import '../../styles/GameContainer.scss'
import { Dustbin} from '../Dustbin'
import { Box } from '../Box'
import update from 'immutability-helper'
import { Container } from 'react-bootstrap'
import PlayersObj from '../../constants/gamePlayers.json'

interface DustbinState {
  accepts: string[]
  lastDroppedItem: any
}

interface BoxState {
  name: string
  type: string
}

export interface DustbinSpec {
  accepts: string[]
  lastDroppedItem: any
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
  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: ['any'], lastDroppedItem: null },
  ])

  const boxesArr: any[] = []

  const Players = () => Object.values(PlayersObj).map(player => {
    boxesArr.push({
      name: formatName(player.fullName),
      type: 'any'
    })
    return boxesArr.sort(() => 0.5 - Math.random())
  })

  Players()

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
    <Container>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
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
    </Container>
  )
}

export default GameContainer
