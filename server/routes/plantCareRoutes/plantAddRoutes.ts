import express, { Request, Response } from 'express';
import { PrismaClient } from'@prisma/client';
import axios from 'axios';
import qs from 'qs'


const prisma = new PrismaClient();
const Plants = express.Router();

Plants.get('/test', (req: Request, res: Response) => {
  res.send('test success')
})

Plants.post('/newPlant', (req: Request, res: Response) => {
  const { nickname, bio, ScientificName, CommonName, Id, userId } = req.body;
  prisma.plant.create({data: {nickname, description:bio, species: ScientificName, commonName: CommonName, plantAPIID: Id, userId}})
    .then((data) => {
      res.send(data)
    })
})

Plants.get('/all/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  let num = Number(id)
  prisma.plant.findMany({where: { userId: num }})
    .then((data) => {
      res.send(data)
    })
})

// Plants.get('/all/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   let num = Number(id)
//   prisma.plant.findMany({where: { userId: num }})
//     .then((data) => {
//       res.send(data)
//     })
// })

// gets all overdue tasks for a plant
Plants.get('/overdue/:plantId', (req: Request, res: Response) => {
  const { plantId } = req.params;
  prisma.task.findMany({where: { plant_id: Number(plantId), overdue: true }})
    .then((data) => {
      console.log(data, 'overdue tasks')
      res.send(data)
    })
})

Plants.delete('/delete/:plantId', (req: Request, res: Response) => {
  const { plantId } = req.params;

  prisma.$transaction([prisma.task.deleteMany({where: { plant_id: Number(plantId) }}), prisma.plant.delete({where: { id: Number(plantId) }})])

  // prisma.plant.delete({where: { id: Number(plantId) }})
  //   .then((data) => {
  //     res.send('deleted')
  //   })
})

Plants.put('/task/:plantId', (req: Request, res: Response) => {
  const { plantId } = req.params;
  const { taskName, tasks, freq } = req.body;

  const getNextCompletionDate = (frequency) => {
    const now = new Date();
    let nextCompletion = new Date();
  
    if (frequency === 'second') {
      nextCompletion = new Date(now.getTime() + 1000); 
    } else if (frequency === 'minute') {
      nextCompletion = new Date(now.getTime() + 60000); 
    } else if (frequency === 'hour') {
      nextCompletion = new Date(now.getTime() + 3600000);
    } else {
      nextCompletion = now;
    }
  
    console.log(frequency, nextCompletion, 'nextCompletion');
    return nextCompletion;
  };
  let num = Number(plantId)
  // console.log('name of tas', taskName, tasks)
  
  const newTasks = tasks.map((taskName) => ({
    taskName, plant_id: Number(plantId), frequency: freq, nextComplection: getNextCompletionDate(freq), overdue: false
    // console.log(getNextCompletionDate(freq))
  }))

  prisma.task.createMany({data: newTasks, skipDuplicates: true})
    .then((data) => {
      console.log('the right data', data)
      res.send(data)
    })

  // prisma.task.upsert({ where: { id: num, plant_id: num }, create: { taskName: taskName, plant_id: num }, update: { taskName } })
  //   .then((data) => {
  //     res.send(data)
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
})

Plants.post('/search', (req: Request, res: Response) => {
  const { query } = req.body;

  const params = qs.stringify({
        Type: 'Characteristics',
        'TaxonSearchCriteria[Text]': query,
        'TaxonSearchCriteria[Field]': 'Common Name',
        SortBy: 'sortCommonName',
        Offset: -1
})

  axios.post('https://plantsservices.sc.egov.usda.gov/api/CharacteristicsSearch', params)
  .then(({data}) => {
    console.log(data)
    res.send(data.PlantResults)
  })
  .catch((err) => {
    console.error(err)
    res.send(err)
  })
})

export default Plants;
