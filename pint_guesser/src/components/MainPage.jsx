import React from 'react'
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="App">
    <header className="App-header">
      <p>Welcome to the main page!</p>
      <Link to="/admin" className="App-link">Go to Admin Panel</Link>
    </header>
  </div>
  )
}

export default MainPage