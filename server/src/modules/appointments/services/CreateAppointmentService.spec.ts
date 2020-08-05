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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      provider_id: '98545486',
      user_id: '791515486',
      date: new Date(2020, 9, 10, 13)
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('98545486')
  })

  it('should not be able to create two appointments on the same date and hour', async () => {
    const appointmentDate = new Date(2020, 9, 10, 13)

    await createAppointment.execute({
      provider_id: '98545486',
      user_id: '791515486',
      date: appointmentDate
    })

    await expect(
      createAppointment.execute({
        provider_id: '98545486',
        user_id: '791515486',
        date: appointmentDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        provider_id: '98545486',
        user_id: '791515486',
        date: new Date(2020, 9, 10, 11)
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointments where the user is the provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 11).getTime()
    })

    await expect(
      createAppointment.execute({
        provider_id: '791515486',
        user_id: '791515486',
        date: new Date(2020, 9, 10, 13)
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointments out of business hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        provider_id: '791515486',
        user_id: '791515486',
        date: new Date(2020, 9, 10, 7)
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        provider_id: '791515486',
        user_id: '791515486',
        date: new Date(2020, 9, 10, 18)
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
