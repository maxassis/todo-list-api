import {FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod";
import { todoService } from '../Services/TodoService';


const TodoBodyDTO = z.object({
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

const TodoParams = z.object({
    id: z.string()
})

class TodoController {

    async list(request: RequestWithUser, reply: FastifyReply) {
        const  id  = request.user?.id! 
        const todos = await todoService.listTodos(id)
        reply.status(200).send(todos)
    }

    async create(request: RequestWithUser, reply: FastifyReply) {
        const { content } = TodoBodyDTO.parse(request.body)
        const  id  = request.user?.id! 

        try {
            let todo = await todoService.createTodo(id, content)
            Reflect.deleteProperty(todo, 'userId')           
            reply.status(201).send({message: "todo criado com sucesso", todo })
        } catch (e: any) {
            reply.status(400).send(e.message)
        }       
    }

    async delete(request: RequestWithUser, reply: FastifyReply) {
        const { id } = TodoParams.parse(request.params)
        
        try {
            await todoService.deleteTodo(id)
            reply.status(200).send({message: "todo deletado com sucesso"})
        } catch(e: any) {
            reply.status(400).send(e.message)
        }
    }

    async update(request: RequestWithUser, reply: FastifyReply) { 
        const { id } = TodoParams.parse(request.params)
        const { content } = TodoBodyDTO.parse(request.body)
             
        try {
            const todo = await todoService.updateTodo(id, content)
            Reflect.deleteProperty(todo, 'userId') 
            reply.status(200).send({message: "todo atualizado com sucesso", todo})
        } catch(e: any) {
            reply.status(400).send(e.message)
        }
    }
}

export const todoController = new TodoController()
