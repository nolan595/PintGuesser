import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useStateContext } from '../contexts/ContextProvider';

import styles from '../styles/game.module.css';
import {FlipCard} from '../components';

function Game() {

  // Store the guess as an integer representing cents
  // eslint-disable-next-line 
  const [guessCents, setGuessCents] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showFront, setShowFront] = useState(true);
  const [guessMessage, setGuessMessage] = useState("");
  const [error, setError] = useState(false); // New state to track the error status
  const { pubData, setPubData } = useStateContext();
  const [buttonLabel, setButtonLabel] = useState("Submit");
  const {setIsAnswerCorrect} = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize Firestore and get a reference to the collection
        const db = getFirestore();
        const pubsCollectionRef = collection(db, 'images'); // Replace 'yourCollectionName' with your actual collection name
        const querySnapshot = await getDocs(pubsCollectionRef);

        // Create an array of docs
        const docsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Choose a random document
        const randomDoc = docsArray[Math.floor(Math.random() * docsArray.length)];

        // Set the global state
        setPubData(randomDoc);

        // Log the data
        console.log(randomDoc)
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();
  }, [setPubData]);

  const checkGuess = (guess, actualPrice) => {
    return Math.abs(guess - actualPrice) <= 10;
  };

  const loadNewPub = async () => {
        try {
          // Initialize Firestore and get a reference to the collection
          const db = getFirestore();
          const pubsCollectionRef = collection(db, 'images'); // Replace 'yourCollectionName' with your actual collection name
          const querySnapshot = await getDocs(pubsCollectionRef);
  
          // Create an array of docs
          const docsArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          // Choose a random document
          const randomDoc = docsArray[Math.floor(Math.random() * docsArray.length)];
  
          // Set the global state
          setPubData(randomDoc);
  
          // Log the data
          console.log(randomDoc)
        } catch (error) {
          console.error("Error fetching document: ", error);
        }
      
  
    
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const guessInCents = parseInt(inputValue.replace('.', ''), 10);
  
    if (inputValue.trim() === "" || isNaN(guessInCents)) {
      setGuessMessage("Enter a bleedin price");
      setError(true); // Keep the error for invalid or empty inputs
    } else {
      const actualPriceInCents = parseInt(pubData.price, 10);
      const isCorrectGuess = checkGuess(guessInCents, actualPriceInCents);
  
      // Here, you check if the guess is correct and set the isAnswerCorrect state accordingly
      if (isCorrectGuess) {
        setIsAnswerCorrect(true); // Set isAnswerCorrect to true in your context
        setGuessMessage("Correct! Next pub?");
        setShowFront(false);
        setButtonLabel("Next Pub");
      } else {
        setIsAnswerCorrect(false); // Set isAnswerCorrect to false in your context
        setGuessMessage("Try again!");
        setShowFront(false);
        setButtonLabel("Play Again");
      }
  
      console.log(isCorrectGuess ? "Correct guess" : "Wrong guess"); // Log the result
      setInputValue(""); // Reset the input field regardless of the guess correctness
    }
  };
  const handleGuessChange = (e) => {
    setError(false); // Reset error state when user modifies their guess
    let newValue = e.target.value.replace(/[^0-9]/g, '');
    newValue = parseInt(newValue, 10);

    if (isNaN(newValue)) {
      setInputValue("");
      setGuessCents(0);
    } else {
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
    }
  };

  const handleNextPub = (e) => {
    e.preventDefault();
    if (buttonLabel === "Next Pub") {
      loadNewPub(); // Load new pub data
    }
    setGuessCents(0);
    setGuessMessage("");
    setError(false);
    setShowFront(true);
    setButtonLabel("Submit");
  };

  const renderErrorMessage = () => {
    if (error) {
      // Display the appropriate message based on guess correctness
      return <p className={styles.errorMessage}>{guessMessage}</p>;
    }
    return null;
  };

  const formattedInputValue = `€${inputValue}`;

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.title}>Guess That Pint</h1>
      <div className={styles.pubDetails}>
      <p className={styles.pubName}>{pubData.barName || 'Grogans'}</p>
        <p className={styles.pubStreet}>{pubData.street || 'South William St'}</p>
      </div>
      <FlipCard showFront={showFront} toggleFlip={setShowFront} />
      <form onSubmit={buttonLabel === "Submit" ? handleSubmit : handleNextPub} className={styles.guessForm}>
        {renderErrorMessage()} {/* Error message above the input field */}
        <input
          type="tel"
          value={formattedInputValue}
          onChange={handleGuessChange}
          className={`${styles.guessInput} ${error ? styles.error : ''}`}
          placeholder="Enter your guess in €"
          disabled={buttonLabel !== "Submit"} // Disable input when showing result
        />
        <button type="submit" className={styles.submitButton}>{buttonLabel}</button>
      </form>


    </div>
  );
}

export default Game;