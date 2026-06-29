"use client"
import { useState } from "react"
import { Plus, Filter, Download } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useIcuCriteria } from "@/src/features/manager/icu-criteria/api"
import { IcuCriterionTable } from "@/src/features/manager/icu-criteria/components/icu-criterion-table"
import { PaginationSection } from "@/src/features/manager/layouts/pagination"
import { DeleteIcuCriterionDialog } from "@/src/features/manager/icu-criteria/components/delete-icu-criterion-dialog"
import { IcuCriterionFormDialog } from "@/src/features/manager/icu-criteria/components/icu-criterion-form-dialog"

export default function IcuCriteriaPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useIcuCriteria({ page, pageSize: 10 })
  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  if (isLoading) return <div className="p-8 text-gray-500 font-medium">Đang tải dữ liệu tiêu chuẩn ICU...</div>
  if (isError || !data) return <div className="p-8 text-red-500 font-medium">Lỗi kết nối API!</div>

  return (
    <main className="p-8 space-y-6 max-w-300 mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Tiêu chuẩn ICU</h1>
          <p className="text-gray-500 text-[15px]">Quản lý các tiêu chuẩn đánh giá nhập viện ICU cho bệnh nhân.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-sm" onClick={() => { setSelectedItem(null); setOpenForm(true); }}>
          <Plus className="h-4 w-4" /> Thêm Tiêu Chuẩn
        </Button>
      </div>

      <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-primary">Danh sách tiêu chuẩn</h3>
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