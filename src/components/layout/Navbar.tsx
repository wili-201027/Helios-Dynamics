import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const links = [
  { to: '/', label: 'Inici' },
  { to: '/solucio', label: 'Solució' },
  { to: '/fitxa-tecnica', label: 'Fitxa Tècnica' },
  { to: '/impacte', label: 'Impacte' },
  { to: '/contacte', label: 'Contacte' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-heading text-xl font-bold">
          <Zap className="w-6 h-6 text-primary" />
          <span className="gradient-text">Helios Dynamics</span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-strong border-t border-border/30 py-4">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 text-sm font-medium transition-colors ${
                  isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
