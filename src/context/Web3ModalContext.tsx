'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'


// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '47fbadcdab684a00eda50b6e530863a2'

const sepolia = {
  chainId: 11_155_111,
  name: 'Sepolia',
  currency: 'SEP',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://rpc.sepolia.org'
}

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata, enableEmail: true }),
  chains: [sepolia],
  projectId,
  themeMode: 'light'
})


export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return children
}
