import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

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
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const existingEmail = await this.usersRepository.findByEmail(email)

    if (existingEmail) {
      throw new AppError('Email já em uso')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService
