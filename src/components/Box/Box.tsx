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
    <div ref={drag} className={isDropped ? 'dropped-box' : 'box'}>
      {name}
    </div>
  )
}

export default Box
