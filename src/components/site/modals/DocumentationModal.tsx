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
import { FileUp } from "lucide-react";

export default function DocumentationModal({ triggerButton }: { triggerButton: ReactNode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [document1, setDocument1] = useState<File | null>(null);
  const [document2, setDocument2] = useState<File | null>(null);
  const [document3, setDocument3] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar pelo menos um documento
    if (!document1 && !document2 && !document3) {
      alert("Pelo menos um documento é obrigatório.");
      return;
    }

    // Validar tamanho dos arquivos (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (document1 && document1.size > maxSize) {
      alert("O arquivo Documento 1 deve ter no máximo 5MB.");
      return;
    }
    if (document2 && document2.size > maxSize) {
      alert("O arquivo Documento 2 deve ter no máximo 5MB.");
      return;
    }
    if (document3 && document3.size > maxSize) {
      alert("O arquivo Documento 3 deve ter no máximo 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("type", "documentation");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (document1) formData.append("document1", document1);
    if (document2) formData.append("document2", document2);
    if (document3) formData.append("document3", document3);

    try {
      const response = await fetch("../../api/api/send-email-documentacao", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log('Resposta da API:', result);
      if (result.success) {
        setShowSuccessModal(true);
      } else {
        console.error('Falha na API:', result);
        alert(result.message || "Falha ao enviar documentação");
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      alert("Erro ao conectar com o servidor");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (showSuccessModal && progress > 0) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / 30); // 3 segundos = 30 intervalos de 100ms
          console.log('Progresso atual:', newProgress);
          return newProgress;
        });
      }, 100);
    } else if (showSuccessModal && progress <= 0) {
      console.log('Fechando modal de sucesso e resetando estado');
      setShowSuccessModal(false);
      setIsOpen(false);
      setName("");
      setEmail("");
      setPhone("");
      setDocument1(null);
      setDocument2(null);
      setDocument3(null);
      setProgress(100);
    }
    return () => {
      if (timer) {
        console.log('Limpando temporizador');
        clearInterval(timer);
      }
    };
  }, [showSuccessModal, progress]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-azul-escuro font-lato">Envio de Documentação</DialogTitle>
            <DialogDescription>
              Envie seus documentos para análise. Pelo menos um documento é obrigatório.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doc-name" className="text-right text-azul-escuro">
                  Nome do Responsável
                </Label>
                <Input
                  id="doc-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doc-email" className="text-right text-azul-escuro">
                  Email
                </Label>
                <Input
                  id="doc-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                  placeholder="seuemail@dominio.com"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doc-phone" className="text-right text-azul-escuro">
                  Telefone (preferível WhatsApp)
                </Label>
                <Input
                  id="doc-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="col-span-3"
                  placeholder="(xx) xxxxx-xxxx"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doc-file1" className="text-right text-azul-escuro">
                  Documento 1
                </Label>
                <Input
                  id="doc-file1"
                  type="file"
                  onChange={(e) => setDocument1(e.target.files ? e.target.files[0] : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doc-file2" className="text-right text-azul-escuro">
                  Documento 2
                </Label>
                <Input
                  id="doc-file2"
                  type="file"
                  onChange={(e) => setDocument2(e.target.files ? e.target.files[0] : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doc-file3" className="text-right text-azul-escuro">
                  Documento 3
                </Label>
                <Input
                  id="doc-file3"
                  type="file"
                  onChange={(e) => setDocument3(e.target.files ? e.target.files[0] : null)}
                  className="col-span-3"
                />
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
                console.log('Fechando modal de sucesso manualmente');
                setShowSuccessModal(false);
                setIsOpen(false);
                setName("");
                setEmail("");
                setPhone("");
                setDocument1(null);
                setDocument2(null);
                setDocument3(null);
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