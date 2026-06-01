"use client"
import { Edit, Trash2 } from "lucide-react"

export function ResistanceRiskTable({ data, onEdit, onDelete }: any) {
  
  const renderNumericDetails = (min: number | null, max: number | null, unit: string | null, isExclusive: boolean | null) => {
    const formatVal = (val: number | null) => val === null ? "0" : (val > 1E+300 ? "∞" : val.toString());
    const bracketOpen = isExclusive ? "(" : "[";
    const bracketClose = isExclusive ? ")" : "]";
    return (
      <div className="flex flex-col gap-1 mt-1.5">
        <span className="text-[11px] font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded w-fit border border-gray-200">
          Phạm vi: <span className="text-blue-600">{bracketOpen}{formatVal(min)} - {formatVal(max)}{bracketClose}</span>
        </span>
        {unit && <span className="text-[11px] font-medium text-gray-500">Đơn vị: <span className="text-gray-800">{unit}</span></span>}
        {isExclusive && <span className="text-[10px] text-amber-600 font-medium italic">* Không lấy giá trị biên</span>}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase w-[25%]">Tên Nguy Cơ</th>
            <th className="px-6 py-4 text-xs font-bold uppercase w-[25%]">Tác Nhân Liên Quan</th>
            <th className="px-6 py-4 text-xs font-bold uppercase w-[35%]">Tiêu Chuẩn Kèm Theo</th>
            <th className="px-6 py-4 text-xs font-bold uppercase text-right w-[15%]">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item: any) => (
            <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
              <td className="px-6 py-4 align-top font-bold text-gray-800">{item.name}</td>
              <td className="px-6 py-4 align-top">
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-md">🦠 {item.pathogen?.name}</span>
              </td>
              
              <td className="px-6 py-4 align-top">
                <p className="text-sm font-bold text-amber-700 mb-1.5">{item.criterion?.name}</p>
                
                {/* Badge Type */}
                <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                  item.criterion?.type?.toLowerCase() === "numeric" 
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}>
                  {item.criterion?.type?.toLowerCase() === "numeric" ? "Numeric (Số)" : "Boolean (Có/Không)"}
                </span>

                {item.criterion?.type?.toLowerCase() === "numeric" && renderNumericDetails(
                  item.criterion.min, 
                  item.criterion.max, 
                  item.criterion.unit, 
                  item.criterion.isExclusive
                )}
              </td>

              <td className="px-6 py-4 align-top text-right">
                <div className="flex justify-end gap-1">
                  <button onClick={() => onEdit(item)} className="p-2 hover:bg-amber-100 rounded-lg text-gray-400 hover:text-amber-600 transition-colors" title="Sửa"><Edit className="h-4 w-4" /></button>
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