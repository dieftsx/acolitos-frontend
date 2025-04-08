/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Cross, ArrowLeft } from "lucide-react"
import { toast } from "sonner"





export default function CadastroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulando cadastro - em um cenário real, isso seria uma chamada de API
    setTimeout(() => {
      setLoading(false)
      toast("Cadastro realizado com sucesso!", {
        description: "Você já pode fazer login no sistema.",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar</span>
      </Link>

      <div className="flex items-center gap-2 mb-8">
        <Cross className="h-8 w-8 text-rose-600" />
        <h1 className="text-2xl font-bold">Escala de Acólitos</h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Cadastro de Acólito</CardTitle>
          <CardDescription className="text-center">Preencha seus dados para se cadastrar no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" placeholder="Seu nome completo" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu.email@exemplo.com" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(00) 00000-0000" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input id="dataNascimento" type="date" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select required>
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
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <Input id="confirmarSenha" type="password" required />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="termos" required />
                <Label htmlFor="termos" className="text-sm">
                  Concordo com os{" "}
                  <Link href="/termos" className="text-rose-600 hover:text-rose-700 underline underline-offset-4">
                    termos de uso
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-rose-600 hover:text-rose-700 underline underline-offset-4">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
