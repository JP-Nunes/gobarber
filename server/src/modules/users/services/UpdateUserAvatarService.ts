import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageContainer/models/IStorageProvider'

import User from '../infra/typeorm/entities/User'

interface IRequestDTO {
  userId: string
  avatarFilename: string
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ userId, avatarFilename }: IRequestDTO): Promise<User> {
    console.log(userId)
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError(
        'Não é possível mudar o avatar de um usuário não autenticado',
        401
      )
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserService
