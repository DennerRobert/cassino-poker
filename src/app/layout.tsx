import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Home, Users, Trophy, Calendar } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Poker Ranking - Sistema de Ranking de Jogadores',
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
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-poker-green-500 to-poker-green-700 flex items-center justify-center shadow-glow group-hover:shadow-glow-gold transition-all duration-300">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Poker Ranking</h1>
                    <p className="text-xs text-gray-400">Sistema de Rankeamento</p>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                  <NavLink href="/" icon={Home}>Dashboard</NavLink>
                  <NavLink href="/players" icon={Users}>Jogadores</NavLink>
                  <NavLink href="/ranking" icon={Trophy}>Ranking</NavLink>
                  <NavLink href="/sessions" icon={Calendar}>Sessões</NavLink>
                </nav>
              </div>

              {/* Mobile Navigation */}
              <nav className="md:hidden flex items-center gap-1 mt-4 overflow-x-auto">
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
              <p>© 2026 Poker Ranking. Sistema de rankeamento de jogadores.</p>
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
      className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-gray-300 hover:text-white ${mobile ? 'text-sm whitespace-nowrap' : ''
        }`}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </Link>
  );
}
