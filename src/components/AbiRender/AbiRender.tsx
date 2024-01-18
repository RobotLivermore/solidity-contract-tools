import type { Abi } from 'viem'
import { Button, Collapse, Input } from 'antd'
import { useCallback, useState } from 'react'
import { useContractRead, usePublicClient } from 'wagmi'

interface Props {
  abi: Abi
  address: string
}

export function AbiRender({ abi, address }: Props) {
  const publicClient = usePublicClient()
  const [params, setParams] = useState<Record<string, string | undefined>>({})
  const [result, setResult] = useState<string>('')

  const changeParam = useCallback((key: string, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const query  = async (functionName: string) => {
    console.log(functionName, address)
    console.log(publicClient.chain)
    const result = await publicClient.readContract({abi, address: address as `0x${string}`, functionName: functionName})
    console.log(result)
  }

  const write = useCallback(async () => {
  }, [])

  if (!abi) return null
  return (
    <div className="flex w-full">
      <Collapse
        className="w-full"
        items={
          abi
            .map((item, index) => {
              if (item.type !== 'function') {
                return null
              }
              const isQuery = item.stateMutability === 'view'
              return {
                key: String(index),
                label: item.name,
                children: (
                  <div className="flex flex-col px-4 py-2">
                    {item.inputs?.map((input, idx) => {
                      return (
                        <div className="my-1 w-full flex flex-col" key={idx}>
                          <Input
                            placeholder={`${input.name}(${input.type})`}
                            value={params[input.name as string]}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const value = e.target.value
                              changeParam(input.name as string, value)
                            }}
                          />
                        </div>
                      )
                    })}
                    <div className="flex justify-between">
                      <p>{result}</p>
                      <Button
                        className="btn btn-primary btn-sm"
                        onClick={isQuery ? () => {
                          query(item.name as string)
                        } : write}
                      >
                        {item.stateMutability === 'view' ? 'Query' : 'Write'}
                      </Button>
                    </div>
                  </div>
                ),
              }
            })
            .filter(Boolean) as any
        }
      />
      {/* {abi.map((item, index) => {
        if (item.type !== 'function') {
          return null
        }
        return (
          
        )
      })} */}
    </div>
  )
}
