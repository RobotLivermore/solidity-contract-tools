'use client'

import { Button, Collapse, Input } from 'antd'
import { useCallback, useState, useMemo } from 'react'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'
import { BrowserProvider, Interface, JsonFragment } from 'ethers'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'

interface Props {
  abi: JsonFragment[]
  address: string
}

export function AbiRender({ abi, address }: Props) {
  const [params, setParams] = useState<Record<string, string | undefined>>({})
  const [result, setResult] = useState<Record<string, string | undefined>>({})
  const { walletProvider } = useWeb3ModalProvider()
  console.log(params)


  const changeParam = useCallback(
    (functionName: string, key: string, value: string) => {
      setParams((prev) => ({
        ...prev,
        [`${functionName}_${key}`]: value,
      }))
    },
    []
  )

  const getParamValue = (functionName: string, key: string) => {
    return params[`${functionName}_${key}`]
  }

  const iface = useMemo(() => {
    if (!abi) return
    return new Interface(abi)
  }, [abi])

  const query = async (data: string, functionName: string) => {
    console.log('walletProvider', walletProvider)
    if (walletProvider && iface) {
      const provider = new BrowserProvider(walletProvider)
      const result = await provider?.call({
        to: address,
        data: data,
      })
      try {
        const decodedData = iface.decodeFunctionResult(functionName!, result!)
        console.log(decodedData.toString())
        setResult((pre) => ({ ...pre, [functionName]: decodedData.toString() }))
      } catch (e) {
        console.log(e)
      }
      console.log('result', result)
    }
  }

  const handleWrite = async (data: string) => {
    console.log('data', data)
    if (walletProvider) {
      const provider = new BrowserProvider(walletProvider)
      const signer = await provider?.getSigner()
      const tx = await signer?.sendTransaction({
        to: address,
        data,
      })
      const receipt = await tx?.wait()
      console.log(receipt)
    }
  }
  console.log(result)

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
                            value={getParamValue(item.name as string, input.name as string)}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const value = e.target.value
                              changeParam(item.name as string, input.name as string, value)
                            }}
                          />
                        </div>
                      )
                    })}
                    <div className="flex justify-between">
                      <p>{result[item.name || '']}</p>
                      <Button
                        className="btn btn-primary btn-sm"
                        onClick={
                          isQuery
                            ? () => {
                                try {
                                  if (!iface) return
                                  const values =
                                    item.inputs?.map(
                                      (ipt) => getParamValue(item.name as string, ipt.name as string)
                                    ) || []
                                  const data = iface.encodeFunctionData(
                                    item.name!,
                                    values
                                  )
                                  console.log(data)
                                  query(data, item.name as string)
                                } catch {}
                              }
                            : () => {
                                try {
                                  if (!iface) return
                                  const values =
                                    item.inputs?.map(
                                      (ipt) => getParamValue(item.name as string, ipt.name as string)
                                    ) || []
                                  console.log(values)
                                  const data = iface.encodeFunctionData(
                                    item.name!,
                                    values
                                  )
                                  console.log(data)
                                  handleWrite(data)
                                } catch (e) {
                                  console.log(e)
                                }
                              }
                        }
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
