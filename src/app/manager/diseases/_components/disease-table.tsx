"use client"
import { Disease } from "@/src/types/disease.type"
import { Edit, Trash2, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
  data: Disease[];
  onEdit: (item: Disease) => void;
  onDelete: (item: Disease) => void;
}

export function DiseaseTable({ data, onEdit, onDelete }: Props) {
  const router = useRouter()
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[20%]">Tên Bệnh Lý</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[40%]">Mô Tả</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[20%]">Tiêu Chuẩn ICU</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right w-[20%]">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((disease) => (
            <tr key={disease.id} className="hover:bg-blue-50/30 transition-colors">
              <td className="px-6 py-4 align-top">
                <p className="text-sm font-bold text-[#006591]">{disease.name}</p>
              </td>
              <td className="px-6 py-4 align-top">
                <p className="text-sm text-gray-600 line-clamp-2">{disease.description}</p>
              </td>
              <td className="px-6 py-4 align-top">
                <div className="inline-flex flex-col gap-1">
                  <span className="bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs font-semibold border border-red-100">
                    {disease.requiredIcuMainCriteria} Chính
                  </span>
                  <span className="bg-amber-50 text-amber-600 px-2 py-1 rounded-md text-xs font-semibold border border-amber-100">
                    {disease.requiredIcuSecondaryCriteria} Phụ
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 align-top text-right">
                <div className="flex justify-end gap-1">
                  <button 
                    onClick={() => router.push(`/manager/diseases/${disease.id}`)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors" 
                    title="Chi tiết"
                  >
                    <FileText className="h-4 w-4" />
                  </button>
                  
                  <button onClick={() => onEdit(disease)} className="p-2 hover:bg-blue-100 rounded-lg text-gray-400 hover:text-[#006591] transition-colors" title="Sửa">
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button onClick={() => onDelete(disease)} className="p-2 hover:bg-red-100 rounded-lg text-gray-400 hover:text-red-600 transition-colors" title="Xóa">
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