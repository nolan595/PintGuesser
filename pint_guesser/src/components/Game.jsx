import React, { useState } from 'react';

import styles from '../styles/game.module.css';
import {FlipCard} from '../components';

function Game() {

  // Store the guess as an integer representing cents
  // eslint-disable-next-line 
  const [guessCents, setGuessCents] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showFront, setShowFront] = useState(true);
  const [error, setError] = useState(false); // New state to track the error status



  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "" || guessCents === 0) {
      setError(true); // Set error state to true if no price is entered
    } else {
      setError(false); // Clear error if the form is being submitted correctly
      setShowFront((prev) => !prev); // Toggle the flip state instead of showing an alert
      setGuessCents(0);
      setInputValue(""); // Clear the input value
    }
  };
  const handleGuessChange = (e) => {
    setError(false); // Clear error when the user starts typing
    let newValue = e.target.value.replace(/[^0-9]/g, '');
    newValue = parseInt(newValue, 10);

    if (isNaN(newValue)) {
      setInputValue("");
      setGuessCents(0);
      return;
    }

    newValue = newValue.toString();

    if (newValue.length === 1) {
      newValue = `0.0${newValue}`;
    } else if (newValue.length === 2) {
      newValue = `0.${newValue}`;
    } else {
      newValue = `${newValue.slice(0, -2)}.${newValue.slice(-2)}`;
    }

    setInputValue(newValue);
    setGuessCents(parseInt(newValue.replace('.', ''), 10));
  };

  const formattedInputValue = `€${inputValue}`;

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.title}>Guess That Pint</h1>
      <div className={styles.pubDetails}>
        <p className={styles.pubName}>Grogans</p>
        <p className={styles.pubStreet}>South William St</p>
      </div>
      <FlipCard showFront={showFront} toggleFlip={setShowFront} />
      <form onSubmit={handleSubmit} className={styles.guessForm}>
        <input
          type="tel"
          value={formattedInputValue}
          onChange={handleGuessChange}
          className={`${styles.guessInput} ${error ? styles.error : ''}`} // Apply error styling if error state is true
          placeholder="Enter your guess in €"
        />
        {/* Error message removed */}
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}

export default Game;