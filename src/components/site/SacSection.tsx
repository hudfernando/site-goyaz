"use client";
import { PackageX, Lightbulb, ListChecks, FileUp, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SacCard } from "./SacCard";
import SuggestionModal from "./modals/SuggestionModal";
import WorkWithUsModal from "./modals/WorkWithUsModal";
import DocumentationModal from "./modals/DocumentationModal";
import NewClientModal from "./modals/NewClientModal";

export default function SacSection() {
  return (
    <section id="sac" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 md:mb-12 font-lato text-azul-escuro">EM QUE PODEMOS AJUDÁ-LO?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <SacCard
            label="DEVOLUÇÃO DE PRODUTOS"
            icon={<PackageX size={24} className="text-azul-claro" />}
            link="https://docs.google.com/forms/d/e/1FAIpQLSeMoSm3hHCELJ-ERj7-nqJjohOr-p94djcs1axxnfqBOP73jg/viewform?pli=1"
          />
           <SacCard
            label="SUGESTÕES"
            icon={<Lightbulb size={24} className="text-azul-claro" />}
            modal={<SuggestionModal triggerButton={<Button variant="ghost" className="flex flex-col items-center justify-center w-full h-full text-azul-escuro hover:bg-azul-claro/10"><Lightbulb size={24} className="mb-2 text-azul-claro" /><span className="text-sm font-semibold text-center font-lato">SUGESTÕES</span></Button>} />}
          />
          
          <SacCard
            label="TRABALHE CONOSCO"
            icon={<ListChecks size={24} className="text-azul-claro" />}
            modal={<WorkWithUsModal triggerButton={<Button variant="ghost" className="flex flex-col items-center justify-center w-full h-full text-azul-escuro hover:bg-azul-claro/10"><ListChecks size={24} className="mb-2 text-azul-claro" /><span className="text-sm font-semibold text-center font-lato">TRABALHE CONOSCO</span></Button>} />}
          />
          
          <SacCard
            label="ENVIO DE DOCUMENTAÇÃO"
            icon={<FileUp size={24} className="text-azul-claro" />}
            modal={<DocumentationModal triggerButton={<Button variant="ghost" className="flex flex-col items-center justify-center w-full h-full text-azul-escuro hover:bg-azul-claro/10"><FileUp size={24} className="mb-2 text-azul-claro" /><span className="text-sm font-semibold text-center font-lato">ENVIO DE DOCUMENTAÇÃO</span></Button>} />}
          />
          
          <SacCard
            label="CADASTRE-SE"
            icon={<UserPlus size={24} className="text-azul-claro" />}
            modal={<NewClientModal triggerButtonText="CADASTRE-SE" isRawButton={true} />}
          /> 
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-azul-escuro">Ao usar nossos serviços, você concorda com nossa <a href="/politica-privacidade" className="underline text-azul-claro hover:text-azul-escuro">Política de Privacidade</a>. Clique para mais detalhes.</p>
        </div>
      </div>
    </section>
  );
}