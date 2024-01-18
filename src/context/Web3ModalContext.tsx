'use client'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { sepolia, mainnet } from 'viem/chains'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '47fbadcdab684a00eda50b6e530863a2'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [mainnet, sepolia]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: 'light' })

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
