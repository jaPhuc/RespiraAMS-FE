"use client"

import { useEffect } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

import { Input } from "@/src/components/ui/input"

import { Button } from "@/src/components/ui/button"

import { Textarea } from "@/src/components/ui/textarea"

import { antibioticSpectrumSchema, AntibioticSpectrumSchemaFormValues  } from "@/src/schemas/antibiotic-spectrum.schema"

import { useCreateAntibioticSpectrum, useUpdateAntibioticSpectrum } from "@/src/hooks/mutations/use-antibiotic-spectra"

interface Props {
  open: boolean
  onOpenChange: (
    value: boolean
  ) => void

  initialData?: {
    id: string
    name: string
    description: string
  } | null
}

export function AntibioticSpectrumFormDialog({
                                               open,
                                               onOpenChange,
                                               initialData,
                                             }: Props) {
  const isEdit = !!initialData

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AntibioticSpectrumSchemaFormValues>({
    resolver: zodResolver(antibioticSpectrumSchema),

    defaultValues: {
      name: "",
      description: "",
    },
  })

  const createMutation =
    useCreateAntibioticSpectrum()

  const updateMutation =
    useUpdateAntibioticSpectrum()

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description:
        initialData.description,
      })
    } else {
      reset({
        name: "",
        description: "",
      })
    }
  }, [initialData, reset])

  async function onSubmit(
    values: AntibioticSpectrumSchemaFormValues
  ) {
    if (isEdit) {
      await updateMutation.mutateAsync(
        {
          id: initialData.id,
          payload: values,
        }
      )
    } else {
      await createMutation.mutateAsync(
        values
      )
    }

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Update Spectrum"
              : "Create Spectrum"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Name<span className="text-red-500">*</span>
            </label>

            <Input
              {...register("name")}
              placeholder="Spectrum name"
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {
                  errors.name.message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description<span className="text-red-500">*</span>
            </label>

            <Textarea
              {...register(
                "description"
              )}
              placeholder="Description"
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {
                  errors
                    .description
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            {isEdit
              ? "Update"
              : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}