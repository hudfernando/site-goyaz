"use client";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "./NavLink";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-200 container mx-auto flex justify-between items-center py-4 px-4">
      <Link href="/" className="flex items-center space-x-3">
        <Image
          src="/img/logo_site_goyaz.png"
          alt="Goyaz Service Logo"
          width={350}
          height={100}
          priority
          className="h-auto"
        />
      </Link>

      <div className="hidden md:flex space-x-8 items-center">
        <NavLink href="#missao" label="Empresa" />
        <NavLink href="#sac" label="Sac" />
        <NavLink href="#canais" label="Canais" />
        <NavLink href="#parceiros" label="Contato" />
      </div>

      <div className="hidden md:block">
        <Button
          variant="outline"
          className="border-azul-claro text-azul-claro hover:bg-azul-claro hover:text-azul-escuro font-semibold py-2 px-6 rounded-md transition-colors duration-300"
          asChild
        >
          <a href="https://pedido.grupogoyaz.com.br/login" target="_blank" rel="noopener noreferrer">
            Acesse o Portal
          </a>
        </Button>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border-azul-claro text-azul-claro hover:bg-azul-claro/10">
              <Menu />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-azul-escuro w-[280px] sm:w-[320px] p-0 text-white">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-azul-claro/20">
                <Link href="/">
                  <Image
                    src="/img/logo_site_goyaz.png"
                    alt="Goyaz Service Logo"
                    width={150}
                    height={40}
                    className="h-auto"
                  />
                </Link>
              </div>
              <nav className="flex-grow p-6 space-y-3">
                <NavLink href="#missao" label="Empresa" isMobile />
                <NavLink href="#sac" label="Sac" isMobile />
                <NavLink href="#canais" label="Canais" isMobile />
                <NavLink href="#parceiros" label="Contato" isMobile />
              </nav>
              <div className="p-6 border-t border-azul-claro/20">
                <Button
                  variant="outline"
                  className="w-full border-azul-claro text-azul-claro hover:bg-azul-claro hover:text-azul-escuro"
                >
                  Acesse o Portal
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}