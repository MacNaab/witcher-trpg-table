import Link from 'next/link';
import { nanoid } from 'nanoid'

function PageItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      className="px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline"
      href={href}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Substances", href: "/substance/" },
    { label: "Tracker de Combat", href: "/tracker/" },
    { label: "Carte", href: "/map/" },
    { label: "Générateur de rencontres", href: "/rencontre/" },
  ];
  

  return (
    <div className="w-full max-w-7xl">
      <div className="flex max-w-screen-xl p-5 mx-auto items-center justify-between flex-row px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <Link
            className="text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed pr-6 lg:pr-8"
            href="/"
          >
            Witcher TRPG
          </Link>
        </div>

        <nav className="items-center flex-grow border-blue-600 pb-0 flex justify-end flex-row lg:border-l-2 lg:pl-2">
          {navLinks.map((link) => (
            <PageItem key={nanoid()} label={link.label} href={link.href} />
          ))}
        </nav>
      </div>
    </div>
  );
}
