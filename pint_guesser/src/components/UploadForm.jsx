import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebase'; // Adjust your path as needed
import styles from '../styles/uploadForm.module.css'; // Import your CSS module

function UploadForm() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const fileRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, 'images'), {
      description,
      photoURL
    });

    setDescription('');
    setFile(null);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="file"
        onChange={handleFileChange}
        className={styles.formInput}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description"
        className={styles.formInput}
      />
      <button type="submit" disabled={loading} className={styles.formButton}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}

export default UploadForm;
