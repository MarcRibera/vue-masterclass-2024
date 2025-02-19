import type { CustomError, ExtendedPostgresError } from '@/types/Error'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgresError>(null)
  const isCustomError = ref(false)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | ExtendedPostgresError | Error
    customCode?: number
  }) => {
    if (typeof error === 'string') isCustomError.value = true

    if (typeof error === 'string') {
      activeError.value = new Error(error)
      activeError.value.customCode = customCode || 500
      return
    }

    if (error instanceof Error) {
      activeError.value = error
      activeError.value.customCode = customCode || 500
      return
    }

    activeError.value = error
    activeError.value.statusCode = customCode || 500
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }
  return { activeError, isCustomError, clearError, setError }
})
