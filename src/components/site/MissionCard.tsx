// src/components/site/MissionCard.tsx
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MissionCardProps {
  imgSrc: string;
  title: string;
  text: string;
}

export function MissionCard({ imgSrc, title, text }: MissionCardProps) {
  return (
    <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="items-center justify-center pt-6 pb-3">
        <Image src={imgSrc} alt={title} width={60} height={60} className="mb-4" />
        <CardTitle className="text-azulClaro text-xl font-semibold font-lato">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-azulEscuro">{text}</p>
      </CardContent>
    </Card>
  );
}