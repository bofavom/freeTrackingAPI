import debug from 'debug'

export default (namespace, message) => {
  debug(`debug:${namespace}`)(message)
}