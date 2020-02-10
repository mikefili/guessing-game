import React from 'react'
import { useDrop } from 'react-dnd'
import { images } from '../../assets'

export interface DropzoneProps {
  accept: any,
  lastDroppedItem: any,
  onDrop: (item: any) => void
}

const Dropzone: React.FC<DropzoneProps> = ({ accept, lastDroppedItem, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  // change class to alter styles depending on dropzone state
  let dropState = 'profile-pic'
  if (canDrop) {
    dropState = 'profile-pic can-drop'
  }
  if (isOver) {
    dropState = 'profile-pic drop'
  }
  return (
    <div className='dropzone' ref={drop}>
      <div className='profile-pic-container'>
        <img 
          className={dropState}
          alt='Drop teammate here!'
          title='Drop teammate here!'
          src={lastDroppedItem ? lastDroppedItem.profile.profilePicture : images.default_avatar} />            
      </div>
      <p className='profile-name'>
        {lastDroppedItem && lastDroppedItem.name}
      </p>
    </div>
  )
}
export default Dropzone;