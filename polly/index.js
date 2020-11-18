require('dotenv').config()
const AWS = require('aws-sdk')
const Fs = require('fs')


AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
})

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
})

let params = {
  'Text': 'A sigla REST, em português, significa “Transferência de Estado Representacional”. Concebido como uma abstração da arquitetura da web, trata-se de um conjunto de princípios e definições necessários para a criação de um projeto com interfaces bem definidas',
  'OutputFormat': 'mp3',
  'TextType': 'text',
  'VoiceId': 'Camila',
  'Engine': 'neural'
}

Polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
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