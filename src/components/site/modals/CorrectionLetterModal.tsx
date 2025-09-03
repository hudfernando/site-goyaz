"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailOpen } from "lucide-react";


export default function CorrectionLetterModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [nfGeral, setNfGeral] = useState("");
    const [codProduto, setCodProduto] = useState("");
    const [lote, setLote] = useState("");
    const [validade, setValidade] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Correction Letter Data:", { nfGeral, codProduto, lote, validade, quantidade });
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="flex flex-col items-center justify-center w-full h-full text-azulEscuro hover:bg-azulClaro/10">
                    <MailOpen size={24} className="mb-2 text-azul-escuro" />
                    <span className="text-sm font-semibold text-center font-lato">CARTA DE CORREÇÃO</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-white">
                <DialogHeader>
                    <DialogTitle className="text-azulEscuro font-lato">Carta de Correção</DialogTitle>
                    <DialogDescription>Insira os dados para a carta de correção.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 py-4">
                        <div>
                            <Label htmlFor="nfGeral" className="text-azulEscuro">Número Nota Fiscal</Label>
                            <Input id="nfGeral" value={nfGeral} onChange={(e) => setNfGeral(e.target.value)} className="mt-1" placeholder="NF" />
                        </div>
                        <p className="text-sm text-azulEscuro font-medium">Item 1:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <Label htmlFor="codProduto1" className="text-azulEscuro text-xs">Cód. Produto</Label>
                                <Input id="codProduto1" value={codProduto} onChange={(e) => setCodProduto(e.target.value)} className="mt-1" />
                            </div>
                            <div>
                                <Label htmlFor="lote1" className="text-azulEscuro text-xs">Lote Recebido</Label>
                                <Input id="lote1" value={lote} onChange={(e) => setLote(e.target.value)} className="mt-1" />
                            </div>
                            <div>
                                <Label htmlFor="validade1" className="text-azulEscuro text-xs">Validade</Label>
                                <Input id="validade1" type="date" value={validade} onChange={(e) => setValidade(e.target.value)} className="mt-1" />
                            </div>
                            <div>
                                <Label htmlFor="quantidade1" className="text-azulEscuro text-xs">Quantidade</Label>
                                <Input id="quantidade1" type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} className="mt-1" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                       <DialogClose asChild>
                           <Button type="button" variant="outline">Cancelar</Button>
                       </DialogClose>
                        <Button type="submit" className="bg-azulClaro hover:bg-opacity-90 text-white">Enviar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}