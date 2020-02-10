import React from 'react';
import { useDrag } from 'react-dnd';
import { images } from '../../assets';

export interface CardProps {
  name: string,
  type: string,
  profile: any
}

// Setup functional component with hook for dragging callback on selection
const Box: React.FC<CardProps> = ({ name, type, profile }) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, type, profile },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })
  return (
    <div className='profile-pic-container' ref={drag} style={{ opacity }}>
      <img 
        className='profile-pic' 
        alt=''
        src={profile.profilePicture ? 
          profile.profilePicture : 
          images.default_avatar} />
      <p className='profile-name'>
        {name}
      </p>
    </div>
  )
}
export default Box;