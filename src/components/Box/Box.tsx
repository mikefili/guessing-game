import React from 'react'
import { useDrag } from 'react-dnd'

export interface BoxProps {
  name: any
  type: any
  isDropped: boolean
}

const Box: React.FC<BoxProps> = ({ name, type, isDropped }) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  return (
    <div ref={drag} className='box'>
      {isDropped ? <s>{name}</s> : name}
    </div>
  )
}

export default Box
