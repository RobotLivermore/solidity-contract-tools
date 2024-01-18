'use client'

import { Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { randomUUID } from 'crypto'
import { FC, useEffect, useState } from 'react'
import { parseAbi } from 'viem'
import { v4 as uuidv4 } from 'uuid'

interface ImportAbiModalProps {
  open: boolean
  onCancel: () => void
  onOk: () => void
}

export const ImportAbiModal: FC<ImportAbiModalProps> = ({ open, onCancel, onOk }) => {
  const [projectName, setProjectName] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const [abi, setAbi] = useState('')
  const parse = () => {
    const projects = localStorage.getItem('projects')
    let projectsObjs: any[] = []
    if (projects) {
      try {
        projectsObjs = JSON.parse(projects)
      } catch (e) {
        console.log(e)
      }
    }
    const parsedAbi = parseAbi(JSON.parse(abi))
    projectsObjs.push({
      id: uuidv4(),
      name: projectName,
      address: contractAddress,
      abi: parsedAbi,
    })
    localStorage.setItem('projects', JSON.stringify(projectsObjs))
    onOk()
  }
  return (
    <Modal title="Import Contract" open={open} onCancel={onCancel} onOk={parse}>
      <div className="grid grid-cols-1 gap-3 pt-4">
        <Input
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Input
          placeholder="Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <TextArea
          className="h-[400px]"
          rows={14}
          value={abi}
          onChange={(e) => {
            setAbi(e.target.value)
          }}
        />
      </div>
    </Modal>
  )
}
