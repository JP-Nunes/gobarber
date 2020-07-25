import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import uploadConfig from '@config/upload'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'

interface RequestDTO {
  userId: string
  avatarFilename: string
}

class UpdateUserService {
  public async execute({ userId, avatarFilename }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(userId)

    if (!user) {
      throw new AppError(
        'Não é possível mudar o avatar de um usuário não autenticado',
        401
      )
    }

    if (user.avatar) {
      const userAvatarFilePath = path.resolve(
        uploadConfig.directory,
        user.avatar
      )
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserService
