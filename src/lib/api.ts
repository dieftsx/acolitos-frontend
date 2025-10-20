
import axios from "axios"
import { auth } from "./firebase"

// Criar instância do axios com configurações padrão
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Redirecionar para login se receber 401 (não autenticado)
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login?error=session_expired"
      }
    }
    return Promise.reject(error)
  },
)

// Funções de autenticação
export const authAPI = {
  // Verificar/criar usuário
  verifyUser: async (userData: {
    uid: string
    email: string
    name: string
    picture: string
  }) => {
    try {
      const response = await api.post("/auth/verify", userData)
      return response.data
    } catch (error) {
      console.error("Erro ao verificar usuário:", error)
      return null
    }
  },

  // Obter usuário atual
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me")
      return response.data
    } catch (error) {
      console.error("Erro ao obter usuário atual:", error)
      return null
    }
  },
}

// Funções para acólitos
export const acolitoAPI = {
  // Obter perfil
  getPerfil: async () => {
    const response = await api.get("/api/acolitos/perfil")
    return response.data
  },

  // Atualizar perfil
  updatePerfil: async (data: any) => {
    const response = await api.put("/api/acolitos/perfil", data)
    return response.data
  },

  // Obter escalas do acólito
  getEscalas: async (params?: any) => {
    const response = await api.get("/api/acolitos/escalas", { params })
    return response.data
  },

  // Obter escala específica
  getEscalaById: async (id: string) => {
    const response = await api.get(`/api/acolitos/escalas/${id}`)
    return response.data
  },

  // Responder a uma escala
  responderEscala: async (id: string, data: any) => {
    const response = await api.put(`/api/acolitos/escalas/${id}/responder`, data)
    return response.data
  },
}

// Funções para administradores
export const adminAPI = {
  // Obter dados do dashboard
  getDashboard: async () => {
    const response = await api.get("/api/admin/dashboard")
    return response.data
  },

  // Obter todos os acólitos
  getAllAcolitos: async (params?: any) => {
    const response = await api.get("/api/admin/acolitos", { params })
    return response.data
  },

  // Obter acólito por ID
  getAcolitoById: async (id: string) => {
    const response = await api.get(`/api/admin/acolitos/${id}`)
    return response.data
  },

  // Atualizar acólito
  updateAcolito: async (id: string, data: any) => {
    const response = await api.put(`/api/admin/acolitos/${id}`, data)
    return response.data
  },

  // Atualizar status do acólito
  updateAcolitoStatus: async (id: string, status: string) => {
    const response = await api.put(`/api/admin/acolitos/${id}/status`, { status })
    return response.data
  },

  // Criar novo acólito
  createAcolito: async (data: any) => {
    const response = await api.post("/api/admin/acolitos", data)
    return response.data
  },

  // Criar nova escala
  createEscala: async (data: any) => {
    const response = await api.post("/api/admin/escalas", data)
    return response.data
  },

  // Obter todas as escalas
  getAllEscalas: async (params?: any) => {
    const response = await api.get("/api/admin/escalas", { params })
    return response.data
  },

  // Obter escala por ID
  getEscalaById: async (id: string) => {
    const response = await api.get(`/api/admin/escalas/${id}`)
    return response.data
  },

  // Atualizar escala
  updateEscala: async (id: string, data: any) => {
    const response = await api.put(`/api/admin/escalas/${id}`, data)
    return response.data
  },

  // Excluir escala
  deleteEscala: async (id: string) => {
    const response = await api.delete(`/api/admin/escalas/${id}`)
    return response.data
  },
}

export default api
