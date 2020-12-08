import multer from 'multer'
import postCoinTracking from './postCoinTracking'
import validation from './validation'

const upload = multer()

export default [upload.single('csv'), validation, postCoinTracking]