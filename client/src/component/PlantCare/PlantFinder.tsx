import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Heading, Select, FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Button, Grid, GridItem, InputGroup, InputLeftElement, Text} from '@chakra-ui/react'
import axios from 'axios';
import PlantImgUpload from './PlantImgUpload';
import TopBar from '../UserProfile/TopBar';
import { SearchIcon } from '@chakra-ui/icons';

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
  const [searching, setSearching] = useState(false)
  const [missingTask, setMissingTask] = useState(true)



  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFreq(e.currentTarget.value);
  };

  const handleSubmit = () => {
    setSearching(true)
    axios.post('/plants/search', {query: input})
      .then(({data}) => {
        setResults(data)
        setSearching(false)
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
    setMissingTask(false)
  }

  const handleNicknameSubmit = () => {
    const ScientificName = selected.ScientificName.replace(/<[^>]*>/g, '').split(' ').slice(0, 2).join(' ');
    const { CommonName, Id } = selected;

    if (tasks.length === 0) {
      setMissingTask(true);
      return;
    }

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
    <Box mx="auto" w='1100px'>
      <TopBar />

    <Box>
      <Link to={'/myplants'}>
        <Text value="Back to My Plants">← Back to My Plants</Text>
      </Link>
    </Box>
      <Grid templateColumns="2fr 2fr" gap={4}>
      <GridItem>
        {/* <VStack align="start" spacing={4}> */}

        <Box position={"relative"} bg='#488B49' p="3" borderRadius="xl">
      <FormControl>
      {/* <FormLabel>{`Search ${input}`}</FormLabel> */}
      {/* will eventually be used with cards... */}
      <InputGroup>
      <InputLeftElement>
       <SearchIcon id='p-icon'></SearchIcon>
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Plant name"
        onChange={(e) => handleInput(e)}
        id='p-input'
        _placeholder={{ color: 'inherit' }}
        width='100%'
        variant='outline'
        focusBorderColor='#488B49'
        ></Input>
      {!searching && <><Button onClick={() => handleSubmit()} id='p-button'>Search</Button></>}
      {searching && <><Button onClick={() => handleSubmit()} isLoading loadingText='Searching' id='p-button'>Search</Button></>}
        </InputGroup>
      </FormControl>
      <br></br>

      {results &&
        results.map((result, i) => {
          // look into simplifying this later
          const scientificName = result.ScientificName.replace(/<[^>]*>/g, '').split(' ').slice(0, 2).join(' ');
          //   needs nicer looking display or possibly separate component
          return (
            
            <Box flexDirection="row" display="flex" justifyContent={"center"} alignItems="center" key={`${result}-${i}`}>
          {/* <Heading  fontWeight="250" className='u-text' size='md' onClick={() => handlePlantSelect(result)}><strong>{result.CommonName}</strong> | {scientificName}</Heading> */}
          <Heading  fontWeight="250" className='u-text' size='md' onClick={() => handlePlantSelect(result)}><strong>{result.CommonName}</strong> | <strong>{scientificName}</strong></Heading>
          {/* <Heading size='sm'>{scientificName}</Heading> */}
          {/* look for API image data */}
          {/* <img src={result.ProfileImageFilename}></img> */}
        </Box>
        )
      })
    }
    </Box>
    {/* </VStack> */}
    </GridItem>


        <GridItem>
      {selected && selected.CommonName &&
        // <Box p={3} borderRadius="xl" id='lvl-alert'>
          <Box bg="#488B49" p={3} borderRadius="xl" id='lvl-alert'>
          <FormControl isRequired>
          <FormLabel color={"#488B49"} requiredIndicator={false}>Choose a name for your plant:</FormLabel>
          <Input id='p-input2' focusBorderColor='#B9DA44' type="text" placeholder={selected.CommonName} onChange={(e) => handleNicknameChange(e)}></Input><br></br>
          <FormLabel color={"#488B49"} requiredIndicator={false}>Choose a bio for your plant:</FormLabel>
          <Input id='p-input2' type="text" onChange={(e) => handleBio(e)} bgColor='green.100' textColor="green.900"></Input><br></br>
          <FormLabel color={"#488B49"}>Choose a frequency for task</FormLabel>
          <Select color={"#B9DA44"} bgColor={"#488B49"} placeholder="Select frequency" onChange={(e) => handleFrequencyChange(e)}>
            <option>second</option>
            <option>minute</option>
            <option>hour</option>
          </Select>
          <FormLabel color={"#488B49"}>Choose a name for task:</FormLabel>
          <Input id='p-input2' type="text" value={taskName} onChange={(e) => handleTaskName(e)} bgColor='green.100' textColor="green.900" isRequired={true}></Input><br></br>
          <Button onClick={() => handleAddTask()} bgColor="#d5e8ce" color="#4AAD52" w="100%">Add Task</Button>
          {tasks.length > 0 && <FormLabel>Tasks</FormLabel>}
          {tasks.length > 0 &&
            tasks.map((task, i) => (
              <h4 key={`${task}-${i}`}>{task}</h4>
            ))
          }
          <FormLabel color={"#488B49"} requiredIndicator={false}>Add a picture</FormLabel>
          {imageUrl && <img width={250} height={250} src={imageUrl}></img>}
          <PlantImgUpload handleUploadFile={() => handleUploadFile()} handleChooseFile={(e) => handleChooseFile(e)}/>
            <Link to="/myplants">
          <Button onClick={() => handleNicknameSubmit()} id='p-button' w="100%" isDisabled={missingTask}>Add New Plant</Button>
            </Link>
          </FormControl>
          </Box>
        // </Box>
      }
      </GridItem>
    </Grid>
    </Box>
  );
};

export default PlantFinder;
