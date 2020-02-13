import React from 'react'
import { useDrag } from 'react-dnd'

export interface BoxProps {
  name: any
  type: any
  uid?: any
  profilePicture: any
  isDropped: boolean
}

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
