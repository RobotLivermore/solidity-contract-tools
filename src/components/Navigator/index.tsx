'use client'

import { Button } from 'antd'
import React from 'react'
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'

const Navigator: React.FC = () => {
  const { open } = useWeb3Modal()
  const account = useWeb3ModalAccount()

  return (
    <nav className="flex justify-center w-full border border-b">
      <div className="w-full max-w-[1440px] px-6 flex justify-end h-16 items-center">
        {!account && (
          <Button
            onClick={() => {
              open()
            }}
          >
            Connect
          </Button>
        )}
        {account && <w3m-button />}
      </div>
    </nav>
  )
}

export default Navigator
