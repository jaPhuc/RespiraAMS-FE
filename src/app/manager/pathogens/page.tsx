// src/app/manager/pathogens/page.tsx
"use client"
import { useState } from "react"
import { Plus, Filter, Download, Bug } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { usePathogens } from "@/src/hooks/queries/use-pathogens"
import { PathogenTable } from "./_components/pathogen-table"
import { PathogenFormDialog } from "./_components/pathogen-form-dialog"
import { DeletePathogenDialog } from "./_components/delete-pathogen-dialog"
import { PaginationSection } from "../antibiotics/_components/pagination"

export default function PathogensPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = usePathogens({ page, pageSize: 10 })
  
  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  if (isLoading) return <div className="p-8 text-gray-500">Đang tải dữ liệu...</div>
  if (isError || !data) return <div className="p-8 text-red-500">Lỗi kết nối API!</div>

  return (
    <main className="p-8 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Quản lý Tác nhân</h1>
          <p className="text-gray-500 text-[15px]">Danh mục vi khuẩn, virus và các tác nhân gây bệnh.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/80" onClick={() => { setSelectedItem(null); setOpenForm(true) }}>
          <Plus className="h-4 w-4" /> Thêm Tác Nhân
        </Button>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <Bug className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-purple-800">{data.metadata.totalItemCount}</h3>
          <p className="text-sm text-gray-500 font-medium">Tổng số tác nhân</p>
        </div>
      </div> */}

      <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-primary">Danh sách tác nhân</h3>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost"><Filter className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
          </div>
        </div>

        <PathogenTable 
          data={data.items} 
          onEdit={(item) => { setSelectedItem(item); setOpenForm(true); }} 
          onDelete={(item) => { setSelectedItem(item); setOpenDelete(true); }} 
        />

        <div className="border-t px-6 py-4">
          <PaginationSection metadata={data.metadata} onPageChange={setPage} />
        </div>
      </section>

      <PathogenFormDialog open={openForm} onOpenChange={setOpenForm} initialData={selectedItem} />
      
      {selectedItem && (
        <DeletePathogenDialog open={openDelete} onOpenChange={setOpenDelete} pathogenId={selectedItem.id} pathogenName={selectedItem.name} />
      )}
    </main>
  )
}