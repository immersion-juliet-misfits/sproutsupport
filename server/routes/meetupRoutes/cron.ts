import { CronJob } from 'cron';
import dayjs from 'dayjs';;
import { PrismaClient } from'@prisma/client';
import 'dotenv/config'

const prisma = new PrismaClient()

const emailRequest = (message: string): void=>{

  const service: string = process.env.Email_Service_id
  const template: string = process.env.Email_Template
  const id: string = process.env.Email_Public_key

axios.post('https://api.emailjs.com/api/v1.0/email/send', obj)
.then(()=>{
  console.log('sent')
})
.catch((err: any)=>{
  console.log('Can\'t send email: ', err)
})
})

}

const getTime = (): void =>{
  const day: number | string = dayjs().date() > 9 ? dayjs().date() : `0${dayjs().date()}`
  const month: number | string = dayjs().month() > 9 ? dayjs().month() : `0${dayjs().month() + 1}`
  let hour: number | string = dayjs().hour() > 9 ? dayjs().hour() : `0${dayjs().hour()}`
  const minute: number | string = dayjs().minute() > 9 ? dayjs().minute() : `0${dayjs().minute()}`

  const am_pm: string = typeof hour !== 'string' ? ' pm' : ' am'

  if(typeof hour !== 'string'){
    hour -= 12;
    if(hour < 0){
      hour *= -1
    }
  }
  
  const time: string = '' + month + '/' + day + '/' + dayjs().year() + '  ' + hour + ':' + minute + am_pm
  return time
  }

  const compare = (currentTime: string, dueTime: string, ): void =>{
    
    const cur: Array<T> = currentTime?.split(' ')
    const curDate: Array<T> = cur[0].split('/')
    curDate[2] = parseInt(curDate[2])
    if(typeof curDate[0] === "string"){
      curDate[0] = parseInt(curDate[0].slice(1))
    }
    if(typeof curDate[1] === "string"){
      curDate[1] = parseInt(curDate[1].slice(1))
    }

    const due: Array<T> = dueTime?.split(' ')
    const dueDate: Array<T> = due[0].split('/')
    if(typeof dueDate[0] === "string"){
      dueDate[0] = parseInt(dueDate[0].slice(1))
    }
    if(typeof dueDate[1] === "string"){
      dueDate[1] = parseInt(dueDate[1].slice(1))
    }

let diffMonth: number = 0
let diffDay: number = 0
let diffYear: number = 0
    
    if(curDate[0] !== dueDate[0]){
      diffMonth = curDate[0] - dueDate[0]
    }
    if(curDate[1] !== dueDate[1]){
      diffDay = curDate[1] - dueDate[1]
    }
    if(curDate[2] !== dueDate[2]){
      diffYear = curDate[2] - dueDate[2]
    }
    let str: string = ''
    if(diffMonth !== 0){
     str += `${diffMonth} Months left `
    }
    if(diffDay !== 0){
      str += `${diffDay} Days left `
     }
     if(diffYear !== 0){
      str += `${diffYear} Years left`
     }
     if(diffYear === 0 && diffMonth === 0 && diffDay === 0){
      str += `HEY you have a meetup today`
     }
console.log(str)
emailRequest(str) 
  }

const sendEmail = new CronJob('*/1 * * * *', () => { // wanna make this dynamic 
console.log('hey test')
prisma.meet.findMany()
  .then((result)=>{
    const time: string = getTime()
    compare(time, result[0].time_date)
    
  })
  .catch((err)=>{
    console.error('Error meetup get line 17 in cron.ts: ', err)
  })
})


 export default sendEmail;