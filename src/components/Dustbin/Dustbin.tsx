import React from 'react'
import { useDrop } from 'react-dnd'
import { images } from '../../assets'
import styled, { keyframes } from 'styled-components'
import { fadeIn, headShake } from 'react-animations'

const FadeIn = styled.div`animation: 0.3s ${keyframes`${fadeIn}`}`
const HeadShake = styled.div`animation: 1s ${keyframes`${headShake}`}`

export interface DustbinProps {
  accept: string[]
  lastDroppedItem?: any
  profile: any
  onDrop: (item: any) => void
}

const Dustbin: React.FC<DustbinProps> = ({
  accept,
  lastDroppedItem,
  profile,
  onDrop,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  let dropState = 'profile-pic'
  if (canDrop) {
    dropState = 'profile-pic can-drop'
  }
  if (isOver) {
    dropState = 'profile-pic drop'
  }

  return (
    <>
      <div ref={drop} className='dustbin'>
        <img 
          className={dropState}
          alt='Drop teammate here!'
          title='Drop teammate here!'
          src={profile ? profile.profilePicture : images.default_avatar} /> 
        {lastDroppedItem && (
          lastDroppedItem.name === profile.fullName ? ( 
            <FadeIn>
              <span className='response'>CORRECT!</span>
            </FadeIn> ) 
            : ( 
            <HeadShake>
              <span className='response false'>SORRY!</span>
            </HeadShake>
          )
        )}
      </div>
    </>
  )
}

export default Dustbin
