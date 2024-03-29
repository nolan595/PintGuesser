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
      const formatPrice = (PriceInCents) => {
        const euros = (PriceInCents / 100).toFixed(2);
        return `€${euros}`;
 
      }


    const { pubData, isAnswerCorrect, score } = useStateContext();
    const backgroundImageUrl = pubData.photoURL;
    const formattedPrice = formatPrice(pubData.price)

    return (
        <div className='card'>
<div className='card-back' style={{ backgroundImage: `url(${tayto})` }}>            <div className='stat-container'>
              <div className="guess-result">
                {isAnswerCorrect ? "That's Pure Cream" : 
                isAnswerCorrect === false ? "You are some Tic" : "Guess the price!"}
              </div>
              <div className="price-info">
                {`A pint in ${pubData.barName} will cost you ${formattedPrice}`}
              </div>
            </div>
            <motion.div
              className="feedback-icon"
              variants={isAnswerCorrect ? correctVariant : wrongVariant}
              initial="hidden"
              animate="visible"
            >
              {isAnswerCorrect !== null && (isAnswerCorrect ? "✅" : "❌")}
            </motion.div>
            <div className="score-container">
              <span className="pint-icon">🍺</span> Score: {score}
            </div>
          </div>
          <div className='card-front' style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            {/* Additional content can be placed here if needed */}
          </div>
        </div>
      );
}

export default Card;
