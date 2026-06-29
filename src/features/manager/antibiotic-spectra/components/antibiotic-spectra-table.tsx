"use client"

import {
  Pencil,
  Trash2,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"

import { Button } from "@/src/components/ui/button"

import { AntibioticSpectrum } from "@/src/features/manager/antibiotic-spectra/types"

interface Props {
  data: AntibioticSpectrum[]

  onEdit: (
    item: AntibioticSpectrum
  ) => void

  onDelete: (
    item: AntibioticSpectrum
  ) => void
}

export function AntibioticSpectrumTable({
                                          data,
                                          onEdit,
                                          onDelete,
                                        }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <Table className="w-full border-collapse">
        <TableHeader className="bg-gray-50 text-gray-500">
          <TableRow className="grid grid-cols-9">
            <TableHead className="col-span-3 px-6 py-4 text-[12px] font-bold uppercase tracking-wider">
              Tên Phổ Kháng Sinh
            </TableHead>

            <TableHead className="col-span-4 px-6 py-4 text-[12px] font-bold uppercase tracking-wider">
              Mô Tả
            </TableHead>

            <TableHead className="col-span-2 px-6 py-4 text-right text-[12px] font-bold uppercase tracking-wider">
              Thao Tác
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-200">
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="grid grid-cols-9 hover:bg-blue-50/50 transition-colors"
            >
              <TableCell className="col-span-3 px-6 py-5 align-top">
                <p className="text-[15px] font-semibold text-primary">
                  {item.name}
                </p>
              </TableCell>

              <TableCell className="col-span-4 px-6 py-5 align-top">
                <p className="max-w-125 text-sm whitespace-pre-wrap wrap-break-word">
                  {item.description ||
                    "Không có mô tả"}
                </p>
              </TableCell>

              <TableCell className="col-span-2 px-6 py-5 align-top">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      onEdit(item)
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                      onDelete(item)
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}