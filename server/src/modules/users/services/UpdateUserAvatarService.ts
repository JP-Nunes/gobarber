import path from 'path'
import fs from 'fs'
import uploadConfig from '@config/upload'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

import User from '../infra/typeorm/entities/User'

interface IRequestDTO {
  userId: string
  avatarFilename: string
}

class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ userId, avatarFilename }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId)

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

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserService
