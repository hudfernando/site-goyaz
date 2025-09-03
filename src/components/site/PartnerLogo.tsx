// src/components/site/PartnerLogo.tsx
import Image from "next/image";

interface PartnerLogoProps {
  src: string;
  alt: string;
}

export function PartnerLogo({ src, alt }: PartnerLogoProps) {
  return (
    <div className="p-4 flex justify-center items-center">
      <Image
        src={src}
        alt={alt}
        width={120}
        height={60}
        className="object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}