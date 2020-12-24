import nconf from 'nconf'

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const config = nconf
  .env({
    lowerCase: true,
    parseValues: true,
    separator: '_',
  })
  .file(`./config/${environment}.json`)

export default config