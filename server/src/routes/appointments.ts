import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

import ensureAuthentication from '../middlewares/ensureAuthentication'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthentication)

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try {

    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const CreateAppointment = new CreateAppointmentService()

    const appointment = await CreateAppointment.execute({ date: parsedDate, provider_id })

    return response.json(appointment)

  } catch (error) {
    return response.status(error).json({ error: error.message })
  }
})

export default appointmentsRouter