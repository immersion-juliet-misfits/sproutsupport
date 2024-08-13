import { CronJob } from 'cron';
import { PrismaClient } from'@prisma/client';
import 'dotenv/config'
import axios from 'axios';

const prisma = new PrismaClient()

const emailRequest = async (array: any, email: string, user: string, userId: number): Promise<void>=>{

  const service: string = process.env.Email_Service_id
  const template: string = process.env.Email_Template
  const id: string = process.env.Email_Public_key
  const token: string = process.env.Email_Secret_Key
  let string: string = ''

for(let i = 0; i < array.length; i++){
 if(i !== array.length - 1){
  string = string + array[i].message + '\n'
 }else{
  string = string + array[i].message
 }
}

const joinMeetupMessages: string = await prisma.attendee.findMany()
.then(async (result)=>{
  const youJoin: Array<T> = []
  for(let i = 0; i < result.length; i++){
     if(result[i].userId === userId){
      youJoin.push(result[i].meet_id)
    }
  }
let str: string = ''

for(let i = 0; i < youJoin.length; i++){
const mess: string = await prisma.meet.findUnique({where:{id: youJoin[i]}}).then((result)=>{
  if(result.status === 'in range' || result.status === 'today'){
    return result.message
  }
}).catch((err)=>{console.log('cron can\'t get meetup that matches this id: ', err)})
 
if(i !== youJoin.length - 1){
str = str + mess + '\n'
}else{
str = str + mess
}
}
  return str
})
.catch((err)=>{
  console.error('can\'t get attendees: ', err)
})


if(joinMeetupMessages.length !== 0){
  string = string + '\n' + joinMeetupMessages
}


  const obj = {
    service_id: service,
    template_id: template,
    user_id: id,
    accessToken: token,
    template_params: {
       from_name: 'sproutSuport',
       to_name: user,
       message: string,
       email
    }
};
axios.post('https://api.emailjs.com/api/v1.0/email/send', obj)
.then(()=>{
console.log('sent')
})
.catch((err: any)=>{
  console.log('Can\'t send email: ', err)
})
}


const sendEmail = new CronJob('*/1 * * * *', () => { // wanna make this dynamic 
prisma.meet.findMany()
  .then(async (result)=>{
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
  emailRequest(obj[key], user.email, user.userName, user.id)
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