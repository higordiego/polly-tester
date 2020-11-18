const AWS = require('aws-sdk')

AWS.config.update({
  region: process.env.AWS_REGION_TRANSCRIBE,
  accessKeyId: process.env.AWS_ACESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
})


const mounteTranscribe = (urlS3, nameJob) => ({
  TranscriptionJobName: nameJob,
  Media: { MediaFileUri: urlS3 },
  MediaFormat: 'mp3',
  LanguageCode: 'pt-BR'
})


const transcribeService = new AWS.TranscribeService()

exports.getTranscribe = (name) => transcribeService.getTranscriptionJob({ TranscriptionJobName: name }).promise()

exports.transcribe = (urlS3, nameJob) => transcribeService.startTranscriptionJob(mounteTranscribe(urlS3, nameJob)).promise()