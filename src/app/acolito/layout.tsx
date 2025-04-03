import type { ReactNode } from "react";
import { AcolitoSidebar } from "@/components/acolito-sidebar";

export default function AcolitoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AcolitoSidebar />
      <main className="flex-1 p-6 md: p-8">{children}</main>
    </div>
  );
}
