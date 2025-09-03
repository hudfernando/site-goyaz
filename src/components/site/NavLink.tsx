import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  isMobile?: boolean;
}

export function NavLink({ href, label, isMobile = false }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const baseClasses = "text-base font-medium rounded-md transition-all duration-200";
  const desktopClasses = "text-azul-escuro hover:text-azul-claro px-4 py-2 hover:bg-azul-claro/20";
  const mobileClasses = "block text-white hover:text-azul-claro p-3 hover:bg-azul-claro/10";

  return (
    <Link href={href} onClick={handleClick} className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}>
      {label}
    </Link>
  );
}