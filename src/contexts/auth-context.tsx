"use client"

import React, { createContext, useContext } from "react"

type User = {
  id: string
  nome: string
  email: string
  foto?: string
  tipo?: string
  status?: string
}

type AuthContextValue = {
  user: User | null
}

const AuthContext = createContext<AuthContextValue>({ user: null })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Minimal stub: in the real app this should come from auth state
  const user: User | null = null

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

export default useAuth
