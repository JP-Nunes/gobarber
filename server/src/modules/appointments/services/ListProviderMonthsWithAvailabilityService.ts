import { injectable, inject } from 'tsyringe'
import { getDaysInMonth, getDate, isAfter } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  month: number
  year: number
}

type IResponseDTO = Array<{
  day: number
  available: boolean
}>

@injectable()
class ListProviderMonthsWithAvailabityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointments = await this.appointmentsRepository.findAllFromProviderByMonth(
      {
        provider_id,
        year,
        month
      }
    )

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const allMonthDaysArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    )

    const availability = allMonthDaysArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59)

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day
      })

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10
      }
    })

    return availability
  }
}

export default ListProviderMonthsWithAvailabityService
