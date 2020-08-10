import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDailyAvailabilityService from '@modules/appointments/services/ListProviderDailyAvailabilityService'

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { day, month, year } = request.query

    const listProviderDailyAvailability = container.resolve(
      ListProviderDailyAvailabilityService
    )

    const availability = await listProviderDailyAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    })

    return response.json(availability)
  }
}
