import { useCMS } from '@/contexts/CMSContext';
import { motion } from 'framer-motion';
import heroImg from '@/assets/hero-fusion.jpg';
import reactorImg from '@/assets/reactor-tokamak-hd1.jpg';
import propulsorImg from '@/assets/propulsor-interplanetari.jpg';
import eixamImg from '@/assets/eixam-dyson-alpha.jpg';
import estacioImg from '@/assets/estacio-orbital-helios.jpg';
import plasmaImg from '@/assets/plasma-confinat.jpg';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const energyComparison = [
  { name: 'Carbó', output: 1, emissions: 820, color: 'hsl(0 40% 40%)' },
  { name: 'Gas Natural', output: 1.5, emissions: 490, color: 'hsl(30 50% 45%)' },
  { name: 'Solar', output: 0.4, emissions: 48, color: 'hsl(45 90% 55%)' },
  { name: 'Eòlica', output: 0.35, emissions: 11, color: 'hsl(195 60% 50%)' },
  { name: 'Fissió Nuclear', output: 3.5, emissions: 12, color: 'hsl(270 50% 50%)' },
  { name: 'Fusió Nuclear', output: 10, emissions: 0, color: 'hsl(190 100% 50%)' },
];

const demandProjection = [
  { year: '2025', actual: 580, predicted: 580 },
  { year: '2030', actual: 620, predicted: 610 },
  { year: '2035', actual: null, predicted: 660 },
  { year: '2040', actual: null, predicted: 720 },
  { year: '2050', actual: null, predicted: 850 },
  { year: '2060', actual: null, predicted: 980 },
];

const tableData = [
  { font: 'Carbó', consum: '27%', emissions: '44%', renovable: 'No' },
  { font: 'Petroli', consum: '31%', emissions: '34%', renovable: 'No' },
  { font: 'Gas Natural', consum: '23%', emissions: '21%', renovable: 'No' },
  { font: 'Renovables', consum: '13%', emissions: '<1%', renovable: 'Sí' },
  { font: 'Nuclear', consum: '5%', emissions: '<1%', renovable: 'Sí*' },
  { font: 'Fusió (Helios)', consum: '—', emissions: '0%', renovable: 'Il·limitada' },
];

