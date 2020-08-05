import { Router } from 'express'

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication'
import ProvidersController from '../controllers/ProvidersController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProviderDailyAvailabilityController from '../controllers/ProviderDailyAvailabilityController'

const providersRouter = Router()

const providersController = new ProvidersController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDailyAvailabilityController = new ProviderDailyAvailabilityController()

providersRouter.use(ensureAuthentication)

providersRouter.get('/', providersController.index)

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
)
providersRouter.get(
  '/:provider_id/day-availability',
  providerDailyAvailabilityController.index
)

export default providersRouter
