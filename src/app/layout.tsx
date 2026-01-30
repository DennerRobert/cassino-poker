import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Users, Trophy, Calendar } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PokerRank - Sistema de Ranking de Jogadores',
  description: 'Sistema profissional para rankeamento de jogadores de poker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="glass-strong border-b border-gray-800 sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-4 group">
                  <div className="relative w-28 h-28 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src="/logo.png"
                      alt="PokerRank Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">PokerRank</h1>
                    <p className="text-base text-gray-400">Sistema de Rankeamento</p>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-3">
                  <NavLink href="/" icon={Home}>Dashboard</NavLink>
                  <NavLink href="/players" icon={Users}>Jogadores</NavLink>
                  <NavLink href="/ranking" icon={Trophy}>Ranking</NavLink>
                  <NavLink href="/sessions" icon={Calendar}>Sessões</NavLink>
                </nav>
              </div>

              {/* Mobile Navigation */}
              <nav className="md:hidden flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                <NavLink href="/" icon={Home} mobile>Dashboard</NavLink>
                <NavLink href="/players" icon={Users} mobile>Jogadores</NavLink>
                <NavLink href="/ranking" icon={Trophy} mobile>Ranking</NavLink>
                <NavLink href="/sessions" icon={Calendar} mobile>Sessões</NavLink>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="glass border-t border-gray-800 py-6">
            <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
              <p>© 2026 PokerRank. Sistema de rankeamento de jogadores.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

function NavLink({
  href,
  icon: Icon,
  children,
  mobile = false
}: {
  href: string;
  icon: any;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl
        bg-gradient-to-br from-gray-800/50 to-gray-900/50
        border border-gray-700/50
        hover:border-poker-green-500/50
        hover:from-poker-green-500/10 hover:to-poker-green-600/5
        transition-all duration-300 ease-out
        text-gray-300 hover:text-poker-green-400
        shadow-sm hover:shadow-lg hover:shadow-poker-green-500/20
        hover:scale-105
        ${mobile ? 'text-sm whitespace-nowrap px-4 py-2' : ''}
      `}
    >
      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
      <span className="font-medium">{children}</span>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-poker-green-400/0 via-poker-green-400/5 to-poker-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}
