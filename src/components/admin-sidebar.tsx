"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  Cross,
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      title: "Painel",
    },
    {
      href: "/admin/acolitos",
      icon: Users,
      title: "Acólitos",
    },
    {
      href: "/admin/scales",
      icon: Calendar,
      title: "Escalas",
    },
    {
      href: "/admin/configuracoes",
      icon: Settings,
      title: "Configurações",
    },
  ];

  return (
    <div className="flex h-screen flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Cross className="h-6 w-6 text-rose-600" />
          <span>Escala dos Acólitos</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                pathname === route.href && "bg-muted text-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex flex-col">
            <span className="font-medium">Administrador</span>
            <span className="text-xs text-muted-foreground">
              admin@paroquia.com
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="mt-4 w-full justify-start gap-2 text-muted-foreground"
          asChild
        >
          <Link href="/login">
            <LogOut className="h-4 w-4" />
            Sair
          </Link>
        </Button>
      </div>
    </div>
  );
}
