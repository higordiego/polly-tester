
const AWS = require('aws-sdk')
const { readFileSync } = require('fs');
const { isFunction } = require('util');


const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
});


const mountedObject = (key, body) => ({
  Key: `${key}.mp3`,
  Bucket: process.env.AWS_BUCKET,
  Body: body,
  ContentType: "audio/mp3",
})

exports.uploadS3 = (key, fileName) => new Promise((resolve, reject) => {
  const fileContent = readFileSync(fileName)
  const params = mountedObject(key, fileContent)
  return s3.upload(params, (err, data) => {
    if (err) reject(err)
    return resolve(data)
  })
})