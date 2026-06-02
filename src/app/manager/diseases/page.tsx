"use client"
import { useState } from "react"
import { Plus, Filter, Download } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useDiseases } from "@/src/hooks/queries/use-diseases"
import { DiseaseTable } from "./_components/disease-table"
import { DiseaseFormDialog } from "./_components/disease-form-dialog"
import { PaginationSection } from "@/src/components/layout/pagination"
import { DeleteDiseaseDialog } from "./_components/delete-disease-dialog"

export default function DiseasesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useDiseases({ page, pageSize: 10 })
  
  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedDisease, setSelectedDisease] = useState<any>(null)

  if (isLoading) return <div className="p-8 text-gray-500">Đang tải dữ liệu...</div>
  if (isError || !data) return <div className="p-8 text-red-500">Lỗi kết nối API!</div>

  return (
    <main className="p-8 space-y-6 max-w-300 mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Quản lý Bệnh lý</h1>
          <p className="text-gray-500 text-[15px]">Cấu hình tiêu chuẩn chẩn đoán và phác đồ điều trị.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/80" onClick={() => { setSelectedDisease(null); setOpenForm(true) }}>
          <Plus className="h-4 w-4" /> Thêm Bệnh Lý
        </Button>
      </div>

      {/* <StatisticsCards totalCount={data.metadata.totalItemCount} /> */}

      <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-primary">Danh sách bệnh lý</h3>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost"><Filter className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
          </div>
        </div>

        <DiseaseTable 
          data={data.items} 
          onEdit={(item) => { setSelectedDisease(item); setOpenForm(true); }} 
          onDelete={(item) => { setSelectedDisease(item); setOpenDelete(true); }}
        />

        <div className="border-t px-6 py-4">
          <PaginationSection metadata={data.metadata} onPageChange={setPage} />
        </div>
      </section>

      <DiseaseFormDialog open={openForm} onOpenChange={setOpenForm} initialData={selectedDisease} />

      {selectedDisease && (
        <DeleteDiseaseDialog 
          open={openDelete} 
          onOpenChange={setOpenDelete} 
          diseaseId={selectedDisease.id} 
          diseaseName={selectedDisease.name}
        />
      )}
    </main>
  )
}