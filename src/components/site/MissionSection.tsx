// src/components/site/MissionSection.tsx
import { MissionCard } from "./MissionCard";

export default function MissionSection() {
  return (
    <section id="missao" className="py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <MissionCard
            imgSrc="/img/icon-missao.png"
            title="MISSÃO"
            text="Compromisso com a saúde e bem estar, distribuindo produtos das linhas Farma, HPC, Baby e nutrição."
          />
          <MissionCard
            imgSrc="/img/icon-visao.png"
            title="VISÃO"
            text="Liderar o processo de distribuição com excelência no modelo de gestão e crescimento sustentável."
          />
          <MissionCard
            imgSrc="/img/icon-valores.png"
            title="VALORES"
            text="Valorização de pessoas, comprometimento, ética, ousadia e transparência."
          />
          <MissionCard
            imgSrc="/img/icon-empresa.png"
            title="A EMPRESA"
            text="Transparência e honestidade em seus negócios, buscando inovação e tecnologia em seus processos."
          />
        </div>
      </div>
    </section>
  );
}