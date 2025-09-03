// src/components/site/Footer.tsx
import { FooterSection } from "./FooterSection";

export default function Footer() {
  return (
    <footer id="contato" className="bg-azulEscuro text-gray-900 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <FooterSection
            title="Goyaz Service"
            details={[
              "CEP: 75.368-173",
              "AVENIDA EDUARDO MORAIS",
              "BUFAIÇAL, SN - QUADRA18 LOTE",
              "01,02,03,04 -30 ,31,32,32E 34",
              "VILA IZABEL - GOIANIRA, GO",
              "CNPJ: 07.928.753/0002-91",
            ]}
          />
          <FooterSection
            title="Goyaz Hospitalar"
            details={[
              "CEP: 75.368-155",
              "RUA SILVIO CALDAS, 0 - QD. 13 LT. 17",
              "VILA IZABEL GOIANIRA, GO",
              "CNPJ: 07.928.753/0001-00",
            ]}
          />
          <FooterSection
            title="Goyaz Service DF"
            details={[
              "CEP: 71.200-030",
              "SIA TRECHO 3/4 S/N LOTE",
              "625/695 SALA 313 E 315 BLOCO",
              "A, SN - EDIF SIA CENTRO",
              "EMPRESARIAL, ZONA IND",
              "(GUARÁ) - BRASÍLIA, DF",
              "CNPJ: 07.928.753/0003-72",
            ]}
          />
        </div>
        <div className="border-t border-azulClaro pt-4 mt-8 text-center text-xs text-gray-400">
          <p>Goyaz Service. Todos os direitos reservados. &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}