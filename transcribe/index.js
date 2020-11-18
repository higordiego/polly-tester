require('dotenv').config()
const path = require('path');
const { uploadS3 } = require('./s3')
const { transcribe } = require('./transcribe')


const keyUrl = path.join(__dirname, '../', 'andre.mp3')


const init = async (name, keyUrl) => {
  try {
    const { Location: location } = await uploadS3(name, keyUrl)
    const result = await transcribe(location, `${name}-${Math.random()}`)
    console.log('result', result)
  } catch (error) {
    console.log('error', error)
    throw new Error(error.message)
  }
}

init('andre', keyUrl)