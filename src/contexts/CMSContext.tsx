import React, { createContext, useContext, useEffect, useState } from 'react';

const defaultContent: Record<string, string> = {
  // HOME
  'home.heroTitle': 'Helios Dynamics',
  'home.heroSubtitle': 'Pioners en energia de fusió, propulsió espacial i captació solar a escala còsmica.',
  'home.problemTitle': 'La Crisi Energètica Global',
  'home.problemText': 'El món consumeix més de 580 EJ d\'energia anual, amb un 80% procedent de combustibles fòssils. Les emissions de CO₂ superen els 36.000 milions de tones anuals, accelerant el canvi climàtic. La fusió nuclear ofereix una font d\'energia pràcticament il·limitada, segura i neta — però fins ara, ningú ha aconseguit fer-la viable a escala comercial.',
  'home.problemText2': 'Helios Dynamics neix per canviar això. Combinem tecnologia de confinament magnètic avançat, intel·ligència artificial per al control del plasma i materials superconductors d\'última generació per fer realitat el somni de l\'energia de fusió.',

  // SOLUTION
  'solution.title': 'La Nostra Solució',
  'solution.subtitle': 'Tres línies tecnològiques que definiran el futur de la humanitat.',
  'solution.fusion.title': 'Reactors de Fusió Compactes',
  'solution.fusion.desc': 'Reactors tokamak de nova generació amb confinament magnètic d\'alta eficiència. Capaços de generar 500 MW amb un consum de deuteri inferior a 1 kg/dia. Temperatura del plasma: fins a 150 milions de °C.',
  'solution.rockets.title': 'Propulsió Espacial Avançada',
  'solution.rockets.desc': 'Motors de fusió per a viatges interplanetaris. Impuls específic 10x superior als motors químics actuals. Permet arribar a Mart en 45 dies en lloc de 7 mesos.',
  'solution.dyson.title': 'Eixams de Dyson',
  'solution.dyson.desc': 'Constel·lacions de satèl·lits solars en òrbita propera a l\'estrella. Cada unitat capta 1 GW d\'energia solar i la transmet a Terra mitjançant microones. Un eixam complet podria satisfer la demanda energètica mundial.',

  // TECHNICAL
  'technical.title': 'Fitxa Tècnica',
  'technical.intro': 'Especificacions detallades dels projectes principals d\'Helios Dynamics. Totes les dades es basen en models teòrics validats i simulacions computacionals avançades.',

  // IMPACT
  'impact.title': 'L\'Impacte d\'Helios Dynamics',
  'impact.message': 'Imagina un món on l\'energia és neta, abundant i accessible per a tothom. On les estrelles no són només llums al cel, sinó fonts d\'energia que alimenten civilitzacions senceres. Aquest és el futur que estem construint.',
  'impact.cta': 'Uneix-te al Projecte',

  // CONTACT
  'contact.title': 'Contacte',
  'contact.phone': '+34 93 456 78 90',
  'contact.email': 'info@heliosdynamics.cat',
  'contact.address': 'Carrer de la Fusió, 42 — 08001 Barcelona, Catalunya',
};

const defaultSections: Record<string, boolean> = {
  'home.hero': true,
  'home.carousel': true,
  'home.problem': true,
  'home.table': true,
  'home.charts': true,
  'home.links': true,
  'solution.intro': true,
  'solution.simulator': true,
  'solution.dysonBuilder': true,
  'technical.intro': true,
  'technical.budget': true,
  'technical.specs': true,
  'technical.pdf': true,
  'impact.animation': true,
  'impact.message': true,
  'impact.stats': true,
  'impact.cta': true,
  'contact.info': true,
  'contact.form': true,
  'contact.map': true,
};

interface CMSContextType {
  content: Record<string, string>;
  sections: Record<string, boolean>;
  isAdmin: boolean;
  updateContent: (key: string, value: string) => void;
  toggleSection: (key: string) => void;
  login: (password: string) => boolean;
  logout: () => void;
  resetAll: () => void;
  getContent: (key: string) => string;
  isSectionVisible: (key: string) => boolean;
}

const CMSContext = createContext<CMSContextType>({} as CMSContextType);

export const useCMS = () => useContext(CMSContext);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('helios-cms-content');
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch { return defaultContent; }
  });

  const [sections, setSections] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('helios-cms-sections');
      return saved ? { ...defaultSections, ...JSON.parse(saved) } : defaultSections;
    } catch { return defaultSections; }
  });

  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('helios-admin') === 'true');

  useEffect(() => { localStorage.setItem('helios-cms-content', JSON.stringify(content)); }, [content]);
  useEffect(() => { localStorage.setItem('helios-cms-sections', JSON.stringify(sections)); }, [sections]);

  const updateContent = (key: string, value: string) => setContent(prev => ({ ...prev, [key]: value }));
  const toggleSection = (key: string) => setSections(prev => ({ ...prev, [key]: !prev[key] }));
  const getContent = (key: string) => content[key] || defaultContent[key] || '';
  const isSectionVisible = (key: string) => sections[key] !== false;

  const login = (password: string) => {
    if (password === 'admin1234') {
      setIsAdmin(true);
      localStorage.setItem('helios-admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('helios-admin');
  };

  const resetAll = () => {
    setContent(defaultContent);
    setSections(defaultSections);
    localStorage.removeItem('helios-cms-content');
    localStorage.removeItem('helios-cms-sections');
  };

  return (
    <CMSContext.Provider value={{ content, sections, isAdmin, updateContent, toggleSection, login, logout, resetAll, getContent, isSectionVisible }}>
      {children}
    </CMSContext.Provider>
  );
};
