import Fastify from 'fastify'
import usersRoutes from './routes/users.js'

const app = Fastify()

app.register(usersRoutes, { prefix: "/users" })

app.listen({ port: 3009 }).then(() => console.log('Server is running on http://localhost:3009'))
