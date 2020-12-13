import multer from 'multer'
import postKrakenLedger from './postKrakenLedger'
import validation from './validation'

const upload = multer()

export default [upload.single('csv'), validation, postKrakenLedger]