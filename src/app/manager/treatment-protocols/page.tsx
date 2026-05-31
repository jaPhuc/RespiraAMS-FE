"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Download, Stethoscope, X } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { useTreatmentProtocols } from "@/src/hooks/queries/use-treatment-protocols"
import { useDiseases } from "@/src/hooks/queries/use-diseases"
import { TreatmentProtocolTable } from "./_components/treatment-protocol-table"
import { PaginationSection } from "../antibiotics/_components/pagination"
import { DeleteTreatmentProtocolDialog } from "./_components/delete-treatment-protocol-dialog"
import { TreatmentProtocolFormDialog } from "./_components/treatment-protocol-form-dialog"

export default function TreatmentProtocolsPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)

  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  
  const [filterDisease, setFilterDisease] = useState<string>("all")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")

  const { data: diseasesData } = useDiseases({ page: 1, pageSize: 100 })

  const { data, isLoading, isError } = useTreatmentProtocols({ 
    page, 
    pageSize: 10,
    diseaseId: filterDisease,
    severity: filterSeverity
  })

  if (isLoading) return <div className="p-8 text-gray-500 font-medium">Đang tải dữ liệu phác đồ...</div>
  if (isError || !data) return <div className="p-8 text-red-500 font-medium">Lỗi kết nối API!</div>

  return (
    <main className="p-8 space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#006591] mb-2">Phác Đồ Điều Trị</h1>
          <p className="text-gray-500 text-[15px]">Quản lý hướng dẫn điều trị và phối hợp kháng sinh theo bệnh lý.</p>
        </div>
        <Button className="gap-2 bg-[#006591] hover:bg-[#004c6e] text-white shadow-sm" onClick={() => { setSelectedItem(null); setOpenForm(true); }}>
          <Plus className="h-4 w-4" /> Thêm Phác Đồ Mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="rounded-lg bg-blue-50 p-2 text-[#006591]">
              <Stethoscope className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#006591]">{data.metadata.totalItemCount}</h3>
          <p className="text-sm text-gray-500 font-medium">Tổng số phác đồ</p>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b px-6 py-4 gap-4">
          <h3 className="text-lg font-semibold text-gray-800 whitespace-nowrap">Danh sách phác đồ hiện tại</h3>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="w-[200px]">
              <Select value={filterDisease} onValueChange={(val) => { setFilterDisease(val); setPage(1); }}>
                <SelectTrigger className="bg-gray-50"><SelectValue placeholder="Bệnh lý..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả bệnh lý</SelectItem>
                  {diseasesData?.items?.map((d: any) => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-[160px]">
              <Select value={filterSeverity} onValueChange={(val) => { setFilterSeverity(val); setPage(1); }}>
                <SelectTrigger className="bg-gray-50"><SelectValue placeholder="Mức độ..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả mức độ</SelectItem>
                  <SelectItem value="mild">Nhẹ (Mild)</SelectItem>
                  <SelectItem value="moderate">Trung Bình (Mod)</SelectItem>
                  <SelectItem value="severe">Nặng (Severe)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(filterDisease !== "all" || filterSeverity !== "all") && (
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-red-500"
                onClick={() => { setFilterDisease("all"); setFilterSeverity("all"); setPage(1); }}
                title="Xóa bộ lọc"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            <Button size="icon" variant="outline" className="ml-auto md:ml-0" title="Xuất dữ liệu">
              <Download className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>

        <TreatmentProtocolTable 
          data={data.items} 
          onEdit={(item) => { setSelectedItem(item); setOpenForm(true); }} 
          onDelete={(item) => { setSelectedItem(item); setOpenDelete(true); }} 
          onViewDetail={(id) => router.push(`/manager/treatment-protocols/${id}`)}
        />

        <div className="border-t px-6 py-4 bg-gray-50/50">
          <PaginationSection metadata={data.metadata} onPageChange={setPage} />
        </div>
      </section>

      <TreatmentProtocolFormDialog open={openForm} onOpenChange={setOpenForm} initialData={selectedItem} />
      {selectedItem && (
        <DeleteTreatmentProtocolDialog open={openDelete} onOpenChange={setOpenDelete} protocolId={selectedItem.id} />
      )}
    </main>
  )
}