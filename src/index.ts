import dotenv from 'dotenv'
import http from 'http'
import { User } from './models/index.js'
dotenv.config()

const PORT = process.env.PORT

const users: User[] = []

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === 'w') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(users))
  } else {
    res.statusCode = 404
    res.end()
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
