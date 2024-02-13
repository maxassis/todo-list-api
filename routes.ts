import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./src/Controllers/UserController";
import jwt from 'jsonwebtoken'
import { prisma } from "./src/Services/prismaService";
import { z } from 'zod'
import { TodoController } from "./src/Controllers/TodosController";

const userController = new CreateUserController()
const todoController = new TodoController()

const MyToken = z.object({
    id: z.string(),
    email: z.string().email(),
    iat: z.number(),
    exp: z.number()
})

const TodoBodyDTO = z.object({
    id: z.string().uuid(),
    content: z.string()
})

interface RequestWithUser extends FastifyRequest {
    user? : {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    }
}

const preHandler = {preHandler : async (request: RequestWithUser, reply: FastifyReply, done: () => void) => {
    const token = request.headers.authorization?.split(' ')[1]
    if(!token) reply.code(401).send({error: "token invalido"})
    const decodedToken = MyToken.parse(jwt.verify(token!, process.env.JWT_SECRET as string))

    try {            
       const user = await prisma.user.findUnique({where: {id: decodedToken.id}}) 
       request.user = user! 
       done()
    } catch(e: any) {
        reply.code(401).send({error: "token invalido"})
    }
}}

 
export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
   fastify.post('/signin', async (request: RequestWithUser, reply: FastifyReply) => {
        return userController.create(request, reply)
    })

    fastify.post('/login', async (request: RequestWithUser, reply: FastifyReply) => {
        return userController.login(request, reply)
    })

    fastify.post('/create_todo', preHandler , async (request: RequestWithUser, reply: FastifyReply) => {
        return todoController.create(request, reply)
    })

}