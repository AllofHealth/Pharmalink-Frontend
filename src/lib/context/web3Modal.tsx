// "use client";

// import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
// import { ReactNode } from "react";

// // 1. Get projectId at https://cloud.walletconnect.com
// const projectId = "27414159f22891f65dac78f285165179";
// console.log(projectId);

// // 2. Set chains
// const mainnet = {
//   chainId: 1,
//   name: "Ethereum",
//   currency: "ETH",
//   explorerUrl: "https://etherscan.io",
//   rpcUrl: "https://cloudflare-eth.com",
// };

// // 3. Create a metadata object
// const metadata = {
//   name: "Pharmalink System",
//   description: "An helathcare system for blockchain interactions",
//   url: process.env.BASE_URL || "", // origin must match your domain & subdomain
//   icons: ["https://avatars.mywebsite.com/"],
// };

// // 4. Create Ethers config
// const ethersConfig = defaultConfig({
//   metadata,
// });

// // 5. Create a Web3Modal instance
// createWeb3Modal({
//   ethersConfig,
//   chains: [mainnet],
//   projectId,
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
//   enableOnramp: true, // Optional - false as default
// });

// export function Web3Modal({ children }: { children: ReactNode }) {
//   return children;
// }
