import AppError from '@shared/errors/AppError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointent', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      provider_id: '791515486',
      user_id: '791515486',
      date: new Date()
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('791515486')
  })

  it('should not be able to create two appointments on the same date and hour', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11)

    await createAppointment.execute({
      provider_id: '791515486',
      user_id: '791515486',
      date: appointmentDate
    })

    expect(
      createAppointment.execute({
        provider_id: '791515486',
        user_id: '791515486',
        date: appointmentDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
