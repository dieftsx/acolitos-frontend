
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Toaster } from "@/components/ui/sonner"
import { adminAPI } from "@/lib/api"
import { ArrowLeft, Mail, Phone, Calendar, Edit } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast, useSonner } from "sonner"

interface Acolito {
  id: string
  nome: string
  email: string
  telefone?: string
  dataNascimento?: string
  tipo?: "acolito" | "coroinha"
  status: "ativo" | "inativo" | "pendente"
  foto?: string
}

interface Escala {
  id: string
  data: string
  hora: string
  tipo: string
  local: string
  status: string
}

export default function DetalhesAcolitoPage() {
  const router = useRouter()
  const params = useParams()
  const { toasts } = useSonner()
  const [acolito, setAcolito] = useState<Acolito | null>(null)
  const [escalas, setEscalas] = useState<Escala[]>([])
  const [loading, setLoading] = useState(true)

  const acolitoId = params.id as string

  useEffect(() => {
    const fetchAcolito = async () => {
      try {
        setLoading(true)
        const response = await adminAPI.getAcolitoById(acolitoId)
        if (response.success) {
          setAcolito(response.data.acolito)
          setEscalas(response.data.escalas || [])
        }
      } catch (error) {
        console.error("Erro ao carregar acólito:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes do acólito.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAcolito()
  }, [acolitoId, toast])

  const calcularIdade = (dataNascimento?: string) => {
    if (!dataNascimento) return null

    const hoje = new Date()
    const nascimento = new Date(dataNascimento)
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const m = hoje.getMonth() - nascimento.getMonth()

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--
    }

    return idade
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "dd/MM/yyyy", { locale: ptBR })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando detalhes do acólito...</p>
        </div>
      </div>
    )
  }

  if (!acolito) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acólito não encontrado</CardTitle>
            <CardDescription>O acólito que você está procurando não existe ou foi removido.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/acolitos">Voltar para Acólitos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const idade = calcularIdade(acolito.dataNascimento)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/acolitos">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Detalhes do Acólito</h1>
            <p className="text-muted-foreground">Visualize e gerencie as informações do acólito</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/admin/acolitos/${acolitoId}/editar`}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={acolito.foto || "/placeholder.svg"} />
                <AvatarFallback className="text-4xl">{getInitials(acolito.nome)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold text-center">{acolito.nome}</h2>
              <div className="mt-2 flex gap-2">
                <Badge>{acolito.tipo === "acolito" ? "Acólito" : "Coroinha"}</Badge>
                <Badge
                  variant={
                    acolito.status === "ativo" ? "default" : acolito.status === "pendente" ? "secondary" : "outline"
                  }
                >
                  {acolito.status === "ativo" ? "Ativo" : acolito.status === "pendente" ? "Pendente" : "Inativo"}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium truncate">{acolito.email}</p>
                </div>
              </div>

              {acolito.telefone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium">{acolito.telefone}</p>
                  </div>
                </div>
              )}

              {acolito.dataNascimento && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                    <p className="font-medium">
                      {formatDate(acolito.dataNascimento)}
                      {idade && ` (${idade} anos)`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Escalas Recentes</CardTitle>
            <CardDescription>Últimas 10 escalas em que o acólito foi designado</CardDescription>
          </CardHeader>
          <CardContent>
            {escalas.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma escala registrada ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {escalas.map((escala) => (
                  <Link
                    key={escala.id}
                    href={`/admin/escalas/${escala.id}`}
                    className="block p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {formatDate(escala.data)} - {escala.hora}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {escala.tipo} - {escala.local}
                        </p>
                      </div>
                      <Badge
                        variant={
                          escala.status === "agendada"
                            ? "default"
                            : escala.status === "pendente"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {escala.status === "agendada"
                          ? "Agendada"
                          : escala.status === "pendente"
                            ? "Pendente"
                            : escala.status === "concluida"
                              ? "Concluída"
                              : "Cancelada"}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
