import dotenv from "dotenv";

dotenv.config();

export const CONTRACT_ADDRESS = "0x9799A202eaB37666c81F643c9c4b731b05433f33";
export const IPFS_API_KEY = process.env.IPFS_API_KEY || "";
export const IPFS_API_SECRET = process.env.IPFS_API_SECRET || "";
export const PROJECT_ID = process.env.PROJECT_ID || "";
