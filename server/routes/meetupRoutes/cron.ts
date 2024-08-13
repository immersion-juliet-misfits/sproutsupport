import { CronJob } from 'cron';
import { PrismaClient } from'@prisma/client';
import 'dotenv/config'
import axios from 'axios';
import dayjs from 'dayjs';

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
// axios.post('https://api.emailjs.com/api/v1.0/email/send', obj)
// .then(()=>{
// console.log('sent')
// })
// .catch((err: any)=>{
//   console.log('Can\'t send email: ', err)
// })
}


const check = (obj: object):void => {
let day: number  = dayjs().date() 
let month: number = dayjs().month() + 1
let year: number = dayjs().year()
let str: string = ''
let range: string = 'not in range'

let due: any = obj.time_date.split(' ')
due = due[0].split('/')
due = due.map((num: string)=>{
  if(num[0] === '0'){
    return parseInt(num.slice(1))
  }else{
    return parseInt(num)
  }
})

day = day - due[1];
month = month - due[0]
year = year - due[2]
if(day < 0){
  day = day * -1
}
if(month < 0){
  month = month * -1
}
if(year < 0){
  year = year * -1
}

if(year === 0 && month === 0 && day === 0 ){
  str = 'HEY you have a meetup today for ' + obj.eventName
  range = 'today'
}else if(year === 0 && month === 0 && day <= 7){
 str = 'Hey you have ' + day + ' days until the ' + obj.eventName + ' meetup'
 range = 'in range'
}

if(obj.status === 'today'){
  if(year > 0 || month > 0 || day > 0)
prisma.meet.delete({where:{id: obj.id}})
.then(()=>{})
  .catch((err)=>{console.log('can\'t delete over due meetup: ', err)})
}else{
if(str !== ''){
  const data = {status: range, message: str}
prisma.meet.update({
  where:{
    id: obj.id
  },
data
})
.then(()=>{})
.catch((err: any)=>{
  console.error('Error can\'t update in Meetup.tsx line 124: ', err)
})
}
}
}


const sendEmail = new CronJob('*/1 * * * *', () => { // wanna make this dynamic 
prisma.meet.findMany()
  .then(async (result)=>{
    const obj: object = {}     
    for(let i = 0; i < result.length; i++){
      check(result[i])
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