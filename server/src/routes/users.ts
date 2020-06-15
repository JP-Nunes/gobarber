import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'

import ensureAuthentication from '../middlewares/ensureAuthentication'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try {

    const { name, email, password } = request.body

    const createUser = new CreateUserService()
    const user = await createUser.execute({
      name,
      email,
      password
    })

    return response.json(user)

  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

usersRouter.patch(
    '/avatar',
    ensureAuthentication,
    upload.single('avatar'),
    async (request, response) => {
    return response.json({ ok: true })
  }
)

export default usersRouter