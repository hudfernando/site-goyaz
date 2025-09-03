// src/components/site/PartnersSection.tsx
import { PartnerLogo } from "./PartnerLogo";

export default function PartnersSection() {
  return (
    <section id="parceiros" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-azul-escuro mb-8 text-center font-lato">Parceiros</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          <PartnerLogo src="/img/Industrias/Cristalia.png" alt="Cristália" />
          <PartnerLogo src="/img/Industrias/hypera.png" alt="Hypera" />
          <PartnerLogo src="/img/Industrias/Torrent.png" alt="Torrent" />
          <PartnerLogo src="/img/Industrias/Sanofi.png" alt="Sanofi" />
          <PartnerLogo src="/img/Industrias/nova_quimica.png" alt="Nova Química" />
          <PartnerLogo src="/img/Industrias/Eutofarma.png" alt="Eurofarma" />
          <PartnerLogo src="/img/Industrias/marjan.png" alt="Marjan" />
          <PartnerLogo src="/img/Industrias/momenta.png" alt="Momenta" />
          <PartnerLogo src="/img/Industrias/supera.png" alt="Supera" />
          <PartnerLogo src="/img/Industrias/multilab.jpg" alt="Multilab" />
          <PartnerLogo src="/img/Industrias/medquimica.png" alt="Medquímica" />
          <PartnerLogo src="/img/Industrias/missner2.png" alt="Missner" />
        </div>
      </div>
    </section>
  );
}