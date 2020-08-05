import FakeAppointementsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointementsRepository: FakeAppointementsRepository
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointementsRepository = new FakeAppointementsRepository()
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointementsRepository
    )
  })

  it(`should be able to list provider's appointments on a specific day`, async () => {
    const appointment1 = await fakeAppointementsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 9, 20, 14, 0, 0)
    })

    const appointment2 = await fakeAppointementsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 9, 20, 15, 0, 0)
    })

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      month: 10,
      year: 2020
    })

    expect(appointments).toEqual([appointment1, appointment2])
  })
})
