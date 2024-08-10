import dotenv from 'dotenv';
dotenv.config();
import aws from 'aws-sdk';

const region = "us-east-2"
<<<<<<< HEAD
const bucketName = "sproutsupportbucket"
=======
const bucketName = "ssupportbucket"
>>>>>>> 0f060c550b98d835c8b349a1789e376a32adf2f7
const accessKey = process.env.AWS_ACCESS_KEY
const secret = process.env.AWS_SECRET


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

  return s3.getSignedUrlPromise('putObject', params)
   .then((data) => {
    return data
   })
   .catch((err) => {
    console.error('Error fetching signed url', err)
   })
}

const s3 = new aws.S3();

export { s3, bucketName, uploadURL };