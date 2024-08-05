import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantSnippet from './PlantSnippet';
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

  useEffect(() => {
    getPlants();
  }, [])

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
          <PlantSnippet plant={plant}/>
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
