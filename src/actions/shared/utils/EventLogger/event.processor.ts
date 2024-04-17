import { EventLog, LogDescription, ethers } from 'ethers'

export const processEvent = async (
  receipt: any,
  eventName: string,
  contractEvent: string,
) => {
  const iface = new ethers.Interface([contractEvent])

  const event: LogDescription | undefined = receipt.logs
    .map((log: EventLog) => {
      try {
        return iface.parseLog(log)
      } catch {
        return null
      }
    })
    .find((log: LogDescription | null) => log && log.name === eventName)

  if (!event) {
    throw new Error('Event not found')
  }

  const eventResult = event.args

  return eventResult
}
