"use client"
import { Edit, Trash2 } from "lucide-react"

export function DiseasePathogenTable({ data, onEdit, onDelete }: any) {
  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild": return <span className="bg-emerald-50 text-emerald-600 border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase border">Nhẹ</span>
      case "moderate": return <span className="bg-amber-50 text-amber-600 border-amber-200 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase border">Trung Bình</span>
      case "severe": return <span className="bg-red-50 text-red-600 border-red-200 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase border">Nặng</span>
      default: return <span className="bg-gray-100 text-gray-600 border-gray-200 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase border">{severity}</span>
    }
  } 

  const getSiteBadge = (site: string) => {
    switch (site.toLowerCase()) {
      case "outpatient": return <span className="text-teal-700 font-semibold text-xs">🏥 Ngoại trú</span>
      case "inpatient": return <span className="text-blue-700 font-semibold text-xs">🛏️ Nội trú</span>
      case "intensivecareunit": return <span className="text-purple-700 font-semibold text-xs">⚕️ ICU (Hồi sức TC)</span>
      default: return <span className="text-gray-700 font-semibold text-xs">{site}</span>
    }
  }

  return (
    <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase w-[40%]">Tác Nhân Gây Bệnh</th>
            <th className="px-6 py-4 text-xs font-bold uppercase w-[20%]">Mức Độ (Severity)</th>
            <th className="px-6 py-4 text-xs font-bold uppercase w-[25%]">Nơi Điều Trị</th>
            <th className="px-6 py-4 text-xs font-bold uppercase text-right w-[15%]">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item: any) => (
            <tr key={item.id} className="hover:bg-green-50/30 transition-colors">
              <td className="px-6 py-4 font-bold text-gray-800">🦠 {item.pathogen?.name}</td>
              <td className="px-6 py-4 text-sm font-medium">{getSeverityBadge(item.severity)}</td>
              <td className="px-6 py-4 text-sm font-medium">{getSiteBadge(item.treatmentSite)}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-1">
                  <button onClick={() => onEdit(item)} className="p-2 hover:bg-green-100 rounded-lg text-gray-400 hover:text-green-600 transition-colors" title="Sửa"><Edit className="h-4 w-4" /></button>
                  <button onClick={() => onDelete(item)} className="p-2 hover:bg-red-100 rounded-lg text-gray-400 hover:text-red-600 transition-colors" title="Xóa"><Trash2 className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}