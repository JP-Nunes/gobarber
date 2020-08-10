import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthsWithAvailabilityService from '@modules/appointments/services/ListProviderMonthsWithAvailabilityService'

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.query

    const listProviderMonthsWithAvailability = container.resolve(
      ListProviderMonthsWithAvailabilityService
    )

    const availability = await listProviderMonthsWithAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    })

    return response.json(availability)
  }
}
