import React, { useState } from 'react';
import { auth } from '../firebase'; // Adjust this path to where your firebase.js is located
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../styles/loginForm.module.css'; // Import the CSS module

function LoginForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); // Assuming you pass a function to close the popup on successful login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={styles.formInput}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.formInput}
        />
        <button type="submit" className={styles.formButton}>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
