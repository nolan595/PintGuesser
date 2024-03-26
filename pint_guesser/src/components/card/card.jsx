import {React, useEffect, useState} from 'react'
import './card.css'
import './flip-transition.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import tayto from '../../images/tayto.png'

function Card({ onClick }) {
    // eslint-disable-next-line 
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            const imagesCol = collection(db, 'images');
            const imageSnapshot = await getDocs(imagesCol);
            const imageList = imageSnapshot.docs.map(doc => doc.data().photoURL);
            setImages(imageList);
            setCurrentImage(imageList[Math.floor(Math.random() * imageList.length)]);
        };
    
        fetchImages();
    }, []);

    return (
        <div className='card' onClick={onClick}>
            <div className='card-back' style={{backgroundImage: `url(${tayto})`}}>
            <div className='stat-container'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque nemo animi quod molestiae, earum id obcaecati dolorem veritatis velit accusantium commodi, quo, eveniet fugiat cumque labore doloribus. Voluptatibus, molestiae vero!</div>
            </div>
            <div className='card-front' style={{ backgroundImage: `url(${currentImage})` }}>
                {/* You can place additional content here if needed */}
            </div>
        </div>
    );
}


export default Card