import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cross, Users, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cross className="h-8 w-8 text-rose-600" />
            <h1 className="text-2xl font-bold">Escala de Acólitos</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/cadastro">Cadastrar</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-12">
        <section className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Gerenciamento de Escala para Acólitos e Coroinhas
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Sistema simples e eficiente para organizar as escalas de serviço
            litúrgico da sua paróquia.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/cadastro">Começar Agora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sobre">Saiba Mais</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-rose-600" />
              <CardTitle className="mt-4">Gerenciamento de Acólitos</CardTitle>
              <CardDescription>
                Cadastre e gerencie todos os acólitos e coroinhas da sua
                paróquia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Mantenha um registro organizado com informações de contato,
                disponibilidade e experiência.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/cadastro">Cadastrar Acólitos</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-12 w-12 text-rose-600" />
              <CardTitle className="mt-4">Escala de Missas</CardTitle>
              <CardDescription>
                Crie e gerencie escalas para todas as celebrações litúrgicas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Organize facilmente as escalas semanais, mensais ou para
                ocasiões especiais como Semana Santa e Natal.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">Gerenciar Escalas</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Cross className="h-12 w-12 text-rose-600" />
              <CardTitle className="mt-4">Área do Acólito</CardTitle>
              <CardDescription>
                Acesso fácil para acólitos visualizarem suas escalas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Cada acólito pode verificar suas escalas, confirmar presença e
                solicitar substituições quando necessário.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">Acessar Área</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
      <footer className="border-t bg-white py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Escala de Acólitos - Todos os direitos
            reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
