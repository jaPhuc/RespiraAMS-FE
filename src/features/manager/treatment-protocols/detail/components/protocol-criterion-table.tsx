"use client"

export function ProtocolCriterionTable({ data }: { data: any[] }) {
  const renderNumericDetails = (min: number | null, max: number | null, unit: string | null, isExclusive: boolean | null) => {
    const formatVal = (val: number | null) => {
      if (val === null) return "0";
      if (val > 1E+300) return "∞";
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
        {isExclusive && <span className="text-[10px] text-amber-600 font-medium italic">* Không lấy giá trị biên</span>}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[40%]">Tên Tiêu Chuẩn</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-[60%]">Chi Tiết Thông Số</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
              <td className="px-6 py-4 align-top">
                <p className="text-sm font-bold text-gray-800">{item.name}</p>
              </td>
              <td className="px-6 py-4 align-top">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                  item.type.toLowerCase() === "numeric" ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}>
                  {item.type.toLowerCase() === "numeric" ? "Numeric (Số)" : "Boolean (Có/Không)"}
                </span>
                {item.type.toLowerCase() === "numeric" && renderNumericDetails(item.min, item.max, item.unit, item.isExclusive)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}