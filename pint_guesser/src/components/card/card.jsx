import React from 'react'
import './card.css'
import './flip-transition.css'
import tayto from '../../images/tayto.png'
import {motion} from 'framer-motion'
import { useStateContext } from '../../contexts/ContextProvider';

function Card() {
    const correctVariant = {
        hidden: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
      };
      
      const wrongVariant = {
        hidden: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
      };
    const { pubData, isAnswerCorrect } = useStateContext();
    const backgroundImageUrl = pubData.photoURL;

    return (
        <div className='card'>
            <div className='card-back' style={{ backgroundImage: `url(${tayto})` }}>
                <div className='stat-container'>
                    {isAnswerCorrect === true ? "That's Pure Cream" : isAnswerCorrect === false ? "You are some Tic" : "Guess the price!"}
                </div>
                {isAnswerCorrect === true ? (
        <motion.div
            variants={correctVariant}
            initial="hidden"
            animate="visible"
        >
            ✅
        </motion.div>
    ) : isAnswerCorrect === false ? (
        <motion.div
            variants={wrongVariant}
            initial="hidden"
            animate="visible"
        >
            ❌
        </motion.div>
    ) : (
        "Guess the price!"
    )}
            </div>
            <div className='card-front' style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
                {/* Additional content can be placed here if needed */}
            </div>
        </div>
    );
}

export default Card;
