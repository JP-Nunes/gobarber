import User from '../models/User'
import { getRepository } from 'typeorm'
import { id } from 'date-fns/locale'

interface RequestDTO {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User)

    const repeatedEmail = await usersRepository.findOne({
      where: { email }
    })

    if(repeatedEmail) {
      throw new Error('Email já em uso')
    }

    const user = usersRepository.create({
      name,
      email,
      password
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService