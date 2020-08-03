import FakeAppointementsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderDailyAvailabilityService from './ListProviderDailyAvailabilityService'

let fakeAppointementsRepository: FakeAppointementsRepository
let listProviderDailyAvailability: ListProviderDailyAvailabilityService

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointementsRepository = new FakeAppointementsRepository()
    listProviderDailyAvailability = new ListProviderDailyAvailabilityService(
      fakeAppointementsRepository
    )
  })

  it(`should be able to list provider's day availability`, async () => {
    await fakeAppointementsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 8, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 10, 0, 0)
    })

    const availability = await listProviderDailyAvailability.execute({
      provider_id: 'user',
      day: 20,
      month: 10,
      year: 2020
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false }
      ])
    )
  })
})
