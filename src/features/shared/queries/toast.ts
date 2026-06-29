import { toast } from "sonner"

export function notifySuccess(message: string) {
  toast.success(message)
}

export function notifyError(message: string) {
  toast.error(message)
}

export function notifyLoading(message: string) {
  toast.loading(message)
}

export function notifyDismiss() {
  toast.dismiss()
}
