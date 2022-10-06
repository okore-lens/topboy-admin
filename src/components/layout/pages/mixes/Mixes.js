import axios from 'axios';
import React, { useState } from 'react';
import classes from './Mixes.module.css';

const Mixes = () => {
    const [mix, setMix] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const selectFileHandler = (event) => {
        setMix(event.target.files[0]);
    }

    const uploadMixHandler = async () => {
        if (!mix) {
            return;
        }
        const formData = new FormData();
        formData.append('mix', mix);
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:8000/store/mix/audio', formData, 
            { 
                headers: { 'Content-Type': 'multipart/form-data' } ,
                onUploadProgress: (progressEvent) => {
                    const theProgress = (progressEvent.loaded / progressEvent.total) * 100;
                    setProgress(Math.round(theProgress));
                }
            });
            console.log(response);
        } catch(err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className={classes.container}>
        <div className={classes.topContainer}>
            <input onChange={selectFileHandler} type='file'></input>
            <button onClick={uploadMixHandler}>Upload</button>
            {isLoading && <p>{progress}% uploaded</p>}
            {isLoading && <p>Loading...</p>}
        </div>
    </div>
  )
}

export default Mixes;