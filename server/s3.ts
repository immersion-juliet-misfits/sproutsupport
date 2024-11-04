import dotenv from 'dotenv';
dotenv.config();
import aws from 'aws-sdk';

const region = "us-east-2"
//const bucketName = "my1test1bucket"
// const bucketName = "ssupportbucket"
const bucketName = process.env.BUCKET_NAME
const accessKey = process.env.AWS_ACCESS_KEY
const secret = process.env.AWS_SECRET


aws.config.update({
    region,
    accessKeyId: accessKey,
    secretAccessKey: secret
})

// This is beneath update - according to this: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
const s3 = new aws.S3();


const uploadURL = (filename: string) => {
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


export { s3, bucketName, uploadURL };




// import dotenv from 'dotenv';
// dotenv.config();
// import aws from 'aws-sdk';

// const region = "us-east-2"
// //const bucketName = "my1test1bucket"
// // const bucketName = "ssupportbucket"
// const bucketName = process.env.BUCKET_NAME
// const accessKey = process.env.AWS_ACCESS_KEY
// const secret = process.env.AWS_SECRET


// aws.config.update({
//     region,
//     accessKeyId: accessKey,
//     secretAccessKey: secret
// })

// const uploadURL = (filename) => {
//   const params = {
//     Bucket: bucketName,
//     Key: filename,
//     Expires: 60 * 3,
//   }

//   return s3.getSignedUrlPromise('putObject', params)
//    .then((data) => {
//     return data
//    })
//    .catch((err) => {
//     console.error('Error fetching signed url', err)
//    })
// }

// const s3 = new aws.S3();

// export { s3, bucketName, uploadURL };