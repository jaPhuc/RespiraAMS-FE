"use client"

import { useState } from "react"

import {
  Plus,
  Filter,
  Download,
} from "lucide-react"

import { Button } from "@/src/components/ui/button"

import { Antibiotic } from "@/src/features/manager/antibiotics/types"
import { AntibioticTable } from "@/src/features/manager/antibiotics/components/antibiotic-table"
import { PaginationSection } from "@/src/features/manager/layouts/pagination"

import { useAntibiotics } from "@/src/features/manager/antibiotics/api"
import { AntibioticFormDialog } from "@/src/features/manager/antibiotics/components/antibiotic-form-dialog"
import { DeleteAntibioticDialog } from "@/src/features/manager/antibiotics/components/delete-antibiotic-dialog"

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

  function handleEdit(item: Antibiotic) {
    setSelectedAntibiotic(item)

    setOpenForm(true)
  }

  function handleDelete(item: Antibiotic) {
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
    <main className="space-y-6 p-8 max-w-300 mx-auto">
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