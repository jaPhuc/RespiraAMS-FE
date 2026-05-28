"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/src/components/ui/alert-dialog"
import { useDeletePathogen } from "@/src/hooks/mutations/use-delete-pathogen"

export function DeletePathogenDialog({ open, onOpenChange, pathogenId, pathogenName }: any) {
  const deleteMutation = useDeletePathogen()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await deleteMutation.mutateAsync(pathogenId)
      onOpenChange(false)
    } catch (error: any) {
      alert("Lỗi: " + (error.response?.data?.detail || "Không thể xóa"))
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Xác nhận xóa tác nhân?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn xóa <span className="font-bold text-gray-800">{pathogenName}</span> không? Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending} className="bg-red-600 hover:bg-red-700">
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}