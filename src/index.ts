import dotenv from 'dotenv'
import http from 'http'
import { router } from './router/index.js'
dotenv.config()

const PORT = process.env.PORT

const server = http.createServer((req, res) => {
  router(req, res)
})

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
