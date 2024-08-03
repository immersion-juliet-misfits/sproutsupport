import { CronJob } from 'cron';
const job = new CronJob('* * * * * *', () => {
  console.log('rn', new Date());
})

export default job;