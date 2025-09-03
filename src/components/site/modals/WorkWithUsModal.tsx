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


export default function WorkWithUsModal({ triggerButton }: { triggerButton: ReactNode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", "work");
    formData.append("name", name);
    formData.append("email", email);
    if (resumeFile) formData.append("resume", resumeFile);

    try {
      const response = await fetch("../../api/api/send-email-anexo", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setShowSuccessModal(true);
      } else {
        alert(result.message || "Falha ao enviar candidatura");
      }
    } catch {
      alert("Erro ao conectar com o servidor");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessModal && progress > 0) {
      timer = setInterval(() => {
        setProgress((prev) => prev - (100 / 30));
      }, 100);
    } else if (progress <= 0) {
      setShowSuccessModal(false);
      setIsOpen(false);
      setName("");
      setEmail("");
      setResumeFile(null);
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
            <DialogTitle className="text-azul-escuro font-lato">Trabalhe Conosco</DialogTitle>
            <DialogDescription>
              Envie suas informações para fazer parte da nossa equipe.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="work-name" className="text-right text-azul-escuro">
                  Nome
                </Label>
                <Input id="work-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Seu nome completo" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="work-email" className="text-right text-azul-escuro">
                  Email
                </Label>
                <Input id="work-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" placeholder="seuemail@dominio.com" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="work-resume" className="text-right text-azul-escuro">
                  Currículo
                </Label>
                <Input id="work-resume" type="file" onChange={(e) => setResumeFile(e.target.files ? e.target.files[0] : null)} className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" className="bg-azul-claro hover:bg-opacity-90 text-white">Enviar</Button>
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
                setEmail("");
                setResumeFile(null);
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