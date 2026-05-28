"use client"

import { useState } from "react"

import {
  Plus,
  Filter,
  Download,
} from "lucide-react"

import { Button } from "@/src/components/ui/button"

import { Antibiotic } from "@/src/types/antibiotic.type"
import { StatisticsCards } from "./_components/statistic-cards"
import { AntibioticTable } from "./_components/antibiotic-table"
import { PaginationSection } from "./_components/pagination"

import { useAntibiotics } from "@/src/hooks/queries/use-antibiotics"
import { AntibioticFormDialog } from "./_components/antibiotic-form-dialog"
import { DeleteAntibioticDialog } from "./_components/delete-antibiotic-dialog"

export default function AntibioticsPage() {
  const [page, setPage] = useState(1)

  const {
    data,
    isLoading,
    isError,
  } = useAntibiotics({
    page,
    pageSize: 10,
  })

  const [openForm, setOpenForm] =
    useState(false)

  const [openDelete, setOpenDelete] =
    useState(false)

  const [
    selectedAntibiotic,
    setSelectedAntibiotic,
  ] = useState<Antibiotic | null>(
    null
  )

  function handleCreate() {
    setSelectedAntibiotic(null)

    setOpenForm(true)
  }

  function handleEdit(item: any) {
    setSelectedAntibiotic(item)

    setOpenForm(true)
  }

  function handleDelete(item: any) {
    setSelectedAntibiotic(item)

    setOpenDelete(true)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-64 animate-pulse rounded bg-slate-200" />

        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div>
        Không thể tải dữ liệu. Vui lòng thử lại sau.
      </div>
    )
  }

  return (
    <main className="space-y-6">
      {/* Hero */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-2" >
            Danh mục Kháng sinh
          </h1>

          <p className="text-muted-foreground">
            Hướng dẫn sử dụng và tra cứu phổ kháng khuẩn lâm sàng.
          </p>
        </div>

        <Button className="gap-2 flex items-center px-5 py-2.5" onClick={handleCreate}>
          <Plus className="h-4 w-4" />

          Thêm kháng sinh
        </Button>
      </div>

      {/* Stats */}
      <StatisticsCards metadata={data.metadata} />

      {/* Table */}
      <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-primary">
            Danh sách thuốc hiện có
          </h3>
          {/* <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-[13px] font-medium border border-blue-100 flex items-left gap-1">
            {data.items.length} Thuốc đang quản lý
          </span> */}


          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
            >
              <Filter className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AntibioticTable
          data={data.items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="border-t px-6 py-4">
          <PaginationSection
            metadata={data.metadata}
            onPageChange={setPage}
          />
        </div>

        <AntibioticFormDialog
          open={openForm}
          onOpenChange={setOpenForm}
          initialData={selectedAntibiotic}
        />

        {selectedAntibiotic && (
          <DeleteAntibioticDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            antibioticId={
              selectedAntibiotic.id
            }
          />
        )}
      </section>
    </main>
  )
}