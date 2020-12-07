import mongoose from 'mongoose'
import nconf from './nconf'
import debug from './debug'

export default () => {
  const mongoUser = nconf.get('mongodb:user')
  const mongoPwd = nconf.get('mongodb:password')
  const mongoHost = nconf.get('mongodb:host')
  const mongoProtocol = nconf.get('mongodb:protocol')
  const mongoDatabase = nconf.get('mongodb:database')
  
  const url = `${mongoProtocol}://${mongoUser}:${mongoPwd}@${mongoHost}`
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: mongoDatabase })
  
  const db = mongoose.connection
  db.on('error', () => debug('mongooseError', 'Connection error to MongoDB'))
  db.once('open', () => debug('mongoose', 'Connected to the database successfully'))
}