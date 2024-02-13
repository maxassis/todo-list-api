import {FastifyRequest, FastifyReply } from 'fastify'
import { UserService } from '../Services/UserService'

interface Body {
    name: string;
    email: string;
    password: string
}

const userService = new UserService()
export class CreateUserController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password } = request.body as Body

        if(!email || !password || !name) reply.status(400).send("nome, email e senha devem ser informados")

        try {
            await userService.createUser(name, email, password)
            return reply.status(201).send("usuario criado com sucesso")
        } catch(e: any) {
            return reply.status(400).send(e.message)
        }
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as Body

        if(!email || !password) reply.status(400).send("insira o email e a senha validos")

        try {
            const token = await userService.login(email, password)
            return reply.status(200).send(token)
        } catch(e: any) {
            return reply.status(400).send(e.message)
        }
    }
}