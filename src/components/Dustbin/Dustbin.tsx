import React from 'react'
import { DustbinProps } from './ComponentInterface'
import { useDrop } from 'react-dnd'
import { images } from '../../assets'
import styled, { keyframes } from 'styled-components'
import { fadeIn, headShake, tada } from 'react-animations'

const FadeIn = styled.div`animation: 0.3s ${keyframes`${fadeIn}`}`
const Tada = styled.div`animation: 1s ${keyframes`${tada}`}`
const HeadShake = styled.div`animation: 1s ${keyframes`${headShake}`}`

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

  const isCorrect = lastDroppedItem && (lastDroppedItem.uid === profile.uid)
  let dropState = 'profile-pic'
  if (canDrop) {
    dropState = 'profile-pic can-drop'
  }
  if (isOver) {
    dropState = 'profile-pic drop'
  }
  if (lastDroppedItem && isCorrect) {
    dropState = 'profile-pic correct'
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
          isCorrect ? ( 
            <>
              <div className='correct-overlay'>
                <Tada>
                  <div className='correct-name'>{profile.name}</div>
                </Tada>
              </div>
              <FadeIn>
                <span className='response'>CORRECT!</span>
              </FadeIn>
            </> ) 
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
