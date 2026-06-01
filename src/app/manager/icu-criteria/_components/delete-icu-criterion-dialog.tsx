"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/src/components/ui/alert-dialog"
import { useDeleteIcuCriterion } from "@/src/hooks/mutations/use-icu-criterion"

export function DeleteIcuCriterionDialog({ open, onOpenChange, criterionId, criterionName }: any) {
  const deleteMutation = useDeleteIcuCriterion()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await deleteMutation.mutateAsync(criterionId)
      onOpenChange(false)
    } catch (error: any) {
      alert("Lỗi xóa: " + (error.response?.data?.detail || "lỗi Server!"))
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Xác nhận xóa tiêu chuẩn?</AlertDialogTitle>
          <AlertDialogDescription>
            Có chắc muốn xóa tiêu chuẩn <span className="font-bold text-gray-800">{criterionName}</span> không? Hành động này không thể hoàn tác!
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