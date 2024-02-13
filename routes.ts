import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./src/Controllers/UserController";
import jwt from 'jsonwebtoken'
import { prisma } from "./src/Services/prismaService";

const userController = new CreateUserController()

type MyToken = {
    id: string
    email: string
    iat: number
    exp: number
  }

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
   fastify.post('/signin', {preHandler : async (request, reply, done) => {
        const token = request.headers.authorization?.split(' ')[1]
        if(!token) reply.code(401).send({error: "token invalido"})

        const decodedToken: any = jwt.verify(token!, process.env.JWT_SECRET as string) as MyToken

        try {            
           const user = await prisma.user.findUnique({where: {id: decodedToken.id}})
           console.log(user)
           done()
        } catch(e: any) {
            reply.code(401).send({error: "token invalido"})
        }

    }}, async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.create(request, reply)
    })

    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.login(request, reply)
    })

    fastify.post('/create_todo', async (request: FastifyRequest, reply: FastifyReply) => {
        return "create todo"
    })

}