import bcrypt from 'bcrypt'
import { prisma } from './prismaService'
import jwt from 'jsonwebtoken'

export class UserService {

    async createUser(name: string, email: string, password: string) {
        const userExist = await prisma.user.findUnique({where: {email}})

        if(userExist) throw new Error("Este email ja esta cadastrado")

        const newUser = {
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        }

        return prisma.user.create({data: newUser})
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({where: {email}})
        if(!user) throw new Error("usuario não encontrado")

        const isSamePassword = bcrypt.compareSync(password, user.password)
        if(!isSamePassword) throw new Error("senha inválida")

        return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET as string, {expiresIn: '30d'})  
    }

}