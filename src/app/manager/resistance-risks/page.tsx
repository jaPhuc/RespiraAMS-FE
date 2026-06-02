"use client"

import { useState, useMemo } from "react"
import { Plus, Filter, Download } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useResistanceRisks } from "@/src/hooks/queries/use-resistance-risks"
import { useDiseases } from "@/src/hooks/queries/use-diseases"
import { ResistanceRiskTable } from "./_components/resistance-risk-table"
import { ResistanceRiskFormDialog } from "./_components/resistance-risk-form-dialog"
import { DeleteResistanceRiskDialog } from "./_components/delete-resistance-risk-dialog"
import { PaginationSection } from "@/src/components/layout/pagination"
import { ResistanceRisk } from "@/src/types/resistance-risk.type"

export default function ResistanceRisksPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useResistanceRisks({ page, pageSize: 10 })
  const { data: diseasesData } = useDiseases({ page: 1, pageSize: 100 })

  const diseaseMap = useMemo(() => {
    if (!diseasesData?.items) return {}
    const map: Record<string, string> = {}
    for (const d of diseasesData.items) {
      map[d.id] = d.name
    }
    return map
  }, [diseasesData])

  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ResistanceRisk | null>(null)

  function handleCreate() {
    setSelectedItem(null)
    setOpenForm(true)
  }

  function handleEdit(item: ResistanceRisk) {
    setSelectedItem(item)
    setOpenForm(true)
  }

  function handleDelete(item: ResistanceRisk) {
    setSelectedItem(item)
    setOpenDelete(true)
  }

  if (isLoading) {
    return (
      <div className="space-y-4 p-8">
        <div className="h-10 w-64 animate-pulse rounded bg-slate-200" />
        <div className="h-64 animate-pulse rounded-xl bg-slate-200" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-red-500">
        Không thể tải dữ liệu. Vui lòng thử lại sau.
      </div>
    )
  }

  return (
    <main className="space-y-6 p-8 max-w-350 mx-auto">
      {/* Hero */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
            Nguy cơ kháng thuốc
          </h1>
          <p className="text-muted-foreground">
            Quản lý các nguy cơ kháng thuốc theo bệnh lý, tác nhân và tiêu chí.
          </p>
        </div>

        <Button className="gap-2 flex items-center px-5 py-2.5" onClick={handleCreate}>
          <Plus className="h-4 w-4" />
          Thêm nguy cơ
        </Button>
      </div>

      {/* Table */}
      <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-primary">
            Danh sách nguy cơ kháng thuốc
          </h3>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ResistanceRiskTable
          data={data.items}
          diseaseMap={diseaseMap}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="border-t px-6 py-4">
          <PaginationSection
            metadata={data.metadata}
            onPageChange={setPage}
          />
        </div>
      </section>

      <ResistanceRiskFormDialog
        open={openForm}
        onOpenChange={setOpenForm}
        initialData={selectedItem}
      />

      {selectedItem && (
        <DeleteResistanceRiskDialog
          open={openDelete}
          onOpenChange={setOpenDelete}
          resistanceRiskId={selectedItem.id}
        />
      )}
    </main>
  )
}
