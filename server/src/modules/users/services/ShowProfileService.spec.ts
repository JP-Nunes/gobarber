import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it(`should be able to show user's profile`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Smith',
      email: 'john.smith@wathever.com',
      password: '123456'
    })

    const profile = await showProfile.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('John Smith')
    expect(profile.email).toBe('john.smith@wathever.com')
  })

  it(`should not be able to show a non-existing user's profile`, async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
