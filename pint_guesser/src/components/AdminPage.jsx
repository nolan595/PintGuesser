// AdminPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path as necessary
import {LoginForm} from './' // Adjust the path as necessary
// import {styles} from '../styles/adminPage.module.css'
function AdminPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (!user) {
    // The onClose method could navigate to the admin page again or just close the popup
    return <LoginForm onClose={() => navigate('/admin')} />;
  }

  return (
    <div>
      <p>Welcome to the Admin Panel!</p>
      {/* Admin panel content */}
    </div>
  );
}

export default AdminPage;