const carouselSlides = [
  { image: reactorImg, title: 'Reactor Helicoidal HD-1', desc: 'Primer reactor comercial de fusió' },
  { image: propulsorImg, title: 'Propulsor Interplanetari', desc: 'Motor de fusió per a viatges a Mart' },
  { image: eixamImg, title: 'Eixam de Dyson Alpha', desc: '50 satèl·lits en òrbita solar propera' },
  { image: estacioImg, title: 'Estació Orbital Helios', desc: 'Base de llançament en òrbita terrestre' },
  { image: plasmaImg, title: 'Plasma Confinat', desc: '150 milions de graus Celsius de precisió' },
];

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const Index = () => {
  const { getContent, isSectionVisible } = useCMS();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      {/* HERO */}
      {isSectionVisible('home.hero') && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Reactor de fusió" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          </div>
          <motion.div
            className="relative z-10 text-center max-w-4xl mx-auto px-4"
            initial="hidden"
            animate="visible"
            variants={fade}
            custom={0}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 glow-text gradient-text">
              {getContent('home.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {getContent('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading" onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}>
                Descobrir més <ArrowDown className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="font-heading" asChild>
                <a href="#/solucio">Veure solucions</a>
              </Button>
            </div>
          </motion.div>
        </section>
      )}

      {/* CAROUSEL */}
      {isSectionVisible('home.carousel') && (
        <section className="py-16 container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex">
                  {carouselSlides.map((slide, i) => (
                    <div key={i} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2">
                      <div className="glass-card aspect-[4/3] relative overflow-hidden rounded-2xl">
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-heading font-bold text-lg">{slide.title}</h4>
                          <p className="text-sm text-gray-200">{slide.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 z-10 glass" onClick={scrollPrev}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 z-10 glass" onClick={scrollNext}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </section>
      )}

      {/* PROBLEM SECTION */}
      {isSectionVisible('home.problem') && (
        <section id="problem" className="py-20 container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto space-y-8">
            <motion.h2 variants={fade} custom={0} className="text-3xl md:text-5xl font-heading font-bold gradient-text text-center">
              {getContent('home.problemTitle')}
            </motion.h2>
            <motion.p variants={fade} custom={1} className="text-lg text-muted-foreground leading-relaxed">
              {getContent('home.problemText')}
            </motion.p>
            <motion.p variants={fade} custom={2} className="text-lg text-muted-foreground leading-relaxed">
              {getContent('home.problemText2')}
            </motion.p>
          </motion.div>
        </section>
      )}

      {/* DATA TABLE */}
      {isSectionVisible('home.table') && (
        <section className="py-16 container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}>
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Comparativa Energètica Global</h3>
            <div className="glass-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-heading">Font d'Energia</TableHead>
                    <TableHead>Consum Mundial</TableHead>
                    <TableHead>Emissions CO₂</TableHead>
                    <TableHead>Renovable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, i) => (
                    <TableRow key={i} className={i === tableData.length - 1 ? 'bg-primary/10 font-semibold' : ''}>
                      <TableCell className="font-medium">{row.font}</TableCell>
                      <TableCell>{row.consum}</TableCell>
                      <TableCell>{row.emissions}</TableCell>
                      <TableCell>
                        {row.renovable === 'Sí*' ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">{row.renovable}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                L'energia nuclear no emet CO₂ durant la generació, però produeix residus radioactius que requereixen gestió especial. Es considera renovable perquè l'urani és abundant i no s'esgota ràpidament.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          row.renovable
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </section>
      )}

      {/* CHARTS */}
      {isSectionVisible('home.charts') && (
        <section className="py-16 container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}>
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Dades Energètiques</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card">
                <h4 className="font-heading font-semibold mb-4">Sortida Energètica per Font (GW per unitat)</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={energyComparison}>
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                    <RechartsTooltip
                      contentStyle={{
                        background: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--popover-foreground))',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px hsl(var(--muted-foreground) / 0.3)',
                      }}
                      labelStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="output" fill="hsl(190 100% 50%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="glass-card">
                <h4 className="font-heading font-semibold mb-4">Projecció de Demanda Energètica (EJ/any)</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={demandProjection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                    <RechartsTooltip
                      contentStyle={{
                        background: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--popover-foreground))',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px hsl(var(--muted-foreground) / 0.3)',
                      }}
                      labelStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="Actual"
                      stroke="hsl(25 95% 55%)"
                      strokeWidth={2}
                      dot={{ r: 4, fill: 'hsl(25 95% 55%)' }}
                      activeDot={{ r: 6, fill: 'hsl(25 95% 55%)', stroke: 'hsl(210 40% 96%)', strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      name="Projecció"
                      stroke="hsl(190 100% 50%)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4, fill: 'hsl(190 100% 50%)' }}
                      activeDot={{ r: 6, fill: 'hsl(190 100% 50%)', stroke: 'hsl(210 40% 96%)', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* EXTERNAL LINKS */}
      {isSectionVisible('home.links') && (
        <section className="py-16 container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}>
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Fonts i Referències</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { title: 'ITER Project', url: 'https://www.iter.org/', desc: 'Projecte internacional de fusió nuclear' },
                { title: 'NASA', url: 'https://www.nasa.gov/', desc: 'Exploració espacial i propulsió avançada' },
                { title: 'IEA World Energy', url: 'https://www.iea.org/', desc: 'Dades energètiques mundials' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card flex items-start gap-3 group"
                >
                  <ExternalLink className="w-5 h-5 text-primary mt-0.5 group-hover:text-accent transition-colors" />
                  <div>
                    <p className="font-heading font-semibold group-hover:text-primary transition-colors">{link.title}</p>
                    <p className="text-sm text-muted-foreground">{link.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Index;
