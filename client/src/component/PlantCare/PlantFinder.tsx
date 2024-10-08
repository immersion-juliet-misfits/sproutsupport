import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Heading, Select, FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Button, Grid, GridItem} from '@chakra-ui/react'
import axios from 'axios';
import PlantImgUpload from './PlantImgUpload';
import TopBar from '../UserProfile/TopBar';

type Plant = {
    CommonName: string;
    ScientificName: string;
    Id: number;
}

const PlantFinder = ({ user, BUCKET_NAME }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState<Plant | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [taskName, setTaskName] = useState('');
  const [freq, setFreq] = useState('');
  const [tasks, setTasks] = useState([]);
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)



  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFreq(e.currentTarget.value);
  };

  const handleSubmit = () => {
    axios.post('/plants/search', {query: input})
      .then(({data}) => {
        setResults(data)
      })
      .catch((err) => {
        console.error('No results found.', err)
      })
  }

  const handlePlantSelect = (selected: Plant) => {
    setSelected(selected);
    setNickname(selected.CommonName)
  };

  const handleNicknameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  const handleBio = (e: React.FormEvent<HTMLInputElement>) => {
    setBio(e.currentTarget.value);
  };

  const handleTaskName = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  };

  const handleAddTask = () => {
    setTasks([...tasks, taskName]);
    // axios.put(`/plants/task/${data.id}`, { tasks })
    // .then((result) => {
    //   console.log(result, 'resstdshtdrjdjyfc')
    // })
    setTaskName('');
  }

  const handleNicknameSubmit = () => {
    const ScientificName = selected.ScientificName.replace(/<[^>]*>/g, '').split(' ').slice(0, 2).join(' ');
    const { CommonName, Id } = selected;
    axios.post('/plants/newPlant', {nickname, bio, ScientificName, CommonName, Id, userId: user.id, imageUrl })
    .then(({data}) => {
      axios.put(`/plants/task/${data.id}`, { tasks, freq })
        .then((result) => {
        })
    })
  }

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setImage(e.currentTarget.value);
    setImage(e.target.files[0]) // prob want entire obj
  };


  const handleUploadFile = () => {

    axios.get('/upload/url', { params: {filename: image.name}})
      .then(({data}) => {
        return axios.put(data, image, {
          headers: {'Content-Type': image.type}
        })
      })
      .then(() => {
        setImageUrl(`https://${BUCKET_NAME}.s3.amazonaws.com/${image.name}`)
      })
      .catch((err) => {
        console.error('Failed to get image url', err)
      })
  }


//   const handleAddPlant() {
//     axios.
//   }

  useEffect(() => {
  }, [selected, tasks, taskName])

  return (
    // <Box mx="auto" color='green.500' p={5}>
    <Box mx="auto" w='1100px'color='green.500' p={7}>
      <TopBar />
      <Heading textAlign={'center'}>Plant Finder</Heading>
      <Link to={'/myplants'}>
        <Button colorScheme="green" value="My Plants">My Plants</Button>
      </Link>
      <FormControl>
      {/* <FormLabel>{`Search ${input}`}</FormLabel> */}
      {/* will eventually be used with cards... */}
      <br></br>
      <Input
        type="text"
        placeholder="Plant name"
        onChange={(e) => handleInput(e)}
        bgColor='green.100'
        textColor="green.900"
        width='auto'
        ></Input>
      <Button onClick={() => handleSubmit()}>Search</Button><br></br>
      </FormControl>

      <Grid templateColumns="2fr 2fr" gap={4}>
      <GridItem>
        {/* <VStack align="start" spacing={4}> */}

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
    {/* </VStack> */}
    </GridItem>


        <GridItem>
      {selected && selected.CommonName &&
        <Box bg="green.700" p={7}>
          <Box bg="green.200">
          <FormControl>
          <FormLabel>Choose a name for your plant (optional)</FormLabel>
          <Input type="text" placeholder={selected.CommonName} onChange={(e) => handleNicknameChange(e)} bgColor='green.100' textColor="green.900"></Input><br></br>
          <FormLabel>Choose a bio for your plant</FormLabel>
          <Input type="text" placeholder="Bio :P(you get it?)" onChange={(e) => handleBio(e)} bgColor='green.100' textColor="green.900"></Input><br></br>
          <FormLabel>Choose a frequency for task</FormLabel>
          <Select placeholder="Select frequency" onChange={(e) => handleFrequencyChange(e)}>
            <option>second</option>
            <option>minute</option>
            <option>hour</option>
          </Select>
          <Input type="text" placeholder="Task" value={taskName} onChange={(e) => handleTaskName(e)} bgColor='green.100' textColor="green.900"></Input><br></br>
          <Button onClick={() => handleAddTask()} color="green">Add Task</Button>
          {tasks.length > 0 && <FormLabel>Tasks</FormLabel>}
          {tasks.length > 0 &&
            tasks.map((task, i) => (
              <h4 key={`${task}-${i}`}>{task}</h4>
            ))
          }
          {imageUrl && <img width={250} height={250} src={imageUrl}></img>}
          <PlantImgUpload handleUploadFile={() => handleUploadFile()} handleChooseFile={(e) => handleChooseFile(e)}/>
            <Link to="/myplants">
          <Button onClick={() => handleNicknameSubmit()} bgColor={"green.400"}>Add New Plant</Button>
            </Link>
          </FormControl>
          </Box>
        </Box>
      }
      </GridItem>
    </Grid>
    </Box>
  );
};

export default PlantFinder;
