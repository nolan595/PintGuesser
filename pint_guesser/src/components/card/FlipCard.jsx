import React from 'react'
import './flipCard.css'
import {Card} from '..'
import {CSSTransition} from 'react-transition-group';

function FlipCard({ showFront, toggleFlip }) {
  return (
    <div className='flippable-card-container'>
        <CSSTransition
        in={showFront}
        timeout={300}
        classNames='flip'
        >
          <Card onClick={() => toggleFlip((v) => !v)} />
        </CSSTransition>
    </div>
  )
}

export default FlipCard