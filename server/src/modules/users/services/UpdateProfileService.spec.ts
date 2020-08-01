import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it(`should be able to update user's profile`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Smith',
      email: 'john.smith@wathever.com',
      password: '123456'
    })

    await updateProfile.execute({
      user_id: user.id,
      name: 'John Silva',
      email: 'john.silva@wathever.com'
    })

    expect(user.name).toBe('John Silva')
    expect(user.email).toBe('john.silva@wathever.com')
  })

  it(`should not be able to update user's email to another user's email`, async () => {
    await fakeUsersRepository.create({
      name: 'John Smith',
      email: 'john.smith@wathever.com',
      password: '123456'
    })

    const user = await fakeUsersRepository.create({
      name: 'Test Smith',
      email: 'test.smith@wathever.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Test Smith',
        email: 'john.smith@wathever.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it(`should be able to update user's password`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Smith',
      email: 'john.smith@wathever.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Test Smith',
      email: 'john.smith@wathever.com',
      old_password: '123456',
      password: '123123'
    })

    expect(updatedUser.password).toBe('123123')
  })

  it(`should not be able to update user's password without entering current password`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Smith',
      email: 'john.smith@wathever.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Test Smith',
        email: 'john.smith@wathever.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it(`should not be able to update user's passwor entering with a wrong current password`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Smith',
      email: 'john.smith@wathever.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Test Smith',
        email: 'john.smith@wathever.com',
        old_password: 'wrong_old_password',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
