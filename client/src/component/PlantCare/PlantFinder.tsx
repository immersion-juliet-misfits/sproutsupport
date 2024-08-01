import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Plant = {
    CommonName: string;
    ScientificName: string;
}

const PlantFinder = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState<Plant | null>(null);
  const [nickname, setNickname] = useState<string>('');
  // const [bio, setBio] = useState<string>('');

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setInput(e.currentTarget.value);
  };

  const handleSubmit = () => {
    axios.post('/plants/search', {query: input})
      .then(({data}) => {
        console.log(data)
        setResults(data)
      })
      .catch((err) => {
        console.log('No results found.', err)
      })
  }

  const handlePlantSelect = (selected: Plant) => {
    console.log(selected);
    setSelected(selected);
    setNickname(selected.CommonName)
  };

//   const handleAddPlant() {
//     axios.
//   }

  useEffect(() => {
    console.log('test', selected)
    console.log('test', nickname)
  }, [selected])

  return (
    <div>
      <h1>Plant Finder</h1>
      <h3>{`Searched: ${input}`}</h3>
      {/* will eventually be used with cards... */}
      <input
        type="text"
        placeholder="Plant name"
        onChange={(e) => handleInput(e)}
      ></input>
      <input type="button" value="Search" onClick={() => handleSubmit()}></input><br></br>
      {selected && selected.CommonName &&
        <div>
          <h3>Choose a name for your plant (optional)</h3>
          <input type="text" placeholder={selected.CommonName}></input><br></br>
          <input type="text" placeholder="Bio :P(you get it?)"></input>
        </div>
      }
      {results &&
        results.map((result, i) => {
            // look into simplifying this later
            const scientificName = result.ScientificName.replace(/<[^>]*>/g, '').split(' ').slice(0, 2).join(' ');
        //   needs nicer looking display or possibly separate component
        return (

        <div key={`${result}-${i}`}>
          <h3 onClick={() => handlePlantSelect(result)}>{result.CommonName}</h3>
          <h5>{scientificName}</h5>
          {/* look for API image data */}
          {/* <img src={result.ProfileImageFilename}></img> */}
        </div>
        )
})
      }
    </div>
  );
};

export default PlantFinder;