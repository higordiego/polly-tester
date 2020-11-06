require('dotenv').config()
const AWS = require('aws-sdk')
const Fs = require('fs')


AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
})

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
})

let params = {
  'Text': 'Cuida, que hoje é sexta-feira dia de fazer deploy sem QA.',
  'OutputFormat': 'mp3',
  'VoiceId': 'Camila'
}

Polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
    console.log(err.code)
  } else if (data) {
    if (data.AudioStream instanceof Buffer) {
      Fs.writeFile("./speech.mp3", data.AudioStream, function (err) {
        if (err) {
          return console.log(err)
        }
        console.log("The file was saved!")
      })
    }
  }
})