const express: any = require('express')
const axios: any = require('axios')

const router = express.Router()

router.get('/test', (req: any, res: any)=>{
  res.send({mess: 'test'})
})