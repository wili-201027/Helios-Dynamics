import { useCMS } from '@/contexts/CMSContext';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const budgetData = [
  { category: 'R+D Reactor de Fusió', cost: '4.200 M€', percentage: '35%' },
  { category: 'Construcció Planta Pilot', cost: '2.800 M€', percentage: '23%' },
  { category: 'Programa de Satèl·lits Dyson', cost: '3.500 M€', percentage: '29%' },
  { category: 'Propulsió Espacial', cost: '850 M€', percentage: '7%' },
  { category: 'Operacions i Manteniment (5 anys)', cost: '650 M€', percentage: '6%' },
  { category: 'TOTAL', cost: '12.000 M€', percentage: '100%' },
];

const reactorSpecs = [
  { spec: 'Tipus', value: 'Tokamak compacte HD-1' },
  { spec: 'Temperatura del plasma', value: '150.000.000 °C' },
  { spec: 'Camp magnètic', value: '13 Tesla (superconductor HTS)' },
  { spec: 'Combustible', value: 'Deuteri-Triti' },
  { spec: 'Potència de sortida', value: '500 MW elèctrics' },
  { spec: 'Factor Q', value: '> 10 (net positiu)' },
  { spec: 'Pes', value: '~2.000 tones' },
  { spec: 'Vida útil', value: '30+ anys' },
];

const dysonSpecs = [
  { spec: 'Tipus', value: 'Eixam de Dyson parcial (Tipus I)' },
  { spec: 'Nombre de satèl·lits (fase 1)', value: '50 unitats' },
  { spec: 'Energia per satèl·lit', value: '1,2 GW' },
  { spec: 'Massa per unitat', value: '~500 kg' },
  { spec: 'Òrbita', value: 'Solar propera (0,1 UA)' },
  { spec: 'Transmissió', value: 'Microones dirigides' },
  { spec: 'Cobertura solar objectiu', value: '0,001%' },
  { spec: 'Energia total captada', value: '60 GW' },
];

const TechnicalSheet = () => {
  const { getContent, isSectionVisible } = useCMS();

  return (
    <div className="py-20 container mx-auto px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-5xl mx-auto space-y-16">
        {isSectionVisible('technical.intro') && (
          <motion.div variants={fade} custom={0} className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text">{getContent('technical.title')}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{getContent('technical.intro')}</p>
          </motion.div>
        )}

        {isSectionVisible('technical.budget') && (
          <motion.div variants={fade} custom={1}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Pressupost General</h2>
            <div className="glass-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-heading">Categoria</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>% del Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetData.map((row, i) => (
                    <TableRow key={i} className={i === budgetData.length - 1 ? 'bg-primary/10 font-bold' : ''}>
                      <TableCell>{row.category}</TableCell>
                      <TableCell className="font-mono">{row.cost}</TableCell>
                      <TableCell>{row.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}

        {isSectionVisible('technical.specs') && (
          <motion.div variants={fade} custom={2} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Reactor HD-1</h2>
              <div className="glass-card overflow-hidden">
                <Table>
                  <TableBody>
                    {reactorSpecs.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-muted-foreground">{row.spec}</TableCell>
                        <TableCell className="font-mono text-sm">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Satèl·lits Dyson</h2>
              <div className="glass-card overflow-hidden">
                <Table>
                  <TableBody>
                    {dysonSpecs.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-muted-foreground">{row.spec}</TableCell>
                        <TableCell className="font-mono text-sm">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </motion.div>
        )}

        {isSectionVisible('technical.pdf') && (
          <motion.div variants={fade} custom={3}>
            <div className="glass-card flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center shrink-0">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-heading font-bold text-lg">Informe Tècnic Complet</h3>
                <p className="text-sm text-muted-foreground">Document PDF amb totes les especificacions, diagrames i càlculs detallats del projecte Helios Dynamics.</p>
              </div>
              <Button className="shrink-0 gap-2">
                <Download className="w-4 h-4" /> Descarregar PDF
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TechnicalSheet;
