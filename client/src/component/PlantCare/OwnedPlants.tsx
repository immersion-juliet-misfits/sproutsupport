import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OwnedPlants = () => {
  return (
    <div>
      <h1>Owned Plants</h1>
      {/* will eventually be used with cards... */}
      <Link to={'/plantfinder'}>
        <input type="button" value="Add a Plant"></input>
      </Link>
    </div>
  );
};

export default OwnedPlants;
