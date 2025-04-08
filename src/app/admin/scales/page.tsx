import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dados de exemplo
const escalas = [
  { id: 1, data: "15/04/2025", hora: "19:00", tipo: "Missa", local: "Igreja Matriz", acolitos: 4, status: "agendada" },
  { id: 2, data: "16/04/2025", hora: "07:00", tipo: "Missa", local: "Igreja Matriz", acolitos: 3, status: "agendada" },
  { id: 3, data: "16/04/2025", hora: "19:00", tipo: "Missa", local: "Igreja Matriz", acolitos: 4, status: "agendada" },
  { id: 4, data: "17/04/2025", hora: "19:00", tipo: "Adoração", local: "Capela", acolitos: 2, status: "agendada" },
  { id: 5, data: "18/04/2025", hora: "19:00", tipo: "Missa", local: "Igreja Matriz", acolitos: 4, status: "agendada" },
  { id: 6, data: "19/04/2025", hora: "19:00", tipo: "Missa", local: "Igreja Matriz", acolitos: 4, status: "pendente" },
  { id: 7, data: "20/04/2025", hora: "08:00", tipo: "Missa", local: "Igreja Matriz", acolitos: 4, status: "pendente" },
  { id: 8, data: "20/04/2025", hora: "10:00", tipo: "Missa", local: "Igreja Matriz", acolitos: 4, status: "pendente" },
  { id: 9, data: "20/04/2025", hora: "19:00", tipo: "Missa", local: "Igreja Matriz", acolitos: 4, status: "pendente" },
]

export default function EscalasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Escalas</h1>
          <p className="text-muted-foreground">Gerencie todas as escalas de missas e celebrações.</p>
        </div>
        <Button asChild>
          <Link href="/admin/escalas/nova">
            <Plus className="mr-2 h-4 w-4" /> Nova Escala
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar escala..." className="pl-8" />
        </div>
        <Select defaultValue="todos">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="agendada">Agendada</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="concluida">Concluída</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Acólitos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {escalas.map((escala) => (
              <TableRow key={escala.id}>
                <TableCell>{escala.data}</TableCell>
                <TableCell>{escala.hora}</TableCell>
                <TableCell>{escala.tipo}</TableCell>
                <TableCell>{escala.local}</TableCell>
                <TableCell>{escala.acolitos}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      escala.status === "agendada" ? "default" : escala.status === "pendente" ? "secondary" : "outline"
                    }
                  >
                    {escala.status === "agendada"
                      ? "Agendada"
                      : escala.status === "pendente"
                        ? "Pendente"
                        : "Concluída"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/escalas/${escala.id}`}>Ver detalhes</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/escalas/${escala.id}/editar`}>Editar</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Cancelar escala</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

