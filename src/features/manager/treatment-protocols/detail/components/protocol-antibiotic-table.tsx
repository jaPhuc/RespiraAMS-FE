"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

export function ProtocolAntibioticTable({ data }: { data: any[] }) {
  const renderCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case "access": return <span className="bg-green-100 text-green-800 border border-green-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">Access</span>;
      case "watch": return <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">Watch</span>;
      case "reserve": return <span className="bg-red-100 text-red-800 border border-red-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">Reserve</span>;
      case "accesswatch": return <span className="bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">Access / Watch</span>;
      default: return <span className="bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full text-[13px] font-semibold">{category}</span>;
    }
  };

  return (
    <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
      <Table className="w-full text-left border-collapse">
        <TableHeader className="bg-gray-50 text-gray-500">
          <TableRow>
            <TableHead className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider">Tên Thuốc</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider">Phân Loại</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider">Phổ Kháng Khuẩn</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider">Đường Dùng & Liều Dùng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data.map((item) => (
            <TableRow key={item.id} className="hover:bg-blue-50/50 transition-colors">
              <TableCell className="font-medium px-6 py-5 align-top">
                <p className="text-[15px] font-semibold text-[#006591]">{item.name}</p>
              </TableCell>
              <TableCell className="px-6 py-5 align-top">
                {renderCategoryBadge(item.category)}
              </TableCell>
              <TableCell className="px-6 py-5 align-top">
                <span className="inline-block border border-gray-300 text-gray-700 px-3 py-1 rounded text-[13px] font-medium bg-white shadow-sm">
                  {item.antibioticSpectrum?.name || "Khác"}
                </span>
              </TableCell>
              <TableCell className="px-6 py-5 align-top">
                <div className="space-y-3">
                  {item.routeOfAdministrations?.map((route: string) => (
                    <div key={route}>
                      <p className="font-bold text-gray-800 uppercase text-xs mb-1 bg-gray-100 w-fit px-2 py-0.5 rounded">{route}</p>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {item.dosages[route]?.map((dosage: string) => (
                          <li key={dosage}>{dosage}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}