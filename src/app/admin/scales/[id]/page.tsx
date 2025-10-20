
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { adminAPI } from "@/lib/api"
import { ArrowLeft, Calendar, Clock, MapPin, Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Acolito {
  id: string
  nome: string
  email: string
  foto?: string
  telefone?: string
  tipo?: string
}

interface EscalaAcolito {
  acolitoId: string
  status: "confirmado" | "pendente" | "recusado"
  observacao?: string
  acolito?: Acolito
}

interface Escala {
  id: string
  data: string
  hora: string
  tipo: string
  local: string
  descricao?: string
  status: string
  acolitos: EscalaAcolito[]
}

export default function DetalhesEscalaPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [escala, setEscala] = useState<Escala | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const escalaId = params.id as string

  useEffect(() => {
    const fetchEscala = async () => {
      try {
        setLoading(true)
        const response = await adminAPI.getEscalaById(escalaId)
        if (response.success) {
          setEscala(response.data)
        }
      } catch (error) {
        console.error("Erro ao carregar escala:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes da escala.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEscala()
  }, [escalaId, toast])

  const handleDelete = async () => {
    try {
      setDeleting(true)
      const response = await adminAPI.deleteEscala(escalaId)
      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Escala excluída com sucesso.",
        })
        router.push("/admin/escalas")
      }
    } catch (error) {
      console.error("Erro ao excluir escala:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a escala.",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
    }
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
          <p className="text-muted-foreground">Carregando detalhes da escala...</p>
        </div>
      </div>
    )
  }

  if (!escala) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Escala não encontrada</CardTitle>
            <CardDescription>A escala que você está procurando não existe ou foi removida.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/escalas">Voltar para Escalas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const confirmados = escala.acolitos.filter((a) => a.status === "confirmado").length
  const pendentes = escala.acolitos.filter((a) => a.status === "pendente").length
  const recusados = escala.acolitos.filter((a) => a.status === "recusado").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/escalas">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Detalhes da Escala</h1>
            <p className="text-muted-foreground">Visualize e gerencie os detalhes da escala</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/escalas/${escalaId}/editar`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. A escala será permanentemente excluída do sistema.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-destructive">
                  {deleting ? "Excluindo..." : "Excluir"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Celebração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="font-medium">{formatDate(escala.data)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Hora</p>
                <p className="font-medium">{escala.hora}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Local</p>
                <p className="font-medium">{escala.local}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Tipo</p>
              <Badge>{escala.tipo}</Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge
                variant={
                  escala.status === "agendada" ? "default" : escala.status === "pendente" ? "secondary" : "outline"
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

            {escala.descricao && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Descrição</p>
                <p className="text-sm">{escala.descricao}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total de Acólitos</span>
                <span className="font-medium">{escala.acolitos.length}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Confirmados</span>
                <span className="font-medium text-green-600">{confirmados}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Pendentes</span>
                <span className="font-medium text-yellow-600">{pendentes}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Recusados</span>
                <span className="font-medium text-red-600">{recusados}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acólitos Escalados ({escala.acolitos.length})</CardTitle>
          <CardDescription>Lista de todos os acólitos designados para esta escala</CardDescription>
        </CardHeader>
        <CardContent>
          {escala.acolitos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Nenhum acólito escalado</div>
          ) : (
            <div className="space-y-4">
              {escala.acolitos.map((escalaAcolito) => (
                <div key={escalaAcolito.acolitoId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={escalaAcolito.acolito?.foto || "/placeholder.svg"} />
                      <AvatarFallback>
                        {escalaAcolito.acolito?.nome ? getInitials(escalaAcolito.acolito.nome) : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{escalaAcolito.acolito?.nome || "Nome não disponível"}</p>
                      <p className="text-sm text-muted-foreground">{escalaAcolito.acolito?.email}</p>
                      {escalaAcolito.acolito?.tipo && (
                        <span className="inline-block text-xs bg-secondary px-2 py-1 rounded mt-1">
                          {escalaAcolito.acolito.tipo === "acolito" ? "Acólito" : "Coroinha"}
                        </span>
                      )}
                      {escalaAcolito.observacao && (
                        <p className="text-sm text-muted-foreground mt-1 italic">Obs: {escalaAcolito.observacao}</p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={
                      escalaAcolito.status === "confirmado"
                        ? "default"
                        : escalaAcolito.status === "pendente"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {escalaAcolito.status === "confirmado"
                      ? "Confirmado"
                      : escalaAcolito.status === "pendente"
                        ? "Pendente"
                        : "Recusado"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
