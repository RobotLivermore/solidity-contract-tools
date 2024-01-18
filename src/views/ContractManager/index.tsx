'use client'

import { ImportAbiModal } from '@/components/ImportAbiModal'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

const ContractManagerView: FC = () => {
  const router = useRouter()
  const [isImportAbiModalOpen, setIsImportAbiModalOpen] = useState(false)
  const [projects, setProjects] = useState<any[]>([])
  useEffect(() => {
    try {
      const projects = localStorage.getItem('projects')
      if (projects) {
        setProjects(JSON.parse(projects))
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contract Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Operation',
      dataIndex: 'id',
      key: 'operation',
      render: (id: string) => {
        return (
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => {
                router.push(`/contract/${id}`)
              }}
            >
              Go
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                const projects = localStorage.getItem('projects')
                let projectsObjs: any[] = []
                if (projects) {
                  try {
                    projectsObjs = JSON.parse(projects)
                  } catch (e) {
                    console.log(e)
                  }
                }
                const newProjects = projectsObjs.filter(
                  (item) => item.id !== id
                )
                localStorage.setItem('projects', JSON.stringify(newProjects))
                setProjects(newProjects)
              }}
              className="flex items-center"
            >
              <DeleteOutlined className="!flex items-center" />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="w-full max-w-[1240px] py-8">
      <Button
        onClick={() => {
          setIsImportAbiModalOpen(true)
        }}
      >
        Import
      </Button>
      <div className="mt-4">
        <Table dataSource={projects} columns={columns} />
      </div>

      <ImportAbiModal
        open={isImportAbiModalOpen}
        onCancel={() => {
          setIsImportAbiModalOpen(false)
        }}
        onOk={() => {
          setIsImportAbiModalOpen(false)
          try {
            const projects = localStorage.getItem('projects')
            if (projects) {
              setProjects(JSON.parse(projects))
            }
          } catch (e) {
            console.log(e)
          }
        }}
      />
    </div>
  )
}

export default ContractManagerView
