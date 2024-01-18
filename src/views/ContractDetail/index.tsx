'use client'

import { AbiRender } from '@/components/AbiRender/AbiRender'
import { FC, useEffect, useState } from 'react'

interface Props {
  id: string
}

const ContractDetail: FC<Props> = ({ id }) => {
  const [contract, setContract] = useState<any>(null)
  useEffect(() => {
    try {
      const projects = localStorage.getItem('projects')
      if (projects) {
        const projectsObjs = JSON.parse(projects)
        const contract = projectsObjs.find((item: any) => item.id === id)
        setContract(contract)
      }
    } catch (e) {
      console.log(e)
    }
  }, [id])
  console.log(contract)
  return (
    <div className="w-full">
      <h1 className='text-4xl font-bold py-2'>ContractDetail</h1>
      <AbiRender abi={contract?.abi} address={contract?.address} />
    </div>
  )
}

export default ContractDetail
