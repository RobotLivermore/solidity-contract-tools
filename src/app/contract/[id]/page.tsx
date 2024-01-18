import ContractDetail from "@/views/ContractDetail";

export default function Page({ params }: any) {
  console.log(params.id)
  return (
    <ContractDetail id={params.id} />
  )
}
