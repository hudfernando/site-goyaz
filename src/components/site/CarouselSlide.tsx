// src/components/site/CarouselSlide.tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface CarouselSlideProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function CarouselSlide({ src, alt, priority = false }: CarouselSlideProps) {
  return (
    <Card className="border-none shadow-none rounded-none">
      <CardContent className="flex aspect-[16/6] items-center justify-center p-0 relative">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover rounded-lg"
        />
      </CardContent>
    </Card>
  );
}