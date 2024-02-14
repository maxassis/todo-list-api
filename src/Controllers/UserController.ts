import {FastifyRequest, FastifyReply } from 'fastify'
import { userService } from '../Services/UserService'

import { z } from 'zod'

const BodyDTO = z.object({
    name: z.string().min(1, { message: "Nome obrigatorio" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Senha obrigatoria" })
})

class CreateUserController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password } = BodyDTO.parse(request.body)

        try {
            await userService.createUser(name, email, password)
            return reply.status(201).send("usuario criado com sucesso")
        } catch(e: any) {
            return reply.status(400).send(e.message)
        }
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = BodyDTO.parse(request.body)
        
        try {
            const token = await userService.login(email, password)
            return reply.status(200).send(token)
        } catch(e: any) {
            return reply.status(400).send(e.message)
        }
    }
}

export const userController = new CreateUserController()
