import { PaginationResponse } from "./common.type"

export interface Pathogen {
  id: string
  name: string
  description: string
}

export type PathogensResponse = PaginationResponse<Pathogen>