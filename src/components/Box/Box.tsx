import React from 'react'
import { useDrag } from 'react-dnd'

export interface BoxProps {
  name: any
  type: any
  isDropped: boolean
}

const Box: React.FC<BoxProps> = ({ name, type, isDropped }) => {
  const [ , drag] = useDrag({
    item: { name, type }
  })

  return (
    <div ref={drag} className='box'>
      {isDropped ? <strong>{name}</strong> : name}
    </div>
  )
}

export default Box
