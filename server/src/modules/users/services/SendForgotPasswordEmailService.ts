import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

// import User from '../infra/typeorm/entities/User'

interface IRequestDTO {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const existingUser = await this.usersRepository.findByEmail(email)

    if (!existingUser) {
      throw new AppError('User does not exists.')
    }

    const { token } = await this.userTokensRepository.generate(existingUser.id)

    this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido ${token}`
    )
  }
}

export default SendForgotPasswordEmailService
