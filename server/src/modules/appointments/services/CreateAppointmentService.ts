import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequestDTO {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    user_id,
    date
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(
        'Is not possible to create an appointment on a past date'
      )
    }

    if (user_id === provider_id) {
      throw new AppError(
        'Is not possible to create an appointment with yourself'
      )
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('Appointments only available between 8am to 5pm')
    }

    const findSameDateAppointments = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id
    )

    if (findSameDateAppointments) {
      throw new AppError('Horário indisponível')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    })

    const formattedDate = format(appointmentDate, 'dd,MM,yyyy às HH:mm')

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${formattedDate}`
    })

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d'
      )}`
    )

    return appointment
  }
}

export default CreateAppointmentService
