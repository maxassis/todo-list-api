import {FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod";
import { TodoService } from '../Services/TodoService';

const todoService = new TodoService()

const BodyTodoDTO = z.object({
    
})


export class TodoController {

    async create(request: FastifyRequest, reply: FastifyReply) {
        
        
        // await todoService.createTodo(request.body.content, request.)
    
    
    }
    
}
