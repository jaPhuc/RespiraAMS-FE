import { Pathogen } from "@/src/types/pathogen.type"
import { PathogenFormValues } from "@/src/schemas/pathogen.schema"

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