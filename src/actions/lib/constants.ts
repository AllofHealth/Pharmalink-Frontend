import { config } from 'dotenv'
config()

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://3illbaby:taylorgang@pharma.ybzvrsk.mongodb.net/?retryWrites=true&w=majority'
