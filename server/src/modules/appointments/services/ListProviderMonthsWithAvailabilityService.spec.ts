import FakeAppointementsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthsWithAvailabilityService from './ListProviderMonthsWithAvailabilityService'

let fakeAppointementsRepository: FakeAppointementsRepository
let listProviderMonthsWithAvailability: ListProviderMonthsWithAvailabilityService

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointementsRepository = new FakeAppointementsRepository()
    listProviderMonthsWithAvailability = new ListProviderMonthsWithAvailabilityService(
      fakeAppointementsRepository
    )
  })

  it(`should be able to list provider's month availability`, async () => {
    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 8, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 9, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 10, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 11, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 12, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 13, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 14, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 15, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 16, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 20, 17, 0, 0)
    })

    await fakeAppointementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 21, 10, 0, 0)
    })

    const availability = await listProviderMonthsWithAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 10
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true }
      ])
    )
  })
})
