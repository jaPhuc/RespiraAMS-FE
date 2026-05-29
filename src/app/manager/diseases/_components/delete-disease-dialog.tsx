"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog"
import { useDeleteDisease } from "@/src/hooks/mutations/use-delete-disease"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  diseaseId: string
  diseaseName?: string
}

export function DeleteDiseaseDialog({ open, onOpenChange, diseaseId, diseaseName }: Props) {
  const deleteMutation = useDeleteDisease()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await deleteMutation.mutateAsync(diseaseId)
      onOpenChange(false)
    } catch (error: any) {
      alert("Xóa thất bại: " + (error.response?.data?.detail || "Lỗi hệ thống"))
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Xác nhận xóa bệnh lý?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa bệnh lý <span className="font-bold text-gray-800">{diseaseName}</span> không? 
            Hành động không thể hoàn tác!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}