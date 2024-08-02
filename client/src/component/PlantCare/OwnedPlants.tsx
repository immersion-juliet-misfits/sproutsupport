import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OwnedPlants = () => {
  const [plants, setPlants] = useState([])
  
  const getPlants = () => {
    axios.get('/plants/all')
      .then(({data}) => {
        setPlants(data)
        console.log(data, 'here')
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
      <h1>Owned Plants</h1>
      {/* will eventually be used with cards... */}
      <Link to={'/plantfinder'}>
        <input type="button" value="Add a Plant"></input>
      </Link>
      {plants.length > 0 && 
        plants.map((plant) => (
          <h4>{plant.nickname}</h4>
        ))
      }
    </div>
  );
};

export default OwnedPlants;
