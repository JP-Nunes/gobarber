import { Router } from 'express'

import ForgotPasswordsController from '../controllers/ForgotPasswordsController'
import ResetPasswordsController from '../controllers/ResetPasswordsController'

const passwordsRouter = Router()
const forgotPasswordsController = new ForgotPasswordsController()
const resetPasswordsController = new ResetPasswordsController()

passwordsRouter.post('/forgot', forgotPasswordsController.create)
passwordsRouter.post('/reset', resetPasswordsController.create)

export default passwordsRouter
