"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { acolitoAPI } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, CalendarIcon } from "lucide-react"

export default function PerfilPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    dataNascimento: "",
    tipo: "acolito",
  })

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        setLoading(true)
        const response = await acolitoAPI.getPerfil()
        if (response.success) {
          const perfil = response.data
          setFormData({
            nome: perfil.nome || "",
            telefone: perfil.telefone || "",
            dataNascimento: perfil.dataNascimento ? perfil.dataNascimento.split("T")[0] : "",
            tipo: perfil.tipo || "acolito",
          })
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPerfil()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSaving(true)

      const updateData = {
        ...formData,
        dataNascimento: formData.dataNascimento ? new Date(formData.dataNascimento).toISOString() : undefined,
      }

      const response = await acolitoAPI.updatePerfil(updateData)

      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Perfil atualizado com sucesso!",
        })
      }
    } catch (error: unknown) {
      console.error("Erro ao atualizar perfil:", error)
      const extractMessage = (err: unknown): string | undefined => {
        if (typeof err === "object" && err !== null) {
          const e = err as Record<string, unknown>
          const response = e["response"] as Record<string, unknown> | undefined
          if (response && response["data"] && typeof response["data"] === "object") {
            const data = response["data"] as Record<string, unknown>
            const msg = data["message"]
            return typeof msg === "string" ? msg : undefined
          }
        }
        return undefined
      }

      const message = extractMessage(error)
      toast({
        title: "Erro",
        description: message || "Não foi possível atualizar o perfil.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calcularIdade = () => {
    if (!formData.dataNascimento) return null

    const hoje = new Date()
    const nascimento = new Date(formData.dataNascimento)
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const m = hoje.getMonth() - nascimento.getMonth()

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--
    }

    return idade
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const idade = calcularIdade()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Foto de Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user?.foto || "/placeholder.svg"} />
              <AvatarFallback className="text-4xl">{user?.nome ? getInitials(user.nome) : "AC"}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-lg">{user?.nome}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="mt-2 flex gap-2 justify-center">
                <Badge>{user?.tipo === "acolito" ? "Acólito" : "Coroinha"}</Badge>
                <Badge
                  variant={user?.status === "ativo" ? "default" : user?.status === "pendente" ? "secondary" : "outline"}
                >
                  {user?.status === "ativo" ? "Ativo" : user?.status === "pendente" ? "Pendente" : "Inativo"}
                </Badge>
              </div>
            </div>

            <div className="w-full space-y-3 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              {formData.dataNascimento && idade && (
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Idade:</span>
                  <span className="font-medium">{idade} anos</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => handleChange("telefone", e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => handleChange("dataNascimento", e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {idade !== null && <p className="text-sm text-muted-foreground">{idade} anos</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleChange("tipo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acolito">Acólito</SelectItem>
                      <SelectItem value="coroinha">Coroinha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={saving}>
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
