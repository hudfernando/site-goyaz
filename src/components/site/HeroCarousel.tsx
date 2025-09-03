// src/components/site/HeroCarousel.tsx
"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CarouselSlide } from "./CarouselSlide";

export default function HeroCarousel() {
  return (
    <section className="w-full py-0">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem>
            <CarouselSlide src="/img/1.png" alt="Slide 1" priority />
          </CarouselItem>
          <CarouselItem>
            <CarouselSlide src="/img/2.png" alt="Slide 2" />
          </CarouselItem>
          <CarouselItem>
            <CarouselSlide src="/img/3.png" alt="Slide 3" />
          </CarouselItem>
        </CarouselContent>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <CarouselPrevious className="static translate-y-0 bg-azul-claro/80 hover:bg-azul-escuro text-white rounded-full w-10 h-10" />
          <CarouselNext className="static translate-y-0 bg-azul-claro/80 hover:bg-azul-escuro text-white rounded-full w-10 h-10" />
        </div>
      </Carousel>
    </section>
  );
}