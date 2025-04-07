import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Users, CalendarIcon, Bell, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo ao painel administrativo.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/escalas/nova">Nova Escala</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/acolitos/novo">Novo Acólito</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Acólitos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Missas este mês</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">4 missas por semana + especiais</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Notificações</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Solicitações de substituição</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendario">
        <TabsList>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="proximas">Próximas Missas</TabsTrigger>
        </TabsList>
        <TabsContent value="calendario" className="p-4 border rounded-md">
          <Calendar mode="single" className="mx-auto" />
        </TabsContent>
        <TabsContent value="proximas">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Missas</CardTitle>
              <CardDescription>Missas agendadas para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { data: "15/04/2025", hora: "19:00", tipo: "Missa", acolitos: 4 },
                  { data: "16/04/2025", hora: "07:00", tipo: "Missa", acolitos: 3 },
                  { data: "16/04/2025", hora: "19:00", tipo: "Missa", acolitos: 4 },
                  { data: "17/04/2025", hora: "19:00", tipo: "Adoração", acolitos: 2 },
                  { data: "18/04/2025", hora: "19:00", tipo: "Missa", acolitos: 4 },
                ].map((missa, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">
                        {missa.data} - {missa.hora}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {missa.tipo} - {missa.acolitos} acólitos
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/escalas/${index}`}>
                        <span className="sr-only">Ver detalhes</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

