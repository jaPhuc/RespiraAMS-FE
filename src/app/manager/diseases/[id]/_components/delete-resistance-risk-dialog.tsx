"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/src/components/ui/alert-dialog"
import { useDeleteResistanceRisk } from "@/src/hooks/mutations/use-resistance-risk"

export function DeleteResistanceRiskDialog({ open, onOpenChange, riskId, riskName }: any) {
  const deleteMutation = useDeleteResistanceRisk()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await deleteMutation.mutateAsync(riskId)
      onOpenChange(false)
    } catch (error: any) {
      alert("Lỗi xóa: " + (error.response?.data?.detail || "Lỗi Server!"))
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Xác nhận xóa yếu tố nguy cơ?</AlertDialogTitle>
          <AlertDialogDescription>
            Có chắc muốn xóa nguy cơ <span className="font-bold text-gray-800">{riskName}</span> không? Hành động này không thể hoàn tác!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending} className="bg-red-600 hover:bg-red-700 text-white">
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}