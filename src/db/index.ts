import { IncomingMessage, ServerResponse } from 'http'
import { v4 } from 'uuid'
import { User } from '../models/index.js'
import { isValidUUID, processError } from '../utils/index.js'

const DATABASE: User[] = []

export const handleGetAllUsers = (res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(DATABASE))
}

export const handleGetUser = (id: string, res: ServerResponse) => {
  if (!isValidUUID(id)) {
    processError(400, res, 'Invalid user ID (not UUID)')
    return
  }

  const user = DATABASE.find(user => user.id === id)
  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(user))
  } else {
    processError(404, res, 'Record not found')
  }
}

export const handleCreateUser = (req: IncomingMessage, res: ServerResponse) => {
  let requestBody = ''

  req.on('data', chunk => {
    requestBody += chunk.toString()
  })

  req.on('end', () => {
    try {
      const userData: User = JSON.parse(requestBody)
      if (!userData.username || !userData.age || !userData.hobbies) {
        processError(400, res, 'Request body missing required fields')
      } else {
        const newUser = {
          id: v4(),
          username: userData.username,
          age: userData.age,
          hobbies: userData.hobbies,
        }
        DATABASE.push(newUser)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(newUser))
      }
    } catch (error) {
      processError(400, res, 'Invalid JSON data')
    }
  })
}

export const handleUpdateUser = (
  id: string,
  req: IncomingMessage,
  res: ServerResponse
) => {
  if (!isValidUUID(id)) {
    processError(400, res, 'Invalid user ID (not UUID)')
    return
  }

  const index = DATABASE.findIndex(user => user.id === id)
  if (index !== -1) {
    let requestBody = ''

    req.on('data', chunk => {
      requestBody += chunk.toString()
    })

    req.on('end', () => {
      try {
        const userData = JSON.parse(requestBody)
        if (!userData.username || !userData.age || !userData.hobbies) {
          processError(400, res, 'Request body missing required fields')
        } else {
          const updatedUser = {
            id: id,
            username: userData.username,
            age: userData.age,
            hobbies: userData.hobbies,
          }
          DATABASE[index] = updatedUser

          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(updatedUser))
        }
      } catch (error) {
        processError(400, res, 'Invalid JSON data')
      }
    })
  } else {
    processError(404, res, 'User not found')
  }
}

export const handleDeleteUser = (id: string, res: ServerResponse) => {
  if (!isValidUUID(id)) {
    processError(400, res, 'Invalid user ID (not UUID)')
    return
  }

  const index = DATABASE.findIndex(user => user.id === id)
  if (index !== -1) {
    DATABASE.splice(index, 1)
    res.writeHead(204)
    res.end()
  } else {
    processError(404, res, 'User not found')
  }
}
