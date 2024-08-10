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
  const { nickname, bio, ScientificName, CommonName, Id, userId, imageUrl } = req.body;
  prisma.plant.create({data: {
    nickname,
    description:bio,
    species: ScientificName,
    commonName: CommonName,
    plantAPIID: Id,
    userId,
    imageUrl
  }})
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
      // console.log(data, 'overdue tasks')
      res.send(data)
    })
})

Plants.delete('/delete/:plantId', (req: Request, res: Response) => {
  const { plantId } = req.params;

  prisma.$transaction([
    prisma.task.deleteMany({where: { plant_id: Number(plantId) }}),
    prisma.plant.delete({where: { id: Number(plantId) }})
  ])
  res.send('deleted')

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

    return nextCompletion;
  };
  let num = Number(plantId)

  const newTasks = tasks.map((taskName) => ({
    taskName, plant_id: Number(plantId), frequency: freq, nextComplection: getNextCompletionDate(freq), overdue: false
    // console.log(getNextCompletionDate(freq))
  }))

  prisma.task.createMany({data: newTasks, skipDuplicates: true})
    .then((data) => {
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

Plants.post('/completeTask', (req: Request, res: Response) => {
  const { id } = req.body

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

    return nextCompletion;
  };

  const getNextPointReq = (currLvl) => {
    return 50 + (currLvl * 50)
  }

  prisma.task.findUnique({
    where: { id }, include: {taskPlant: true}
  })
  .then((task) => {
    prisma.task.update({
      where: { id },
      data: {
        lastCompleted: new Date(),
        nextComplection: getNextCompletionDate(task.frequency),
        overdue: false
      }
    })
    .then((data) => {
      console.log(data, 'task')
      prisma.plant.findUnique({where: {id: data.plant_id}, select: {caregiver: true}})
       .then((plant) => {
        prisma.user.update({where: {id: plant.caregiver.id}, data: { points: { increment: 5}}, select: { points: true, level:true, id: true }})
          .then((updatedUser) => {
            let pointsNeeded = getNextPointReq(updatedUser.level)
            console.log(updatedUser, pointsNeeded, 'hahahapple')

            if(updatedUser.points >= pointsNeeded) {
              console.log('LEVEL UP')
              // Property 'id' does not exist on type
              prisma.user.update({where: {id: updatedUser.id}, data: {level: {increment: 1}, points: updatedUser.points - pointsNeeded}})
                .then((newLvl) => {
                  console.log(newLvl, 'LVL UP FR UPDATE')
                  res.send('lvl up')
                })  
            } else {
              res.send('no lvl up')
            }
            // return null;
            // res.send('ok')
          })
          // .then(() => {
          //   res.send('no lvlup')
          // })
       })
    })
  })
 // error handling additions
})

// feels repetetive
Plants.get('/points/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  prisma.user.findUnique({where: {id: Number(userId) } })
    .then((data) => {
      const { userName, level, points, id } = data
      res.send({userName, level, points, id})
    })
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
    res.send(data.PlantResults)
  })
  .catch((err) => {
    console.error(err)
    res.send(err)
  })
})

export default Plants;
