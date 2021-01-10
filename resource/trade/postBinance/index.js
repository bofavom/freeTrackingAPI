import multer from 'multer'
import postBinance from './postBinance'
import validation from './validation'

const upload = multer()

export default [upload.single('xlsx'), validation, postBinance]