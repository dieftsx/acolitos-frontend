
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { adminAPI } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { auth } from '@/lib/firebase'

interface Acolito {
  id: string
  nome: string
  email: string
  tipo?: "acolito" | "coroinha"
  status: string
}

export default function NovaEscalaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [acolitos, setAcolitos] = useState<Acolito[]>([])
  const [acolitosSelecionados, setAcolitosSelecionados] = useState<Set<string>>(new Set())
  const [loadingAcolitos, setLoadingAcolitos] = useState(true)

  // Estados do formulário
  const [formData, setFormData] = useState({
    data: "",
    hora: "",
    tipo: "Missa",
    local: "",
    descricao: "",
  })

  // Carregar acólitos disponíveis
  useEffect(() => {
    const fetchAcolitos = async () => {
      try {
        setLoadingAcolitos(true)
        const response = await adminAPI.getAllAcolitos({ status: "ativo" })
        if (response.success) {
          setAcolitos(response.data)
        }
      } catch (error) {
        console.error("Erro ao carregar acólitos:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar a lista de acólitos.",
          variant: "destructive",
        })
      } finally {
        setLoadingAcolitos(false)
      }
    }

    fetchAcolitos()
  }, [toast])

  // Função para alternar seleção de acólito
  const toggleAcolito = (acolitoId: string) => {
    const newSet = new Set(acolitosSelecionados)
    if (newSet.has(acolitoId)) {
      newSet.delete(acolitoId)
    } else {
      newSet.add(acolitoId)
    }
    setAcolitosSelecionados(newSet)
  }

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (acolitosSelecionados.size === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um acólito para a escala.",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      const escalaData = {
        data: new Date(formData.data + "T00:00:00").toISOString(),
        hora: formData.hora,
        tipo: formData.tipo,
        local: formData.local,
        descricao: formData.descricao,
        acolitos: Array.from(acolitosSelecionados).map((acolitoId) => ({
          acolitoId,
        })),
      }

      const response = await adminAPI.createEscala(escalaData)

      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Escala criada com sucesso!",
        })
        router.push("/admin/escalas")
      } else {
        throw new Error(response.message || "Erro ao criar escala")
      }
    } catch (error: unknown) {
      console.error("Erro ao criar escala:", error)

      let errorMessage = "Não foi possível criar a escala."
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "object" && error !== null) {
        const maybe = (error as any)?.response?.data?.message
        if (typeof maybe === "string") errorMessage = maybe
      }

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Função para atualizar campos do formulário
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/escalas">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nova Escala</h1>
          <p className="text-muted-foreground">Crie uma nova escala para missa ou celebração</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Celebração</CardTitle>
              <CardDescription>Preencha os detalhes da missa ou celebração</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  required
                  value={formData.data}
                  onChange={(e) => handleChange("data", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hora">Hora *</Label>
                <Input
                  id="hora"
                  type="time"
                  required
                  value={formData.hora}
                  onChange={(e) => handleChange("hora", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo *</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleChange("tipo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Missa">Missa</SelectItem>
                    <SelectItem value="Adoração">Adoração</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="local">Local *</Label>
                <Input
                  id="local"
                  placeholder="Ex: Igreja Matriz"
                  required
                  value={formData.local}
                  onChange={(e) => handleChange("local", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição (opcional)</Label>
                <Textarea
                  id="descricao"
                  placeholder="Informações adicionais sobre a celebração..."
                  rows={4}
                  value={formData.descricao}
                  onChange={(e) => handleChange("descricao", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acólitos</CardTitle>
              <CardDescription>
                Selecione os acólitos que participarão ({acolitosSelecionados.size} selecionados)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingAcolitos ? (
                <div className="text-center py-8">Carregando acólitos...</div>
              ) : acolitos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhum acólito ativo encontrado.</p>
                  <Button variant="link" asChild className="mt-2">
                    <Link href="/admin/acolitos/novo">Cadastrar novo acólito</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {acolitos.map((acolito) => (
                    <div key={acolito.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent">
                      <Checkbox
                        id={`acolito-${acolito.id}`}
                        checked={acolitosSelecionados.has(acolito.id)}
                        onCheckedChange={() => toggleAcolito(acolito.id)}
                      />
                      <label htmlFor={`acolito-${acolito.id}`} className="flex-1 cursor-pointer select-none space-y-1">
                        <p className="font-medium leading-none">{acolito.nome}</p>
                        <p className="text-sm text-muted-foreground">{acolito.email}</p>
                        {acolito.tipo && (
                          <span className="inline-block text-xs bg-secondary px-2 py-1 rounded">
                            {acolito.tipo === "acolito" ? "Acólito" : "Coroinha"}
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading || acolitosSelecionados.size === 0}>
            {loading ? "Criando..." : "Criar Escala"}
          </Button>
        </div>
      </form>
    </div>
  )
}
