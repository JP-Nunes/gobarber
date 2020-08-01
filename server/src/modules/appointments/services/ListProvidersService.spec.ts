import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    listProviders = new ListProvidersService(fakeUsersRepository)
  })

  it(`should be able to list providers`, async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Smith',
      email: 'john.smith@wathever.com',
      password: '123456'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Smith Jr',
      email: 'john.smith.jr@wathever.com',
      password: '123456'
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Smith III',
      email: 'john.smithiii@wathever.com',
      password: '123456'
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    })

    expect(providers).toEqual([user1, user2])
  })
})
