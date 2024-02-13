import fastify from 'fastify'
import { routes } from '../routes'

const app = fastify()

app.register(routes)

app.listen({port: 3333}).then(() => {
    console.log('servidor rodando')
    // console.log(crypto.randomUUID())
})