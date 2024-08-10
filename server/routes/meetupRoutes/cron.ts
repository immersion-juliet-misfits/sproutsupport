import { CronJob } from 'cron';
import { PrismaClient } from'@prisma/client';
import 'dotenv/config'
import axios from 'axios';

const prisma = new PrismaClient()

const emailRequest = (message: string, email: string, user: string): void=>{

  const service: string = process.env.Email_Service_id
  const template: string = process.env.Email_Template
  const id: string = process.env.Email_Public_key
  const token: string = process.env.Email_Secret_Key

  const obj = {
    service_id: service,
    template_id: template,
    user_id: id,
    accessToken: token,
    template_params: {
       from_name: 'sproutSuport',
       to_name: user,
       message,
       email
    }
};

axios.post('https://api.emailjs.com/api/v1.0/email/send', obj)
.then(()=>{
})
.catch((err: any)=>{
  console.log('Can\'t send email: ', err)
})
}


const sendEmail = new CronJob('*/1 * * * *', () => { // wanna make this dynamic 
prisma.meet.findMany()
  .then((result)=>{
    console.log(result)
    if(result[0].status === 'in range' || result[0].status === 'today'){
prisma.user.findUnique({where:{id: result[0].userId}})
.then((user)=>{
  console.log('user')
  emailRequest(result[0].message, user.email, user.userName)
})
.catch((err)=>{
  console.error('Error meetup get user line 45 in cron.ts: ', err)
})
    }
  })
  .catch((err)=>{
    console.error('Error meetup get line 49 in cron.ts: ', err)
  })
})


 export default sendEmail;