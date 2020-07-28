import { Router } from 'express'
import { parseISO } from 'date-fns'
import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthentication)

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository)
//   const appointments = await appointmentsRepository.find()

//   return response.json(appointments)
// })

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const CreateAppointment = container.resolve(CreateAppointmentService)

  const appointment = await CreateAppointment.execute({
    provider_id,
    date: parsedDate
  })

  return response.json(appointment)
})

export default appointmentsRouter
