"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SacCardProps {
  label: string;
  icon: React.ReactNode;
  link?: string;
  modal?: React.ReactNode;
}

export function SacCard({ label, icon, link, modal }: SacCardProps) {
  const TriggerButton = (
    <Button
      variant="ghost"
      className="flex flex-col items-center justify-center w-full h-full text-azulEscuro hover:bg-azulClaro/10"
    >
      {icon}
      <span className="text-sm font-semibold text-center font-lato mt-2">{label}</span>
    </Button>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-40 flex items-center justify-center">
      {link ? (
        <Link href={link} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
          {TriggerButton}
        </Link>
      ) : modal ? (
        <>{modal}</>
      ) : (
        TriggerButton
      )}
    </div>
  );
}