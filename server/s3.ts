import dotenv from 'dotenv';
dotenv.config();
import aws from 'aws-sdk';

const region = "us-east-2"
const bucketName = "ssupportbucket"
const accessKey = process.env.AWS_ACCESS_KEY
const secret = process.env.AWS_SECRET

console.log(process.env.AWS_ACCESS_KEY, 'blah blah blah')

aws.config.update({
    region,
    accessKeyId: accessKey,
    secretAccessKey: secret
})

const uploadURL = (filename) => {
  const params = {
    Bucket: bucketName,
    Key: filename,
    Expires: 60 * 3,
  }

//   return s3.getSignedUrl
  return s3.getSignedUrlPromise('putObject', params)
   .then((data) => {
    console.log('data from get signed url', data)
    return data
   })
   .catch((err) => {
    console.error('womp womp', err)
   })
}

const s3 = new aws.S3();

export { s3, bucketName, uploadURL };