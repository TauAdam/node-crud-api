import { ServerResponse } from 'http'

export const processError = (
  status: number,
  res: ServerResponse,
  msg: string
) => {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(msg))
}

export const isValidUUID = (uuid: string) => {
  const UUIDRegex =
    /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/
  return UUIDRegex.test(uuid)
}
