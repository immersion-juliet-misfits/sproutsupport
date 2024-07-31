import express, { Request, Response } from 'express';
// import { PrismaClient } from'@prisma/client';
import axios from 'axios';
import qs from 'qs'


// const prisma = new PrismaClient();
const Plants = express.Router();

Plants.get('/test', (req: Request, res: Response) => {
  res.send('test success')
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
  //   {
  //   params: {
  //     Type: 'Characteristics',
  //     'TaxonSearchCriteria[Text]': 'strawberry',
  //     'TaxonSearchCriteria[Field]': 'Common Name',
  //     SortBy: 'sortCommonName',
  //     Offset: -1
  //   }
  // }
  .then(({data}) => {
    console.log(data)
    res.send(data)
  })
  .catch((err) => {
    console.error(err)
    res.send(err)
  })
})

export default Plants;
