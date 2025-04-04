import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const scales = [
  {
    id: 1,
    data: "15/04/2025",
    hora: "19:00",
    tipo: "Missa",
    local: "Igreja Matriz",
    status: "confirmado",
  },
  {
    id: 2,
    data: "18/04/2025",
    hora: "19:00",
    tipo: "Missa",
    local: "Igreja Matriz",
    status: "confirmado",
  },
  {
    id: 3,
    data: "20/04/2025",
    hora: "08:00",
    tipo: "Missa",
    local: "Igreja Matriz",
    status: "pendente",
  },
  {
    id: 4,
    data: "25/04/2025",
    hora: "19:00",
    tipo: "Adoração",
    local: "Capela",
    status: "pendente",
  },
  {
    id: 5,
    data: "27/04/2025",
    hora: "10:00",
    tipo: "Missa",
    local: "Igreja Matriz",
    status: "pendente",
  },
  {
    id: 6,
    data: "01/05/2025",
    hora: "19:00",
    tipo: "Missa",
    local: "Igreja Matriz",
    status: "pendente",
  },
  {
    id: 7,
    data: "04/05/2025",
    hora: "08:00",
    tipo: "Missa",
    local: "Igreja Matriz",
    status: "pendente",
  },
  {
    id: 8,
    data: "04/05/2025",
    hora: "10:00",
    tipo: "Missa",
    local: "Igreja Matriz",
    status: "pendente",
  },
];

export default function MyScalesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Minhas Escalas</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie suas escalas de missas
        </p>
      </div>

      <div className="flex flex-col md: flex-row items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar Escala..."
            className="pl-8"
          />
        </div>
        <Select defaultValue="todos">
          <SelectTrigger className="#[180px]">
            <SelectValue placeholder="Filtrar por Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="confirmado">Confirmado</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Escalas</CardTitle>
          <CardDescription>
            Todas as Missas em que você está escalado
          </CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w[80px]"></TableHead>
            </TableRow>
          </TableHeader>

          {scales.map((scale) => (
            <TableRow key={scale.id}>
              <TableCell>{scale.data}</TableCell>
              <TableCell>{scale.hora}</TableCell>
              <TableCell>{scale.tipo}</TableCell>
              <TableCell>{scale.local}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    scale.status === "confirmado" ? "default" : "secondary"
                  }
                >
                  {scale.status === "confirmado" ? "Confirmado" : "Pendente"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/acolito/scales/${scale.id}`}>
                    <span className="sr-only">Ver detalhes</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
