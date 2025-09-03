"use client";
import { useState, useEffect, ReactNode } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";

export default function SuggestionModal({ triggerButton }: { triggerButton: ReactNode }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", "suggestion");
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("suggestion", suggestion);

    try {
      const response = await fetch("../../api/api/send-email", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setShowSuccessModal(true);
      } else {
        alert(result.message || "Falha ao enviar sugestão");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessModal && progress > 0) {
      timer = setInterval(() => {
        setProgress((prev) => prev - (100 / 30)); // 3 segundos = 30 intervalos de 100ms
      }, 100);
    } else if (progress <= 0) {
      setShowSuccessModal(false);
      setIsOpen(false);
      setName("");
      setPhone("");
      setEmail("");
      setSuggestion("");
      setProgress(100);
    }
    return () => clearInterval(timer);
  }, [showSuccessModal, progress]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-azul-escuro font-lato">Enviar Sugestão</DialogTitle>
            <DialogDescription>
              Compartilhe suas ideias para melhorar nossos serviços.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="suggestion-name" className="text-right text-azul-escuro">
                  Nome
                </Label>
                <Input id="suggestion-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Seu nome completo" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="suggestion-phone" className="text-right text-azul-escuro">
                  Telefone
                </Label>
                <Input id="suggestion-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3" placeholder="(xx) xxxxx-xxxx" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="suggestion-email" className="text-right text-azul-escuro">
                  Email
                </Label>
                <Input id="suggestion-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" placeholder="seuemail@dominio.com" required />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="suggestion-message" className="text-right text-azul-escuro pt-2">
                  Sugestão
                </Label>
                <Textarea id="suggestion-message" value={suggestion} onChange={(e) => setSuggestion(e.target.value)} className="col-span-3" placeholder="Descreva sua sugestão aqui..." rows={4} required />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" className="bg-azul-claro hover:bg-opacity-90 text-white">Enviar Sugestão</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-[400px] bg-azul-escuro text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-lato">Sucesso</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-white text-center">
            Informações enviadas com sucesso
          </DialogDescription>
          <div className="w-full bg-azul-claro/20 h-2 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-azul-claro transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-azul-claro text-azul-claro hover:bg-azul-claro hover:text-azul-escuro w-full mt-4"
              onClick={() => {
                setShowSuccessModal(false);
                setIsOpen(false);
                setName("");
                setPhone("");
                setEmail("");
                setSuggestion("");
                setProgress(100);
              }}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}