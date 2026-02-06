import { useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, LogOut, RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner';

const sectionLabels: Record<string, string> = {
  'home.hero': 'Hero Section',
  'home.carousel': 'Carrusel',
  'home.problem': 'Secció del Problema',
  'home.table': 'Taula de Dades',
  'home.charts': 'Gràfics',
  'home.links': 'Enllaços Externs',
  'solution.intro': 'Introducció Solució',
  'solution.simulator': 'Simulador de Fusió',
  'solution.dysonBuilder': 'Constructor Dyson',
  'technical.intro': 'Introducció Tècnica',
  'technical.budget': 'Pressupost',
  'technical.specs': 'Especificacions',
  'technical.pdf': 'Document PDF',
  'impact.animation': 'Animació Orbital',
  'impact.message': 'Missatge Inspirador',
  'impact.stats': 'Estadístiques',
  'impact.cta': 'Botó CTA',
  'contact.info': 'Informació de Contacte',
  'contact.form': 'Formulari',
  'contact.map': 'Mapa',
};

const contentByPage: Record<string, Array<{ key: string; label: string; multiline?: boolean }>> = {
  Inici: [
    { key: 'home.heroTitle', label: 'Títol Hero' },
    { key: 'home.heroSubtitle', label: 'Subtítol Hero', multiline: true },
    { key: 'home.problemTitle', label: 'Títol Problema' },
    { key: 'home.problemText', label: 'Text Problema', multiline: true },
    { key: 'home.problemText2', label: 'Text Problema 2', multiline: true },
  ],
  Solució: [
    { key: 'solution.title', label: 'Títol' },
    { key: 'solution.subtitle', label: 'Subtítol' },
    { key: 'solution.fusion.title', label: 'Títol Fusió' },
    { key: 'solution.fusion.desc', label: 'Descripció Fusió', multiline: true },
    { key: 'solution.rockets.title', label: 'Títol Coets' },
    { key: 'solution.rockets.desc', label: 'Descripció Coets', multiline: true },
    { key: 'solution.dyson.title', label: 'Títol Dyson' },
    { key: 'solution.dyson.desc', label: 'Descripció Dyson', multiline: true },
  ],
  Tècnica: [
    { key: 'technical.title', label: 'Títol' },
    { key: 'technical.intro', label: 'Introducció', multiline: true },
  ],
  Impacte: [
    { key: 'impact.title', label: 'Títol' },
    { key: 'impact.message', label: 'Missatge Inspirador', multiline: true },
    { key: 'impact.cta', label: 'Text Botó CTA' },
  ],
  Contacte: [
    { key: 'contact.title', label: 'Títol' },
    { key: 'contact.phone', label: 'Telèfon' },
    { key: 'contact.email', label: 'Correu electrònic' },
    { key: 'contact.address', label: 'Adreça' },
  ],
};

const sectionsByPage: Record<string, string[]> = {
  Inici: ['home.hero', 'home.carousel', 'home.problem', 'home.table', 'home.charts', 'home.links'],
  Solució: ['solution.intro', 'solution.simulator', 'solution.dysonBuilder'],
  Tècnica: ['technical.intro', 'technical.budget', 'technical.specs', 'technical.pdf'],
  Impacte: ['impact.animation', 'impact.message', 'impact.stats', 'impact.cta'],
  Contacte: ['contact.info', 'contact.form', 'contact.map'],
};

const Admin = () => {
  const { content, sections, isAdmin, updateContent, toggleSection, login, logout, resetAll, getContent } = useCMS();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError(false);
      toast.success('Sessió iniciada correctament');
    } else {
      setError(true);
    }
  };

  if (!isAdmin) {
    return (
      <div className="py-20 flex items-center justify-center min-h-[60vh]">
        <div className="glass-card max-w-sm w-full mx-4 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl glass flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold">Accés Administrador</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Contrasenya"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              className={`glass text-center ${error ? 'border-destructive' : ''}`}
            />
            {error && <p className="text-sm text-destructive">Contrasenya incorrecta</p>}
            <Button type="submit" className="w-full font-heading">Entrar</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-heading font-bold gradient-text">Panell d'Administració</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { resetAll(); toast.success('Contingut restablert'); }} className="gap-1">
              <RotateCcw className="w-3 h-3" /> Restablir
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="gap-1">
              <LogOut className="w-3 h-3" /> Sortir
            </Button>
          </div>
        </div>

        <Tabs defaultValue="Inici">
          <TabsList className="glass w-full flex-wrap h-auto gap-1 p-1">
            {Object.keys(contentByPage).map(page => (
              <TabsTrigger key={page} value={page} className="font-heading text-xs">{page}</TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(contentByPage).map(([page, fields]) => (
            <TabsContent key={page} value={page} className="space-y-8 mt-6">
              {/* Content editing */}
              <div className="glass-card space-y-5">
                <h3 className="font-heading font-bold text-lg">Contingut</h3>
                {fields.map(field => (
                  <div key={field.key} className="space-y-2">
                    <Label className="text-sm">{field.label}</Label>
                    {field.multiline ? (
                      <Textarea
                        value={getContent(field.key)}
                        onChange={e => updateContent(field.key, e.target.value)}
                        rows={3}
                        className="glass resize-none"
                      />
                    ) : (
                      <Input
                        value={getContent(field.key)}
                        onChange={e => updateContent(field.key, e.target.value)}
                        className="glass"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Section toggles */}
              <div className="glass-card space-y-4">
                <h3 className="font-heading font-bold text-lg">Seccions Visibles</h3>
                {sectionsByPage[page]?.map(sectionKey => (
                  <div key={sectionKey} className="flex items-center justify-between py-2">
                    <Label className="text-sm">{sectionLabels[sectionKey] || sectionKey}</Label>
                    <Switch
                      checked={sections[sectionKey] !== false}
                      onCheckedChange={() => toggleSection(sectionKey)}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
