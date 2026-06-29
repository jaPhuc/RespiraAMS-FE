import { Pathogen } from "@/src/features/manager/pathogens/types"
import { PathogenFormValues } from "@/src/features/manager/pathogens/schema"

export function mapPathogenToForm(pathogen: Pathogen): PathogenFormValues {
  return {
    name: pathogen.name,
    description: pathogen.description,
  }
}

export function mapFormToPathogenPayload(values: PathogenFormValues) {
  return {
    name: values.name,
    description: values.description,
  }
}