"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/src/components/ui/alert-dialog"
import { useDeleteDiseasePathogen } from "@/src/features/manager/diseases/detail/api"

export function DeleteDiseasePathogenDialog({ open, onOpenChange, pathogenId, pathogenName }: any) {
  const deleteMutation = useDeleteDiseasePathogen()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await deleteMutation.mutateAsync(pathogenId)
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
          <AlertDialogTitle className="text-red-600">Xác nhận xóa tác nhân này?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn gỡ tác nhân <span className="font-bold text-gray-800">{pathogenName}</span> khỏi bệnh lý này không?
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