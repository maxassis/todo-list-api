import { prisma } from "./prismaService";

class TodoService {

  async listTodos(id: string) {
    return prisma.todo.findMany({
      where: {
        userId: id
      }
    })
  }

  async createTodo(id: string, content: string) {
    return prisma.todo.create({
      data: {
        content,
        userId: id       
      },
    });
  }

  async updateTodo(id: string, content: string) {
    return prisma.todo.update({
      where: {
        id: +id
      },
      data: {
        content: content
      }
    })
  }

  async deleteTodo(id: string) {
    return prisma.todo.delete({
      where: {
        id: +id
      }
    })
  }
}

export const todoService = new TodoService()