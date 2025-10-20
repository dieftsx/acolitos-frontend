
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster } from "@/components/ui/sonner"
import { useToast } from "@/hooks/use-toast"
import { adminAPI } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NovoAcolitoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    tipo: "acolito",
    status: "ativo",
  })

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      // Preparar dados para envio
      const acolitoData = {
        ...formData,
        dataNascimento: formData.dataNascimento ? new Date(formData.dataNascimento).toISOString() : undefined,
      }

      const response = await adminAPI.createAcolito(acolitoData)

      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Acólito cadastrado com sucesso!",
        })
        router.push("/admin/acolitos")
      } else {
        throw new Error(response.message || "Erro ao cadastrar acólito")
      }
    } catch (error: unknown) {
      console.error("Erro ao cadastrar acólito:", error)
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
        description: message || "Não foi possível cadastrar o acólito.",
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

  // Calcular idade a partir da data de nascimento
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

  const idade = calcularIdade()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/acolitos">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Acólito</h1>
          <p className="text-muted-foreground">Cadastre um novo acólito ou coroinha no sistema</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Acólito</CardTitle>
          <CardDescription>Preencha os dados do novo acólito</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  placeholder="Nome completo do acólito"
                  required
                  value={formData.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
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
                <Label htmlFor="tipo">Tipo *</Label>
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

              <div className="grid gap-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {formData.status === "ativo"
                    ? "O acólito poderá acessar o sistema imediatamente"
                    : formData.status === "pendente"
                      ? "O acólito precisará ser aprovado para acessar"
                      : "O acólito não poderá acessar o sistema"}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar Acólito"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">Informação Importante</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-yellow-700">
          <p>
            Este formulário cadastra um novo acólito no sistema. Para que o acólito possa fazer login, ele precisará:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Fazer login pela primeira vez usando sua conta Google</li>
            <li>O email deve corresponder ao email cadastrado aqui</li>
            <li>Após o primeiro login, os dados serão sincronizados automaticamente</li>
          </ul>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}
