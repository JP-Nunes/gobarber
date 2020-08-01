import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllFromProviderByMonthDTO from '../dtos/IFindAllFromProviderByMonthDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllFromProviderByMonth(
    data: IFindAllFromProviderByMonthDTO
  ): Promise<Appointment[]>
}
