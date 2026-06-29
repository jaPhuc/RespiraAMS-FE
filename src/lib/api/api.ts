import { api } from "@/src/lib/axios"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface ApiOptions {
  method?: HttpMethod
  params?: Record<string, unknown>
  data?: unknown
}

export async function apiFetch<T>(url: string, options: ApiOptions = {}): Promise<T> {
  const { method = "GET", params, data } = options
  const response = await api({
    method,
    url,
    params,
    data,
  })
  return response.data as T
}
