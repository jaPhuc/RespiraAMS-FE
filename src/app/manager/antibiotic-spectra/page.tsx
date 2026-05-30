"use client"

import { useState } from "react"

import { Plus } from "lucide-react"

import { Button } from "@/src/components/ui/button"

import { useAntibioticSpectra } from "@/src/hooks/use-antibiotic-spectra"

import { AntibioticSpectrumTable } from "./_components/antibiotic-spectra-table"

import { AntibioticSpectrumFormDialog } from "./_components/antibiotic-spectrum-form-dialog"

import { DeleteAntibioticSpectrumDialog } from "./_components/delete-antibiotic-spectrum-dialog"

import { AntibioticSpectrum } from "@/src/types/spectrum.type"
import { PaginationSection } from "@/src/components/layout/pagination"

export default function AntibioticSpectraPage() {
  const [page, setPage] =
    useState(1)

  const [openForm, setOpenForm] =
    useState(false)

  const [openDelete, setOpenDelete] =
    useState(false)

  const [
    selectedSpectrum,
    setSelectedSpectrum,
  ] =
    useState<AntibioticSpectrum | null>(
      null
    )

  const { data, isLoading, isError } =
    useAntibioticSpectra({
      page,
      pageSize: 10,
    })

  function handleCreate() {
    setSelectedSpectrum(null)

    setOpenForm(true)
  }

  function handleEdit(
    item: AntibioticSpectrum
  ) {
    setSelectedSpectrum(item)

    setOpenForm(true)
  }

  function handleDelete(
    item: AntibioticSpectrum
  ) {
    setSelectedSpectrum(item)

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-primary font-bold mb-2">
            Phổ tác dụng kháng sinh
          </h1>

          <p className="text-muted-foreground">
            Quản lý các nhóm phổ tác dụng kháng sinh
          </p>
        </div>

        <Button
          className="gap-2"
          onClick={handleCreate}
        >
          <Plus className="h-4 w-4" />
            Thêm phổ mới
        </Button>
      </div>

      <AntibioticSpectrumTable
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

      <AntibioticSpectrumFormDialog
        open={openForm}
        onOpenChange={setOpenForm}
        initialData={
          selectedSpectrum
        }
      />

      {selectedSpectrum && (
        <DeleteAntibioticSpectrumDialog
          open={openDelete}
          onOpenChange={
            setOpenDelete
          }
          spectrumId={selectedSpectrum.id}
        />
      )}
    </main>
  )
}