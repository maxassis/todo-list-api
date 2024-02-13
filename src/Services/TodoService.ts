import { prisma } from "./prismaService";

export class TodoService {
  async createTodo(id: string, content: string) {

    return prisma.todo.create({
      data: {
        content,
        userId: id       
      },
    });
  }
}
