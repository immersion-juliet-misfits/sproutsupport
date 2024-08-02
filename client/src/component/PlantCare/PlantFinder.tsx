import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Plant = {
    CommonName: string;
    ScientificName: string;
    Id: number;
}

const PlantFinder = ({ user }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState<Plant | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);


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

  const handleNicknameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  const handleBio = (e: React.FormEvent<HTMLInputElement>) => {
    setBio(e.currentTarget.value);
  };

  const handleNicknameSubmit = () => {
    const ScientificName = selected.ScientificName.replace(/<[^>]*>/g, '').split(' ').slice(0, 2).join(' ');
    const { CommonName, Id } = selected;
    axios.post('/plants/newPlant', {nickname, bio, ScientificName, CommonName, Id, userId: user.id })
    .then((data) => {
      console.log(data)
    })    
  }
  
  const handleTaskName = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  };

  const handleAddTask = () => {
    setTasks([...tasks, taskName]);
    setTaskName('');
  }

//   const handleAddPlant() {
//     axios.
//   }

  useEffect(() => {
    console.log('test', selected)
    console.log('takss', tasks, taskName, 'taskname')
  }, [selected, tasks, taskName])

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
          <input type="text" placeholder={selected.CommonName} onChange={(e) => handleNicknameChange(e)}></input><br></br>
          <input type="text" placeholder="Bio :P(you get it?)" onChange={(e) => handleBio(e)}></input><br></br>

          <input type="text" placeholder="Task" value={taskName} onChange={(e) => handleTaskName(e)}></input><br></br>
          {tasks.length > 0 &&
            tasks.map((task) => (
              <h4>{task}</h4>
            ))
          }
          <input type="button" value="Add Task" onClick={() => handleAddTask()}></input>
          <input type="button" value="Search" onClick={() => handleNicknameSubmit()}></input>
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
