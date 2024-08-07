import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading } from '@chakra-ui/react'
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { bucketName } from '../../../server/s3';

const UploadImage = () => {
  const [image, setImage] = useState(null)
  const [signedUrl, setSignedUrl] = useState(null)

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setImage(e.currentTarget.value);
    console.log(e.target.files[0].name)
    setImage(e.target.files[0]) // prob want entire obj
    console.log(image)
  };

  const handleUploadFile = () => {
    if (!image) {
      console.log('no image')
    }
    axios.get('/upload/url', { params: {filename: image.name}})
      .then((data) => {
        
        console.log('sum working', data)
        let test = data.data
        return axios.put(test, image, {
          headers: {'Content-Type': image.type}
        })
        // setSignedUrl(data)
      })
      .then(() => {
        setSignedUrl(`https://ssupportbucket.s3.amazonaws.com/${image.name}`)
      })
      .catch((err) => {
        console.error(err)
      })
  }


  useEffect(() => {
    console.log('image', image)
  }, [image])

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