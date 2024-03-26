import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebase';
import styles from '../styles/uploadForm.module.css';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [barName, setBarName] = useState('');
  const [street, setStreet] = useState('');
  const [price, setPrice] = useState('');
  const [priceCents, setPriceCents] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePriceChange = (e) => {
    let newValue = e.target.value.replace(/[^0-9]/g, '');
    newValue = parseInt(newValue, 10);
    
    if (isNaN(newValue)) {
      setPrice('');
      setPriceCents(0);
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

    setPrice(newValue);
    setPriceCents(parseInt(newValue.replace('.', ''), 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const fileRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, 'images'), {
      photoURL,
      barName,
      street,
      price: priceCents // Assuming you want to store the price in cents in the database
    });

    setBarName('');
    setStreet('');
    setPrice('');
    setPriceCents(0);
    setFile(null);
    setLoading(false);
  };

  const formattedPriceValue = `€${price}`;

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input type="file" onChange={handleFileChange} className={styles.formInput} />
      <input type="text" value={barName} onChange={(e) => setBarName(e.target.value)} placeholder="Bar Name" className={styles.formInput} />
      <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street" maxLength="25" className={styles.formInput} />
      <input type="tel" value={formattedPriceValue} onChange={handlePriceChange} placeholder="Price in €" className={styles.formInput} />
      <button type="submit" disabled={loading} className={styles.formButton}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}

export default UploadForm;
