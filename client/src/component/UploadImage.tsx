import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [image, setImage] = useState(null)
  const [signedUrl, setSignedUrl] = useState(null)

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setImage(e.currentTarget.value);
    setImage(e.target.files[0]) // prob want entire obj
  };

  const handleUploadFile = () => {
    if (!image) {
      console.info('No image selected')
    }

    axios.get('/upload/url', { params: {filename: image.name}})
      .then(({data}) => {
        return axios.put(data, image, {
          headers: {'Content-Type': image.type}
        })
      })
      .then(() => {
        setSignedUrl(`https://sprout-support.s3.amazonaws.com/${image.name}`)
      })
      .catch((err) => {
        console.error('Failed to get image url', err)
      })
  }

  return (
    <div>
      <h1>Upload Img</h1>
      <input type="file" onChange={handleChooseFile}></input>
      <input type="button" onClick={handleUploadFile} value="Submit"></input>
      {image && <img src={signedUrl}></img>}
    </div>
  )
}

export default UploadImage;