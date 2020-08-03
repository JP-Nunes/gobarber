import { injectable, inject } from 'tsyringe'
import { getHours } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  month: number
  year: number
  day: number
}

type IResponseDTO = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListProviderDailyAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointments = await this.appointmentsRepository.findAllFromProviderByDay(
      {
        provider_id,
        year,
        month,
        day
      }
    )

    const startingHour = 8

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + startingHour
    )

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      return {
        hour,
        available: !hasAppointmentInHour
      }
    })

    return availability
  }
}

export default ListProviderDailyAvailabilityService
