import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Input } from '@chakra-ui/react';

const PlantImgUpload = ({handleUploadFile, handleChooseFile}) => {
//   const [image, setImage] = useState(null)
//   const [imageUrl, setImageUrl] = useState('')

//   const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // setImage(e.currentTarget.value);
//     setImage(e.target.files[0]) // prob want entire obj
//   };

//   const handleUploadFile = () => {
//     if (!image) {
//       console.info('No image selected')
//     }

//     axios.get('/upload/url', { params: {filename: image.name}})
//       .then(({data}) => {
//         return axios.put(data, image, {
//           headers: {'Content-Type': image.type}
//         })
//       })
//       .then(() => {
//         setImageUrl(`https://ssupportbucket.s3.amazonaws.com/${image.name}`)
//       })
//       .catch((err) => {
//         console.error('Failed to get image url', err)
//       })
//   }

  return (
    <Box flexDirection="row" display="flex" justifyContent={"center"} alignItems="center">
      <Input type="file" onChange={handleChooseFile}></Input>
      <Button onClick={handleUploadFile} bgColor="#d5e8ce" color="#4AAD52" value="Confirm Image" w="100%">Confirm Image</Button>
      {/* {image && <img src={imageUrl}></img>} */}
    </Box>
  )
}

export default PlantImgUpload;