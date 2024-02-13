import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./src/Controllers/UserController";

const userController = new CreateUserController()


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.post('/signin', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.create(request, reply)
    })

    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.login(request, reply)
    })
}