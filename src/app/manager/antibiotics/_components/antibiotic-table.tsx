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
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Routes & Dosages</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.name}
              </TableCell>

              <TableCell>
                {item.antibioticSpectrum.name}
              </TableCell>

              <TableCell>
                <Badge>{item.category}</Badge>
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
              <TableCell>
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