import React from 'react'
import { BoxProps } from './ComponentInterface'
import { useDrag } from 'react-dnd'

// Box component: Boxes act as "name cards," which users 
// can then drop into a dustbin
const Box: React.FC<BoxProps> = ({ 
  name, 
  type, 
  uid, 
  profilePicture, 
  isDropped 
}) => {
  // Setup useDrag hook with a drag callback, allowing users
  // to hand off box data as an object called "item"
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
