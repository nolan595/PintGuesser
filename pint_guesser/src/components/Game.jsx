import React, { useState } from 'react';

import styles from '../styles/game.module.css';
import {FlipCard} from '../components';

function Game() {

  // Store the guess as an integer representing cents
  // eslint-disable-next-line 
  const [guessCents, setGuessCents] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showFront, setShowFront] = useState(true);


  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFront((prev) => !prev); // Toggle the flip state instead of showing an alert
    setGuessCents(0);
  };
  const handleGuessChange = (e) => {
    // Extract last entered value by the user
    let newValue = e.target.value.replace(/[^0-9]/g, ''); // Keep only digits
    
    // Ensure the newValue is treated as a number for further operations
    newValue = parseInt(newValue, 10);
  
    // Check if newValue is NaN (in case of empty input) and reset if necessary
    if (isNaN(newValue)) {
      setInputValue("");
      setGuessCents(0);
      return; // Exit early if newValue is not a valid number
    }
  
    // Convert newValue back to string for consistent manipulation
    newValue = newValue.toString();
  
    // Format the newValue as a string representing euros and cents
    if (newValue.length === 1) {
      newValue = `0.0${newValue}`;
    } else if (newValue.length === 2) {
      newValue = `0.${newValue}`;
    } else {
      newValue = `${newValue.slice(0, -2)}.${newValue.slice(-2)}`;
    }
  
    setInputValue(newValue); // Update the display value
    setGuessCents(parseInt(newValue.replace('.', ''), 10)); // Update cents value
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
          className={styles.guessInput}
          placeholder="Enter your guess in €"
        />
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}

export default Game;