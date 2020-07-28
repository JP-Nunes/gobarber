import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import UsersController from '../controllers/UsersController'
import UsersAvatarController from '../controllers/UsersAvatarController'

import ensureAuthentication from '../middlewares/ensureAuthentication'

const usersRouter = Router()
const upload = multer(uploadConfig)
const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()

usersRouter.post('/', usersController.create)

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  usersAvatarController.update
)

export default usersRouter
