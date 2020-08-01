import { Router } from 'express'

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments'
import usersRouter from '@modules/users/infra/http/routes/users'
import sessionsRouter from '@modules/users/infra/http/routes/sessions'
import passwordsRouter from '@modules/users/infra/http/routes/passwords'
import profileRouter from '@modules/users/infra/http/routes/profile'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/passwords', passwordsRouter)
routes.use('/profile', profileRouter)

export default routes
