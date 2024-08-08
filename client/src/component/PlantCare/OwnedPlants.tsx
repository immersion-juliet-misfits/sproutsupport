import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantSnippet from './PlantSnippet';
// import UploadImage from '../UploadImage';
const OwnedPlants = ({ user }) => {
  const [plants, setPlants] = useState([])

  const getPlants = () => {
    axios.get(`/plants/all/${user.id}`)
      .then(({data}) => {
        setPlants(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handlePlantClick = (plant) => {
    console.log('selected plant', plant)
    // setSelected(selected);
  };

  // const handleDelete = () => {
  //   // let plantName = plant.
  //   axios.delete(`/plants/delete/${plant.id}`)
  //     .then(() => {
  //       console.info('Plant deleted')
  //     })
  //     .then(() => {
  //       getPlants()
  //     })
  // }

  useEffect(() => {
    getPlants();
  }, [getPlants]) // stale reference || made everytime reran

  return (
    <div>
      <Heading>{`${user.userName}'s Owned Plants`}</Heading>
      {/* will eventually be used with cards... */}
      <Link to={'/plantfinder'}>
        <input type="button" value="Add a Plant"></input>
      </Link>
      {/* make into seperate component */}
      {plants.length > 0 &&
        plants.map((plant) => (
          <PlantSnippet key={plant.id} plant={plant} getPlants={getPlants} handlePlantClick={handlePlantClick}/>
          // <Card>
          //   <CardHeader>
          //     <Heading size='md'>{plant.nickname}</Heading>
          //     {plant.nickname !== plant.commonName && <h3>{<strong>{plant.commonName}</strong>}</h3>}
          //     {/* <h4>{plant.CommonName}</h4> */}
          //   </CardHeader>
          //   <CardBody>
          //     <h3>{plant.description}</h3>
          //   </CardBody>
          // </Card>
        ))
      }
    </div>
  );
};

export default OwnedPlants;
