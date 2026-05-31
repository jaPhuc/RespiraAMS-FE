"use client"
import { IcuCriterion } from "@/src/types/icu-criterion.type"
import { Edit, Trash2 } from "lucide-react"

interface Props {
  data: IcuCriterion[];
  onEdit: (item: IcuCriterion) => void;
  onDelete: (item: IcuCriterion) => void;
}

export function IcuCriterionTable({ data, onEdit, onDelete }: Props) {
  
  const renderNumericDetails = (min: number | null, max: number | null, unit: string | null, isExclusive: boolean | null) => {
    const formatVal = (val: number | null) => {
      if (val === null) return "0";
    //   if (val > 1+300) return "∞";
      return val.toString();
    };

    const bracketOpen = isExclusive ? "(" : "[";
    const bracketClose = isExclusive ? ")" : "]";

    return (
      <div className="flex flex-col gap-1.5 mt-2">
        <span className="text-[11px] font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded w-fit border border-gray-200">
          Phạm vi: <span className="text-blue-600">{bracketOpen}{formatVal(min)} - {formatVal(max)}{bracketClose}</span>
        </span>
        {unit && <span className="text-[11px] font-medium text-gray-500">Đơn vị: <span className="text-gray-800">{unit}</span></span>}
        {isExclusive && (
          <span className="text-[10px] text-amber-600 font-medium italic">* Không lấy giá trị biên (Exclusive)</span>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[25%]">Tên Tiêu Chuẩn</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[20%]">Target Disease</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[10%]">Mức Độ</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[30%]">Chi Tiết Thông Số</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right w-[15%]">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
              
              <td className="px-6 py-4 align-top">
                <p className="text-sm font-bold text-primary">{item.criterion?.name}</p>
              </td>

              <td className="px-6 py-4 align-top">
                <div className="bg-blue-50 px-2 py-1 rounded border border-blue-100 w-fit">
                  <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">ID Bệnh Lý</p>
                  <p className="text-xs text-blue-700 font-mono mt-0.5 truncate max-w-[150px]" title={item.diseaseId}>
                    {item.diseaseId.split('-')[0]}...{item.diseaseId.split('-')[4]}
                  </p>
                </div>
              </td>
              
              <td className="px-6 py-4 align-top">
                {item.isMainCriteria ? (
                  <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-[11px] font-bold border border-red-100 uppercase tracking-wide">
                    Chính
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md text-[11px] font-bold border border-amber-100 uppercase tracking-wide">
                    Phụ
                  </span>
                )}
              </td>
              
              <td className="px-6 py-4 align-top">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                  item.criterion?.type.toLowerCase() === "numeric" 
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}>
                  {item.criterion?.type.toLowerCase() === "numeric" ? "Numeric (Số)" : "Boolean (Có/Không)"}
                </span>

                {item.criterion?.type.toLowerCase() === "numeric" && renderNumericDetails(
                  item.criterion.min,
                  item.criterion.max,
                  item.criterion.unit,
                  item.criterion.isExclusive
                )}
              </td>
              
              <td className="px-6 py-4 align-top text-right">
                <div className="flex justify-end gap-1">
                  <button onClick={() => onEdit(item)} className="p-2 hover:bg-primary rounded-lg text-gray-400 hover:text-primary transition-colors" title="Sửa">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(item)} className="p-2 hover:bg-red-100 rounded-lg text-gray-400 hover:text-red-600 transition-colors" title="Xóa">
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