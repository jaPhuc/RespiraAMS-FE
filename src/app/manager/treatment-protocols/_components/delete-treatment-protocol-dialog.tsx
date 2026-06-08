"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/src/components/ui/alert-dialog"
import { useDeleteTreatmentProtocol } from "@/src/hooks/mutations/use-treatment-protocol"

export function DeleteTreatmentProtocolDialog({ open, onOpenChange, protocolId }: any) {
  const deleteMutation = useDeleteTreatmentProtocol()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await deleteMutation.mutateAsync(protocolId)
      onOpenChange(false)
    } catch (error: any) {
      alert("Lỗi xóa: " + (error.response?.data?.detail || "Server tạch gòi!"))
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Xác nhận xóa phác đồ?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn xóa phác đồ này không? Hành động này không thể hoàn tác!
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