import { Router } from 'express'

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments'
import usersRouter from '@modules/users/infra/http/routes/users'
import sessionsRouter from '@modules/users/infra/http/routes/sessions'
import passwordsRouter from '@modules/users/infra/http/routes/passwords'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/passwords', passwordsRouter)

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello moto' })
})

export default routes
