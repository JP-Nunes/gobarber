import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthsWithAvailabilityService from '@modules/appointments/services/ListProviderMonthsWithAvailabilityService'

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.body

    const listProviderMonthsWithAvailability = container.resolve(
      ListProviderMonthsWithAvailabilityService
    )

    const availability = await listProviderMonthsWithAvailability.execute({
      provider_id,
      month,
      year
    })

    return response.json(availability)
  }
}
