import { HeartPulse, Wind, Activity, FileText } from "lucide-react"

export function StatisticsCards({ totalCount }: { totalCount: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="rounded-lg bg-blue-50 p-2 text-[#006591]">
            <HeartPulse className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-[#006591]">{totalCount}</h3>
        <p className="text-sm text-gray-500 font-medium">Tổng số bệnh lý</p>
      </div>
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
            <Wind className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-emerald-600">5</h3>
        <p className="text-sm text-gray-500 font-medium">Viêm phổi cộng đồng</p>
      </div>
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
            <Activity className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-amber-600">24</h3>
        <p className="text-sm text-gray-500 font-medium">Tiêu chuẩn ICU</p>
      </div>
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
            <FileText className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-purple-600">36</h3>
        <p className="text-sm text-gray-500 font-medium">Phác đồ điều trị</p>
      </div>
    </div>
  )
}