import Image from "next/image";
import { cn } from "@/lib/utils";

export default function DistributorSection() {
  return (
    <section id="distribuidor" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className={cn("text-2xl md:text-3xl font-bold text-azulClaro mb-4 font-lato")}>
              Procurando um distribuidor para seus produtos?
            </h2>
            <p className={cn("text-base md:text-lg text-azulEscuro mb-6 font-lato")}>
              Nós da Goyaz Service nos importamos com nossos clientes, entregando o que há de melhor no segmento de medicamentos, com agilidade na entrega e compromisso com a satisfação.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/img/televendas.png"
              alt="Televendas Goyaz Service"
              width={500}
              height={350}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}