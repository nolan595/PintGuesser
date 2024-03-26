import React, { useState } from 'react';
import { Game } from '../components'; // Ensure this path is correct
import styles from '../styles/mainPage.module.css'
 
function MainPage() {
  const [showGame, setShowGame] = useState(false);

  const handlePlayNowClick = () => {
    setShowGame(true);
  };

  return (
    <div className={styles.mainPage}>
      <header className="">
        {showGame ? (
          <Game />
        ) : (
          <>
          <button onClick={handlePlayNowClick} className={styles.playNowButton}>Play Now</button>
            
          </>
        )}
      </header>
    </div>
  );
}

export default MainPage;
