import { CronJob } from 'cron';
import { PrismaClient } from'@prisma/client';
import 'dotenv/config'
import axios from 'axios';

const prisma = new PrismaClient()

const emailRequest = (array: any, email: string, user: string): void=>{

  const service: string = process.env.Email_Service_id
  const template: string = process.env.Email_Template
  const id: string = process.env.Email_Public_key
  const token: string = process.env.Email_Secret_Key


for(let i = 0; i < array.length; i++){
  prisma.attendee.findMany({where:{meet_id: array[0].id}})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.error('can\'t check if user join a meetup event ')
  })
}
//   const obj = {
//     service_id: service,
//     template_id: template,
//     user_id: id,
//     accessToken: token,
//     template_params: {
//        from_name: 'sproutSuport',
//        to_name: user,
//        message,
//        email
//     }
// };

// axios.post('https://api.emailjs.com/api/v1.0/email/send', obj)
// .then(()=>{
//   console.log('sent')
// })
// .catch((err: any)=>{
//   console.log('Can\'t send email: ', err)
// })
}


const sendEmail = new CronJob('*/1 * * * *', () => { // wanna make this dynamic 
prisma.meet.findMany()
  .then((result)=>{
    const obj: object = {}     
    for(let i = 0; i < result.length; i++){
      if(result[i].status === 'in range' || result[i].status === 'today'){
if(!obj[result[i].userId]){
  obj[result[i].userId] = [result[i]]
}else{
  obj[result[i].userId].push(result[i])
}
      }
    }
  for(const key in obj){
prisma.user.findUnique({where:{id: obj[key][0].userId}})
.then((user)=>{
  emailRequest(obj[key], user.email, user.userName)
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