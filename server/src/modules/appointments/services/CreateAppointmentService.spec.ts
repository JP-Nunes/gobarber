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
      date: new Date(),
      provider_id: '791515486'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('791515486')
  })

  it('should not be able to create two appointments on the same date and hour', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '791515486'
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '791515486'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
