"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

import { Button } from "@/src/components/ui/button"

import { useDeleteAntibiotic } from "@/src/hooks/mutations/use-delete-antibiotic"

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
            Delete Antibiotic
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            Are you sure you want to
            delete this antibiotic?
          </p>

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}