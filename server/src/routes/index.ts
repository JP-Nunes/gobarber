import { Router } from 'express'
import appointmentsRouter from './appointments'
import usersRouter from './users'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)

routes.get('/', (request, response) => {
  return response.json({ message: "Hello moto" })
})

export default routes