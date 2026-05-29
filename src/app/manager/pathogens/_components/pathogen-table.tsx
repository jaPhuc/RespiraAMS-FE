"use client"
import { Pathogen } from "@/src/types/pathogen.type"
import { Edit, Trash2 } from "lucide-react"

interface Props {
  data: Pathogen[];
  onEdit: (item: Pathogen) => void;
  onDelete: (item: Pathogen) => void;
}

export function PathogenTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[30%]">Tên Tác Nhân</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[50%]">Mô Tả</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right w-[20%]">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((pathogen) => (
            <tr key={pathogen.id} className="hover:bg-purple-50/30 transition-colors">
              <td className="px-6 py-4 align-top">
                <p className="text-sm font-bold text-primary">{pathogen.name}</p>
              </td>
              <td className="px-6 py-4 align-top">
                <p className="text-sm text-gray-600 line-clamp-2">{pathogen.description}</p>
              </td>
              <td className="px-6 py-4 align-top text-right">
                <div className="flex justify-end gap-1">
                  <button onClick={() => onEdit(pathogen)} className="p-2 hover:bg-primary/20 rounded-lg text-gray-400 hover:text-primary transition-colors" title="Sửa">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(pathogen)} className="p-2 hover:bg-red-100 rounded-lg text-gray-400 hover:text-red-600 transition-colors" title="Xóa">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}