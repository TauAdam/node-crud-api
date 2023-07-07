import dotenv from 'dotenv'
import http from 'http'
dotenv.config()

const PORT = process.env.PORT

const server = http.createServer((req, res) => {})

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
