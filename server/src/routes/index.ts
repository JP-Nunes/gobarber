import { Router } from 'express'
import appointmentsRouter from './appointments'

const routes = Router()

routes.use('/appointments', appointmentsRouter)

routes.get('/', (request, response) => {
  return response.json({ message: "Hello moto" })
})

export default routes