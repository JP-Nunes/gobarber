import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ForgotPasswordsController from '../controllers/ForgotPasswordsController'
import ResetPasswordsController from '../controllers/ResetPasswordsController'

const passwordsRouter = Router()
const forgotPasswordsController = new ForgotPasswordsController()
const resetPasswordsController = new ResetPasswordsController()

passwordsRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required()
    }
  }),
  forgotPasswordsController.create
)
passwordsRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      token: Joi.string().required()
    }
  }),
  resetPasswordsController.create
)

export default passwordsRouter
