import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import User from '../infra/typeorm/entities/User'

interface IRequestDTO {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const existingEmail = await this.usersRepository.findByEmail(email)

    if (existingEmail) {
      throw new AppError('Email já em uso')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await this.cacheProvider.invalidateByPrefix('providers-list')

    return user
  }
}

export default CreateUserService
