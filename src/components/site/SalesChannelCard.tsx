// src/components/site/SalesChannelCard.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";


interface SalesChannelCardProps {
  icon: string;
  title: string;
  description: string;
  contact?: string | null;
  schedule?: string | null;
  buttonText: string;
  buttonLink?: string | null;
  isModal?: boolean;
  modalComponent?: React.ReactNode;
}

export function SalesChannelCard({
  icon,
  title,
  description,
  contact,
  schedule,
  buttonText,
  buttonLink,
  isModal = false,
  modalComponent,
}: SalesChannelCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 flex flex-col min-h-[300px]">
      <Image src={icon} alt={title} width={60} height={60} className="mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-azul-claro mb-2 font-lato">{title}</h3>
      <p className="text-azul-escuro text-sm mb-3 flex-grow">{description}</p>
      {contact && <h4 className="text-lg font-semibold text-azul-escuro mb-1">{contact}</h4>}
      {schedule && <p className="text-xs text-gray-600 mb-4">{schedule}</p>}
      <div className="mt-auto">
        {isModal && modalComponent ? (
          modalComponent
        ) : (
          <Button
            asChild
            variant="outline"
            className="border-2 border-azul-claro text-azul-claro hover:bg-azul-claro hover:text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 w-full"
          >
            <a
              href={buttonLink || "#"}
              target={buttonLink && buttonLink !== "#" ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {buttonText}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

