"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

import { Button } from "@/src/components/ui/button"

import { useDeleteAntibioticSpectrum } from "@/src/hooks/mutations/use-antibiotic-spectra"

interface Props {
  open: boolean

  onOpenChange: (
    value: boolean
  ) => void

  spectrumId: string
}

export function DeleteAntibioticSpectrumDialog({
                                                 open,
                                                 onOpenChange,
                                                 spectrumId,
                                               }: Props) {
  const deleteMutation =
    useDeleteAntibioticSpectrum()

  async function handleDelete() {
    await deleteMutation.mutateAsync(
      spectrumId
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
            Delete Spectrum
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to
          delete this antibiotic
          spectrum?
        </p>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={
              deleteMutation.isPending
            }
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}