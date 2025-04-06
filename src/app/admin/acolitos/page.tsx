import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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

const acolitos = [
  { id: 1, nome: "João Silva", tipo: "Acólito", idade: 17, telefone: "(11) 98765-4321", status: "ativo" },
  { id: 2, nome: "Maria Oliveira", tipo: "Coroinha", idade: 12, telefone: "(11) 91234-5678", status: "ativo" },
  { id: 3, nome: "Pedro Santos", tipo: "Acólito", idade: 16, telefone: "(11) 99876-5432", status: "ativo" },
  { id: 4, nome: "Ana Souza", tipo: "Coroinha", idade: 11, telefone: "(11) 97654-3210", status: "ativo" },
  { id: 5, nome: "Lucas Ferreira", tipo: "Acólito", idade: 18, telefone: "(11) 95432-1098", status: "inativo" },
  { id: 6, nome: "Juliana Costa", tipo: "Coroinha", idade: 13, telefone: "(11) 93210-9876", status: "ativo" },
  { id: 7, nome: "Gabriel Almeida", tipo: "Acólito", idade: 16, telefone: "(11) 90987-6543", status: "ativo" },
  { id: 8, nome: "Beatriz Lima", tipo: "Coroinha", idade: 12, telefone: "(11) 96789-0123", status: "inativo" },
]


export default function AcolitosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md: flex-row justify-between gap-4">
        <div>
          <h1 className=" text-3xl font-bold tracking-tight">Acólitos e Coroinhas</h1>
          <p className="text-muted-foreground">Gerencie todos os acólitos e coroinhas cadastrados.</p>
  <Button asChild>
    <Link href="/admin/acolitos/novo">
      <Plus clasName="mr-2 h-4 w-4" /> Novo Acólito
    </Link>

  </Button>
        </div>
         <div className="flex items-center gap-2">
          <div className="relative flex-1">
           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
           <Input type="search" placeholder="Buscar acólito..." className="pl-8" />
          </div>
         </div>           
        <div className="border-rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                  
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </div>
    </div>

  )
}
