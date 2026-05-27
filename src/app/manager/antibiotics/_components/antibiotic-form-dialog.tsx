"use client"

import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  useForm,
  useWatch,
} from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

import { Input } from "@/src/components/ui/input"

import { Checkbox } from "@/src/components/ui/checkbox"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"

import { Button } from "@/src/components/ui/button"

import {
  antibioticSchema,
  AntibioticFormValues,
} from "@/src/schemas/antibiotic.schema"

import {
  CATEGORY_OPTIONS,
  ROUTE_OPTIONS,
} from "@/src/constants/antibiotic"

import {
  mapAntibioticToForm,
  mapFormToPayload,
} from "@/src/app/mappers/antibiotic.mapper"

import { useAntibioticSpectra } from "@/src/hooks/queries/use-antibiotic-spectra"

import { useCreateAntibiotic } from "@/src/hooks/mutations/use-create-antibiotic"

import { useUpdateAntibiotic } from "@/src/hooks/mutations/use-update-antibiotic"

import {
  Plus,
  Trash2,
} from "lucide-react"

interface Props {
  open: boolean
  onOpenChange: (
    value: boolean
  ) => void
  initialData?: any
}

export function AntibioticFormDialog({
                                       open,
                                       onOpenChange,
                                       initialData,
                                     }: Props) {
  const isEdit = !!initialData

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } =
    useForm<AntibioticFormValues>({
      resolver:
        zodResolver(
          antibioticSchema
        ),

      defaultValues: {
        name: "",
        antibioticSpectrumId:
          "",
        category: "",
        routeOfAdministrations:
          [],
        dosages: {},
      },
    })

  const {
    data: spectrums,
  } = useAntibioticSpectra()

  const createMutation =
    useCreateAntibiotic()

  const updateMutation =
    useUpdateAntibiotic()

  useEffect(() => {
    if (initialData) {
      reset(
        mapAntibioticToForm(
          initialData
        )
      )
    }
  }, [initialData, reset])

  const dosagesState =
    useWatch({
      control,
      name: "dosages",
    })

  const routesState =
    useWatch({
      control,
      name:
        "routeOfAdministrations",
    })

  function handleRouteChange(
    routeValue: string,
    checked: boolean
  ) {
    const currentRoutes =
      routesState || []

    if (checked) {
      setValue(
        "routeOfAdministrations",
        [
          ...currentRoutes,
          routeValue,
        ]
      )

      setValue(
        "dosages",
        {
          ...dosagesState,

          [routeValue]:
            dosagesState?.[
              routeValue
              ] || [""],
        }
      )
    } else {
      setValue(
        "routeOfAdministrations",
        currentRoutes.filter(
          (r) =>
            r !== routeValue
        )
      )

      const currentDosages =
        {
          ...dosagesState,
        }

      delete currentDosages[
        routeValue
        ]

      setValue(
        "dosages",
        currentDosages
      )
    }
  }

  async function onSubmit(
    values: AntibioticFormValues
  ) {
    const payload =
      mapFormToPayload(values)

    if (isEdit) {
      await updateMutation.mutateAsync(
        {
          id: initialData.id,
          payload,
        }
      )
    } else {
      await createMutation.mutateAsync(
        payload
      )
    }

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Chỉnh Sửa Kháng Sinh"
              : "Thêm Kháng Sinh Mới"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(
            onSubmit,
            (errors) =>
              console.log(errors)
          )}
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Tên Kháng Sinh<span className="text-red-500">*</span>
            </label>

            <Input
              {...register(
                "name"
              )}
              placeholder="Nhập tên kháng sinh"
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {
                  errors.name
                    .message
                }
              </p>
            )}
          </div>

          {/* Spectrum */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Phổ kháng sinh<span className="text-red-500">*</span>
            </label>

            <Select
              value={watch(
                "antibioticSpectrumId"
              )}
              onValueChange={(
                value
              ) =>
                setValue(
                  "antibioticSpectrumId",
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn phổ kháng sinh" />
              </SelectTrigger>

              <SelectContent>
                {spectrums?.items?.map(
                  (
                    item: any
                  ) => (
                    <SelectItem
                      key={
                        item.id
                      }
                      value={
                        item.id
                      }
                    >
                      {
                        item.name
                      }
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            {errors.antibioticSpectrumId && (
              <p className="text-sm text-red-500">
                {
                  errors
                    .antibioticSpectrumId
                    .message
                }
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Phân Loại AWaRe<span className="text-red-500">*</span>
            </label>

            <Select
              value={watch("category")}
              onValueChange={(value) =>
                setValue("category", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn phân loại" />
              </SelectTrigger>

              <SelectContent>
                {CATEGORY_OPTIONS.map(
                  (item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            {errors.category && (
              <p className="text-sm text-red-500">
                {
                  errors.category
                    .message
                }
              </p>
            )}
          </div>

          {/* Routes & Dosages */}
          <div className="space-y-4">
            <label className="text-sm font-medium">
              Đường Dùng &
              Liều Dùng
            </label>

            {ROUTE_OPTIONS.map(
              (route) => {
                const checked =
                  routesState?.includes(
                    route.value
                  )

                const dosages =
                  dosagesState?.[
                    route.value
                    ] || []

                return (
                  <div
                    key={
                      route.value
                    }
                    className="rounded-xl border p-4 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={
                          checked
                        }
                        onCheckedChange={(
                          value
                        ) =>
                          handleRouteChange(
                            route.value,
                            !!value
                          )
                        }
                      />

                      <label className="font-medium">
                        {
                          route.label
                        }
                      </label>
                    </div>

                    {checked && (
                      <div className="space-y-3">
                        {dosages.map(
                          (
                            dosage,
                            index
                          ) => (
                            <div
                              key={
                                index
                              }
                              className="flex items-center gap-2"
                            >
                              <Input
                                value={dosage}
                                placeholder="Nhập liều dùng"
                                onChange={(
                                  e
                                ) => {
                                  const updatedDosages =
                                    [
                                      ...dosages,
                                    ]

                                  updatedDosages[
                                    index
                                    ] =
                                    e
                                      .target
                                      .value

                                  setValue(
                                    "dosages",
                                    {
                                      ...dosagesState,

                                      [route.value]:
                                      updatedDosages,
                                    }
                                  )
                                }}
                              />

                              <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                onClick={() => {
                                  const updatedDosages =
                                    dosages.filter(
                                      (
                                        _,
                                        i
                                      ) =>
                                        i !==
                                        index
                                    )

                                  setValue(
                                    "dosages",
                                    {
                                      ...dosagesState,

                                      [route.value]:
                                      updatedDosages,
                                    }
                                  )
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        )}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            setValue(
                              "dosages",
                              {
                                ...watch(
                                  "dosages"
                                ),

                                [route.value]:
                                  [
                                    ...dosages,
                                    "",
                                  ],
                              }
                            )
                          }}
                        >
                          <Plus className="h-4 w-4" />

                          Thêm Liều Dùng
                        </Button>
                      </div>
                    )}
                  </div>
                )
              }
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              createMutation.isPending ||
              updateMutation.isPending
            }
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