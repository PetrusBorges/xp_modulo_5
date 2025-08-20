import type { FastifyInstance, FastifyRequest } from "fastify";
import type { CreateUserBody } from "../types/createUser.js";
import type { UpdateUserBody } from "../types/updateUser.js";
import { prismaClient } from "../lib/prismaClient.js";

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/create', async (request: FastifyRequest<{ Body: CreateUserBody }>, reply) => {
    const { name, email, age } = request.body

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        age,
      }
    })

    reply.send({ user })
  })

  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: UpdateUserBody }>, reply) => {
    const { id } = request.params
    const { age, email, name, isActive } = request.body

    const user = await prismaClient.user.update({
      data: { age, email, isActive, name },
      where: {
        id
      }
    })

    reply.send({ user })
  })

  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const { id } = request.params

    const user = await prismaClient.user.delete({
      where: {
        id
      }
    })

    reply.send({ user })
  })

  app.get('/', async (request, reply) => {
    const users = await prismaClient.user.findMany()

    reply.send({ users })
  })

  app.get('/count', async (request, reply) => {
    const users = await prismaClient.user.count()

    reply.send({ users })
  })

  app.get('/id/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const { id } = request.params

    const user = await prismaClient.user.findFirst({
      where: {
        id,
      }
    })

    reply.send({ user })
  })

  app.get('/name/:name', async (request: FastifyRequest<{ Params: { name: string } }>, reply) => {
    const { name } = request.params

    const user = await prismaClient.user.findFirst({
      where: {
        name,
      }
    })

    reply.send({ user })
  })
}
