"use client"
import { useState } from "react"
import { Plus, Filter, Download, ActivitySquare } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useIcuCriteria } from "@/src/hooks/use-icu-criteria"
import { IcuCriterionTable } from "./_components/icu-criterion-table"
import { PaginationSection } from "@/src/components/layout/pagination" // Tái sử dụng pagination component cũ
import { DeleteIcuCriterionDialog } from "./_components/delete-icu-criterion-dialog"
import { IcuCriterionFormDialog } from "./_components/icu-criterion-form-dialog"

export default function IcuCriteriaPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useIcuCriteria({ page, pageSize: 10 })
  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  if (isLoading) return <div className="p-8 text-gray-500 font-medium">Đang tải dữ liệu tiêu chuẩn ICU...</div>
  if (isError || !data) return <div className="p-8 text-red-500 font-medium">Lỗi kết nối API!</div>

  return (
    <main className="p-8 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Tiêu chuẩn ICU</h1>
          <p className="text-gray-500 text-[15px]">Quản lý các tiêu chuẩn đánh giá nhập viện ICU cho bệnh nhân.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-sm" onClick={() => { setSelectedItem(null); setOpenForm(true); }}>
          <Plus className="h-4 w-4" /> Thêm Tiêu Chuẩn
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
              <ActivitySquare className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-amber-600">{data.metadata.totalItemCount}</h3>
          <p className="text-sm text-gray-500 font-medium">Tổng tiêu chuẩn</p>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 text-primary">Danh sách tiêu chuẩn</h3>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost"><Filter className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
          </div>
        </div>

        <IcuCriterionTable 
          data={data.items} 
          onEdit={(item) => { setSelectedItem(item); setOpenForm(true); }} 
          onDelete={(item) => { setSelectedItem(item); setOpenDelete(true); }} 
        />

        <div className="border-t px-6 py-4">
          <PaginationSection metadata={data.metadata} onPageChange={setPage} />
        </div>
      </section>

      <IcuCriterionFormDialog open={openForm} onOpenChange={setOpenForm} initialData={selectedItem} />
  
      {selectedItem && (
        <DeleteIcuCriterionDialog 
          open={openDelete} 
          onOpenChange={setOpenDelete} 
          criterionId={selectedItem.id} 
          criterionName={selectedItem.criterion?.name} 
        />
      )}
    </main>
  )
}