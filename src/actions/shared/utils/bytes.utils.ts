import { ethers } from 'ethers'

export class BytesUtils {
  string2Bytes(str: string): string {
    return  ethers.encodeBytes32String(str);
  }

  bytes32ToString(str: string): string {
    return ethers.encodeBytes32String(str);
  }
}
