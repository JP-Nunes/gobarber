import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

interface RequestDTO {
  email: string
  password: string
}

interface ResponseDTO {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if(!user) {
      throw new Error('Email ou senha incorretos.')
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new Error('Email ou senha incorretos.')
    }

    const token = sign({}, 'e6918c9e03e9176b8ea0f5e72e242bf4', {
      subject: user.id,
      expiresIn: '3d'
    })

    return { user, token }
  }
}

export default AuthenticateUserService