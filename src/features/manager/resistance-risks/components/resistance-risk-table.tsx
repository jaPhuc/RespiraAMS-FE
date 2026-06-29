import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { ResistanceRisk } from "@/src/features/manager/resistance-risks/types"

interface Props {
  data: ResistanceRisk[]
  diseaseMap: Record<string, string>
  onEdit: (item: ResistanceRisk) => void
  onDelete: (item: ResistanceRisk) => void
}

function criterionDescription(criterion: ResistanceRisk["criterion"]) {
  if (criterion.type === "numeric") {
    const op = criterion.isExclusive ? "<" : "≤"
    const unit = criterion.unit ? ` ${criterion.unit}` : ""

    if (criterion.min != null && criterion.max != null) {
      return `${criterion.min} ${op} value ${op} ${criterion.max}${unit}`
    }
    if (criterion.min != null) {
      return `value ${criterion.isExclusive ? ">" : "≥"} ${criterion.min}${unit}`
    }
    if (criterion.max != null) {
      return `value ${criterion.isExclusive ? "<" : "≤"} ${criterion.max}${unit}`
    }
  }
  return null
}

export function ResistanceRiskTable({ data, diseaseMap, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th colSpan={2} className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider">Bệnh lý</th>
            <th colSpan={2} className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider">Tác nhân</th>
            <th colSpan={3} className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider">Nguy cơ</th>
            <th colSpan={3} className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider">Tiêu chí</th>
            <th colSpan={2} className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => {
            const desc = criterionDescription(item.criterion)

            return (
            <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
              <td colSpan={2} className="px-4 py-5 align-top">
                <p className="text-[15px] font-semibold text-primary">
                  {diseaseMap[item.diseaseId] ?? item.diseaseId}
                </p>
              </td>
              <td colSpan={2} className="px-4 py-5 align-top">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.pathogen.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.pathogen.description}</p>
                </div>
              </td>
              <td colSpan={3} className="px-4 py-5 align-top">
                <p className="text-sm text-gray-600">{item.name}</p>
              </td>
              <td colSpan={3} className="px-4 py-5 align-top">
                <p className="text-sm text-gray-700">{item.criterion.name}</p>
                {desc && (
                  <p className="mt-1 text-xs text-gray-400 italic">{desc}</p>
                )}
              </td>
              <td colSpan={2} className="px-4 py-5 align-top text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button size="icon" variant="outline" onClick={() => onEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => onDelete(item)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
            )
          })}
          {data.length === 0 && (
            <tr>
              <td colSpan={12} className="px-6 py-12 text-center text-gray-400">
                Chưa có dữ liệu nguy cơ kháng thuốc
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
