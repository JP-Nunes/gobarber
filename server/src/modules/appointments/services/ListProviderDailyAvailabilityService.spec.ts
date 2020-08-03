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
      date: new Date(2020, 9, 20, 15, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 14, 0, 0)
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 20, 11).getTime()
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
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true }
      ])
    )
  })
})
