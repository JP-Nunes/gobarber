import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface RequestDTO {
  provider: string,
  date: Date
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date)

    const findSameDateAppointments = this.appointmentsRepository.findByDate(appointmentDate)

    if(findSameDateAppointments) {
      throw Error('Horário indisponível')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService