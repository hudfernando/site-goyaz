// src/components/site/FooterSection.tsx
interface FooterSectionProps {
  title: string;
  details: string[];
}

export function FooterSection({ title, details }: FooterSectionProps) {
  return (
    <div className="font-lato">
      <h5 className="text-lg font-semibold mb-3 text-azulClaro">{title}</h5>
      {details.map((detail, i) => (
        <p key={i} className="text-xs leading-relaxed text-gray-800">{detail}</p>
      ))}
    </div>
  );
}