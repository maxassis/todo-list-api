import { prisma } from "./prismaService";

export class TodoService {
  async createTodo(content: string, userId: string) {
    const todoContent = content;

    const todo = await prisma.todo.create({
      data: {
        content: todoContent,
        userId        
      },
    });

    return todo;
  }
}
