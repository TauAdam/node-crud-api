import { IncomingMessage, ServerResponse } from 'http'
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetAllUsers,
  handleGetUser,
  handleUpdateUser,
} from '../db/index.js'
import { BASE_URL, HTTP_METHODS } from '../models/index.js'
import { processError } from '../utils/index.js'

export const router = (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (!req.url) {
      return
    }

    const urlParts = req.url.split('/')
    const id = urlParts[3]

    if (req.url.startsWith(BASE_URL)) {
      processError(404, res, 'Page not found')
      return
    }
    switch (req.method) {
      case HTTP_METHODS.GET:
        if (id) {
          handleGetUser(id, res)
        } else {
          handleGetAllUsers(res)
        }
        break

      case HTTP_METHODS.POST:
        handleCreateUser(req, res)
        break

      case HTTP_METHODS.PUT:
        handleUpdateUser(id, req, res)
        break

      case HTTP_METHODS.DELETE:
        handleDeleteUser(id, res)
        break

      default:
        processError(405, res, 'Method Not Allowed')
        break
    }
  } catch (error) {
    processError(500, res, 'Internal Server Error')
  }
}
