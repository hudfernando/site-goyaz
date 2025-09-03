"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { FormModal } from "./FormModal";

interface FormData {
  email: string;
  phone: string;
  alvaraFile: File | null;
  crfFile: File | null;
  contratoFile: File | null;
}

interface NewClientModalProps {
  triggerButtonText?: string;
  isRawButton?: boolean;
}

export default function NewClientModal({ triggerButtonText = "CADASTRE-SE", isRawButton = false }: NewClientModalProps) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    alvaraFile: null,
    crfFile: null,
    contratoFile: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(field, e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!e || typeof e.preventDefault !== 'function') {
      console.error('Evento inválido passado para handleSubmit:', e);
      alert('Erro ao processar o formulário. Tente novamente.');
      return;
    }
    e.preventDefault();

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (formData.alvaraFile && formData.alvaraFile.size > maxSize) {
      alert("O arquivo alvará deve ter no máximo 5MB.");
      return;
    }
    if (formData.crfFile && formData.crfFile.size > maxSize) {
      alert("O arquivo CRF deve ter no máximo 5MB.");
      return;
    }
    if (formData.contratoFile && formData.contratoFile.size > maxSize) {
      alert("O arquivo contrato social deve ter no máximo 5MB.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("type", "new-client");
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    if (formData.alvaraFile) formDataToSend.append("alvara", formData.alvaraFile);
    if (formData.crfFile) formDataToSend.append("crf", formData.crfFile);
    if (formData.contratoFile) formDataToSend.append("contrato", formData.contratoFile);

    try {
      const response = await fetch("../../api/api/send-email-novo-cliente", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      console.log('Resposta da API:', result);
      if (result.success) {
        setShowSuccessModal(true);
      } else {
        console.error('Falha na API:', result);
        alert(result.message || "Falha ao enviar cadastro");
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
      setFormData({
        email: "",
        phone: "",
        alvaraFile: null,
        crfFile: null,
        contratoFile: null,
      });
      setProgress(100);
    }
    return () => {
      if (timer) {
        console.log('Limpando temporizador');
        clearInterval(timer);
      }
    };
  }, [showSuccessModal, progress]);

  const TriggerButton = isRawButton ? (
    <Button
      variant="ghost"
      className="flex flex-col items-center justify-center w-full h-full text-azul-escuro hover:bg-azul-claro/10"
    >
      <UserPlus size={24} className="mb-2 text-azul-claro" />
      <span className="text-sm font-semibold text-center font-lato">{triggerButtonText}</span>
    </Button>
  ) : (
    <Button
      variant="outline"
      className="border-2 border-azul-claro text-azul-claro hover:bg-azul-claro hover:text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 w-full sm:w-auto"
    >
      {triggerButtonText}
    </Button>
  );

  return (
    <>
      <FormModal
        title="Cadastro de Novo Cliente"
        description="Preencha os dados abaixo e anexe os documentos solicitados."
        triggerButton={TriggerButton}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-client-email" className="text-right text-azul-escuro">
              Email
            </Label>
            <Input
              id="new-client-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="col-span-3"
              placeholder="seuemail@dominio.com"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-client-phone" className="text-right text-azul-escuro">
              Telefone
            </Label>
            <Input
              id="new-client-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="col-span-3"
              placeholder="(xx) xxxxx-xxxx"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-client-alvara" className="text-right text-azul-escuro">
              Alvará
            </Label>
            <Input
              id="new-client-alvara"
              type="file"
              onChange={handleFileChange("alvaraFile")}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-client-crf" className="text-right text-azul-escuro">
              CRF
            </Label>
            <Input
              id="new-client-crf"
              type="file"
              onChange={handleFileChange("crfFile")}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-client-contrato" className="text-right text-azul-escuro">
              Contrato Social
            </Label>
            <Input
              id="new-client-contrato"
              type="file"
              onChange={handleFileChange("contratoFile")}
              className="col-span-3"
              required
            />
          </div>
        </div>
      </FormModal>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-[400px] bg-azul-escuro text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-lato">Sucesso</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-white text-center">
            Arquivos enviados, faremos o seu cadastro em ate 24 horas!
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
                setFormData({
                  email: "",
                  phone: "",
                  alvaraFile: null,
                  crfFile: null,
                  contratoFile: null,
                });
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