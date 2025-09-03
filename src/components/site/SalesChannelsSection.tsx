import { SalesChannelCard } from "./SalesChannelCard";
import NewClientModal from "./modals/NewClientModal";

export default function SalesChannelsSection() {
  return (
    <section id="canais" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-azul-escuro mb-8 text-center font-lato">Canais de Venda</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SalesChannelCard
            icon="/img/icon-canais-de-venda.png"
            title="Canais de vendas"
            description="Compre via televendas ou pelo nosso pedido eletrônico."
            contact="0800 728 8585"
            schedule="Segunda à sexta, das 8h às 20h"
            buttonText="PEDIDO ELETRÔNICO"
            buttonLink="https://pedido.grupogoyaz.com.br/"
          />
          <SalesChannelCard
            icon="/img/icon-atendimento.png"
            title="Atendimento"
            description="Para esclarecer dúvidas, enviar sugestões ou críticas."
            contact="62 3433 7700"
            schedule="Segunda à sexta, das 8h às 18h"
            buttonText="ENVIAR MENSAGEM"
            buttonLink="#"
          />
          <SalesChannelCard
            icon="/img/icon-cliente.png"
            title="Quero ser cliente"
            description="Clique no botão abaixo e solicite seu cadastro."
            buttonText="CADASTRE-SE"
            isModal
            modalComponent={<NewClientModal />}
          />
        </div>
      </div>
    </section>
  );
}