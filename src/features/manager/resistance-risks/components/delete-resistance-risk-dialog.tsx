"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

import { Button } from "@/src/components/ui/button"

import { useDeleteResistanceRisk } from "@/src/features/manager/resistance-risks/api"

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
  resistanceRiskId: string
}

export function DeleteResistanceRiskDialog({
  open,
  onOpenChange,
  resistanceRiskId,
}: Props) {
  const mutation = useDeleteResistanceRisk()

  async function handleDelete() {
    await mutation.mutateAsync(resistanceRiskId)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa Nguy Cơ Kháng Thuốc</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            Bạn có chắc chắn muốn xóa nguy cơ kháng thuốc này không? Hành động này không thể hoàn tác.
          </p>

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
          >
            Xóa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
