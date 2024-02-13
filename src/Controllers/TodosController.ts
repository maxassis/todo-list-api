import {FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod";
import { TodoService } from '../Services/TodoService';

const todoService = new TodoService()

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

export class TodoController {

    async create(request: RequestWithUser, reply: FastifyReply) {
        const { content } = TodoBodyDTO.parse(request.body)
        const  id  = request.user?.id! 

        try {
            console.log(id, content)
            await todoService.createTodo(id, content)
            reply.status(201).send({message: "todo criado com sucesso"})
        } catch (e: any) {
            reply.status(400).send(e.message)
        }
        
    }
}
