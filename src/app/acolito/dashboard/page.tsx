import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function AlcolitoDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"
              alt="Avatar"
            />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Olá, João</h1>
            <p className="text-muted-foreground">
              Bem-vindo à sua área de acólito.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="acolito/perfil">Meu Perfil</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próxima Missa</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">15/04/2025 - 19:00</div>
            <p className="text-xs text-muted-foreground">
              Igreja Matriz - Missa
            </p>
            <div className="mt-4">
              s{" "}
              <Button size="sm" variant="outline" asChild>
                <Link href="/acolito/escalas/1">Ver detalhes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Missas este mês
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Você está escalado para 5 missas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Notificações</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Nova escala adicionada
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Minhas Escalas</CardTitle>
            <CardDescription>
              Próximas missas em que você está escalado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
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
              ].map((escala) => (
                <div
                  key={escala.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">
                      {escala.data} - {escala.hora}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {escala.tipo} - {escala.local}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        escala.status === "confirmado" ? "default" : "secondary"
                      }
                    >
                      {escala.status === "confirmado"
                        ? "Confirmado"
                        : "Pendente"}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/acolito/escalas/${escala.id}`}>
                        <span className="sr-only">Ver detalhes</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>
              Visualize suas escalas no calendário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="mx-auto" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
