import { Router } from 'express'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: "I'm sorry" })
})

export default routes