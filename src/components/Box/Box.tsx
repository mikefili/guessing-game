import React from 'react'
import { BoxProps } from './ComponentInterface'
import { useDrag } from 'react-dnd'

const Box: React.FC<BoxProps> = ({ name, type, uid, profilePicture, isDropped }) => {
  const [ , drag] = useDrag({
    item: { name, type, uid, profilePicture }
  })

  return (
    <div ref={drag} className='box'>
      {isDropped ? <s>{name}</s> : name}
    </div>
  )
}

export default Box
