"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

import { Button } from "@/src/components/ui/button"

import { useDeleteAntibiotic } from "@/src/features/manager/antibiotics/api"

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
  antibioticId: string
}

export function DeleteAntibioticDialog({
                                         open,
                                         onOpenChange,
                                         antibioticId,
                                       }: Props) {
  const mutation =
    useDeleteAntibiotic()

  async function handleDelete() {
    await mutation.mutateAsync(
      antibioticId
    )

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Xóa Kháng Sinh
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            Bạn có chắc chắn muốn xóa kháng sinh này không? Hành động này không thể hoàn tác.
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