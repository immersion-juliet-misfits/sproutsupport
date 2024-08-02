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
