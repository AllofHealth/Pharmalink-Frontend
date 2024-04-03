import { IPFS_API_KEY, IPFS_API_SECRET } from '../constants/constant'

class ProcessAuth {
  private apiKey: string
  private secret: string

  constructor(apiKey: string, secret: string) {
    this.apiKey = apiKey
    this.secret = secret
  }

  async generateAuthHeader() {
    const auth =
      'Basic ' + Buffer.from(`${this.apiKey}:${this.secret}`).toString('base64')
    return auth
  }
}

export const processAuthInstance = new ProcessAuth(
  IPFS_API_KEY,
  IPFS_API_SECRET,
)
