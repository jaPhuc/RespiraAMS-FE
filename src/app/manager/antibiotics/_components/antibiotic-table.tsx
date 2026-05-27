import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"

import { Badge } from "@/src/components/ui/badge"

import { Antibiotic } from "@/src/types/antibiotic.type"
import { Button } from "@/src/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface Props {
  data: Antibiotic[]

  onEdit: (
    item: Antibiotic
  ) => void

  onDelete: (
    item: Antibiotic
  ) => void
}

export function AntibioticTable({
    data,
    onEdit,
    onDelete,
  }: Props) {

    const renderCategoryBadge = (category: string) => {
    switch (category) {
      case "Access":
        return <span className="bg-green-100 text-green-800 border border-green-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">Access</span>;
      case "Watch":
        return <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">Watch</span>;
      case "Reserve":
        return <span className="bg-red-100 text-red-800 border border-red-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">Reserve</span>;
      case "AccessWatch":
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">Access / Watch</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">{category}</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full text-left border-collapse">
        <TableHeader className="bg-gray-50 text-gray-500">
          <TableRow>
            <TableHead className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider">Tên Thuốc</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider">Phân Loại</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider">Phổ Kháng Khuẩn</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider">Đường Dùng & Liều Dùng</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-right">Thao Tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-200">
          {data.map((item) => (
              <TableRow key={item.id} className={`hover:bg-blue-50/50 transition-colors `}>
              <TableCell className="font-medium px-6 py-5 align-top">
                <p className="text-[15px] font-semibold text-primary">{item.name}</p>
              </TableCell>

              <TableCell className="px-6 py-5 align-top">
                <span className="inline-block border border-gray-300 text-gray-700 px-3 py-1 rounded text-[13px] font-medium bg-white shadow-sm">
                    {item.antibioticSpectrum.name}
                  </span>
              </TableCell>

              <TableCell className="px-6 py-5 align-top">
                {renderCategoryBadge(item.category)}
              </TableCell>

              <TableCell>
                <div className="space-y-2">
                  {item.routeOfAdministrations.map(
                    (route) => (
                      <div key={route}>
                        <p className="font-medium">
                          {route}
                        </p>

                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          {item.dosages[route]?.map(
                            (dosage) => (
                              <li key={dosage}>
                                {dosage}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </TableCell>
              <TableCell className="px-6 py-5 align-top text-right">
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