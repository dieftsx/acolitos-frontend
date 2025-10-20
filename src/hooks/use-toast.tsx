"use client"

import { useCallback } from "react"
import { toast as sonnerToast } from "sonner"

type ToastOptions = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning'
}

export function useToast() {
  const toast = useCallback((opts: ToastOptions) => {
    // Map variant to Sonner usage; keep it simple
    sonnerToast(opts.description || opts.title || '')
  }, [])

  return { toast }
}

export default useToast
