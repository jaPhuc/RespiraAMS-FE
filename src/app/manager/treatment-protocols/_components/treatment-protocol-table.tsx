"use client"
import { TreatmentProtocol } from "@/src/types/treatment-protocol.type"
import { Edit, Trash2, FileText, Activity } from "lucide-react"
import { useDiseases } from "@/src/hooks/use-diseases"

interface Props {
  data: TreatmentProtocol[];
  onEdit: (item: TreatmentProtocol) => void;
  onDelete: (item: TreatmentProtocol) => void;
  onViewDetail: (id: string) => void;
}

export function TreatmentProtocolTable({ data, onEdit, onDelete, onViewDetail }: Props) {
  const { data: diseasesData } = useDiseases({ page: 1, pageSize: 100 })

  const getDiseaseName = (id: string) => {
    if (!diseasesData?.items) return id;
    const disease = diseasesData.items.find((d: { id: string; }) => d.id === id);
    return disease ? disease.name : id;
  }

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
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
          <tr>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider w-[20%]">Phân loại Điều trị</th>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider w-[20%]">Tác Nhân & Tiêu Chuẩn</th>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider w-[45%]">Kháng Sinh Phác Đồ</th>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-right w-[15%]">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
              
              <td className="px-5 py-4 align-top">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold text-[#006591] leading-tight" title={getDiseaseName(item.diseaseId)}>
                    {getDiseaseName(item.diseaseId)}
                  </p>
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(item.severity)}
                  </div>
                  <div>{getSiteBadge(item.treatmentSite)}</div>
                </div>
              </td>

              <td className="px-5 py-4 align-top">
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Tác Nhân Đặc Biệt</p>
                    {item.specialInfection ? (
                      <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-1 rounded text-xs font-medium inline-block">
                        🦠 {item.specialInfection.name}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Không có</span>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Đồng mắc / Nguy cơ</p>
                    {item.otherCriteria?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {item.otherCriteria.map(c => (
                          <span key={c.id} className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded text-[11px] font-medium">
                            {c.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Không có</span>
                    )}
                  </div>
                </div>
              </td>

              <td className="px-5 py-4 align-top">
                {item.medicines?.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {item.medicines.map((med) => (
                      <span key={med.id} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm">
                        💊 {med.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-400 italic">Chưa cấu hình thuốc</span>
                )}
              </td>
              
              <td className="px-5 py-4 align-top text-right">
                <div className="flex justify-end gap-1">
                  <button onClick={() => onViewDetail(item.id)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors" title="Chi tiết">
                    <FileText className="h-4 w-4" />
                  </button>
                  <button onClick={() => onEdit(item)} className="p-2 hover:bg-blue-100 rounded-lg text-gray-400 hover:text-[#006591] transition-colors" title="Sửa">
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