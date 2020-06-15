import { Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'

interface TokenPayLoad {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authorization = request.headers.authorization

  if(!authorization) {
    throw new Error('Token is missing!')
  }

  const [, token] = authorization.split(' ')

  try {

    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayLoad

    request.user = {
      id: sub
    }

    return next()

  } catch {
    throw new Error('Invalid token')
  }
}