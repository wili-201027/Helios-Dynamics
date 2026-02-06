import { NavLink } from 'react-router-dom';
import { Zap, Lock } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border/30 mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-heading text-lg font-bold mb-3">
            <Zap className="w-5 h-5 text-primary" />
            <span className="gradient-text">Helios Dynamics</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Pioners en energia de fusió, propulsió espacial avançada i eixams de Dyson.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Navegació</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <NavLink to="/" className="hover:text-primary transition-colors">Inici</NavLink>
            <NavLink to="/solucio" className="hover:text-primary transition-colors">Solució</NavLink>
            <NavLink to="/fitxa-tecnica" className="hover:text-primary transition-colors">Fitxa Tècnica</NavLink>
            <NavLink to="/impacte" className="hover:text-primary transition-colors">Impacte</NavLink>
            <NavLink to="/contacte" className="hover:text-primary transition-colors">Contacte</NavLink>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Recursos</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="https://www.iter.org/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ITER Project</a>
            <a href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">NASA</a>
            <a href="https://www.esa.int/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ESA</a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/20 text-xs text-muted-foreground">
        <p>© 2026 Helios Dynamics. Tots els drets reservats.</p>
        <NavLink to="/admin" className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
          <Lock className="w-3 h-3" /> Admin
        </NavLink>
      </div>
    </div>
  </footer>
);

export default Footer;
